const STORAGE_KEY = "digital-solutions:mail-rate-limit:v1";
const TEN_MINUTES = 10 * 60 * 1000;
const FOUR_HOURS = 4 * 60 * 60 * 1000;

type MailRateLimitState = {
  sentAt: number[];
  blockedUntil: number;
};

export type MailSendPermission =
  | { allowed: true }
  | { allowed: false; message: string };

function readState(): MailRateLimitState {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return { sentAt: [], blockedUntil: 0 };

    const parsed = JSON.parse(stored) as Partial<MailRateLimitState>;
    return {
      sentAt: Array.isArray(parsed.sentAt)
        ? parsed.sentAt.filter((value): value is number => typeof value === "number")
        : [],
      blockedUntil: typeof parsed.blockedUntil === "number" ? parsed.blockedUntil : 0,
    };
  } catch {
    return { sentAt: [], blockedUntil: 0 };
  }
}

function saveState(state: MailRateLimitState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // If storage is unavailable, do not block a legitimate contact attempt.
  }
}

function waitMessage(milliseconds: number) {
  const totalMinutes = Math.max(1, Math.ceil(milliseconds / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const duration = hours > 0
    ? `${hours} hour${hours === 1 ? "" : "s"}${minutes ? ` ${minutes} minute${minutes === 1 ? "" : "s"}` : ""}`
    : `${minutes} minute${minutes === 1 ? "" : "s"}`;

  return `You have reached the contact limit. Please try again in ${duration}.`;
}

/**
 * Allows two mail-client requests in a rolling ten-minute window. A third
 * request starts a four-hour lockout for this browser.
 */
export function claimMailSendPermission(now = Date.now()): MailSendPermission {
  const state = readState();

  if (state.blockedUntil > now) {
    return { allowed: false, message: waitMessage(state.blockedUntil - now) };
  }

  const recentSends = state.sentAt.filter((timestamp) => timestamp > now - TEN_MINUTES);
  if (recentSends.length >= 2) {
    const blockedUntil = now + FOUR_HOURS;
    saveState({ sentAt: [], blockedUntil });
    return { allowed: false, message: waitMessage(FOUR_HOURS) };
  }

  saveState({ sentAt: [...recentSends, now], blockedUntil: 0 });
  return { allowed: true };
}
