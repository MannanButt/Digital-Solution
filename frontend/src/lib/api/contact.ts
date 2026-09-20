export type ContactRequest = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  subService: string;
  message: string;
};

type ApiErrorResponse = {
  success?: false;
  error?: {
    code?: string;
    message?: string;
  } | string;
};

type ContactSuccessResponse = {
  success: true;
  data: {
    message: string;
  };
};

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

function getApiBaseUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!configuredUrl) {
    throw new ApiClientError("The contact service is not configured. Please email us directly.");
  }

  try {
    const parsedUrl = new URL(configuredUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error("Unsupported protocol");
    }
    return parsedUrl.toString().replace(/\/$/, "");
  } catch {
    throw new ApiClientError("The contact service configuration is invalid.");
  }
}

function getErrorMessage(payload: ApiErrorResponse): string {
  if (typeof payload.error === "string") return payload.error;
  return payload.error?.message ?? "Something went wrong. Please try again or email us directly.";
}

export async function submitContactRequest(payload: ContactRequest): Promise<ContactSuccessResponse> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const result = await response.json().catch(() => ({})) as ContactSuccessResponse | ApiErrorResponse;

    if (!response.ok || result.success !== true) {
      throw new ApiClientError(getErrorMessage(result as ApiErrorResponse), response.status);
    }

    return result;
  } catch (error) {
    if (error instanceof ApiClientError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiClientError("The request timed out. Please try again.");
    }
    throw new ApiClientError("Network error. Please check your connection and try again.");
  } finally {
    window.clearTimeout(timeout);
  }
}
