# Digital Solutions Project Revamp Plan

**Plan date:** 20 September 2026  
**Current status:** Phases 0–3 aur local Vercel readiness implement ho chuki hai. Production deployment configured Aiven hostname ke DNS failure aur Vercel authentication/linking ke pending hone ki wajah se hold par hai.  
**Deployment model:** Aik hi Git repository ke andar do bilkul independent apps: `frontend/` aur `backend/`. Vercel par dono alag projects ke taur par deploy honge.

## Implementation Update — 20 September 2026

- Frontend standard Next.js 16 app ban chuka hai aur apna package/lockfile/modules rakhta hai.
- Backend Express 5 + TypeScript layered app ban chuka hai aur apna package/lockfile/modules rakhta hai.
- Duplicate frontend API route aur Cloudflare/Vinext runtime source remove ho chuke hain.
- Environment files frontend/backend mein safely split hain aur Git-ignored hain.
- Frontend complete `check` pass hai: lint, typecheck, 3 tests aur 32-route production build.
- Backend complete `check` pass hai: lint, typecheck, 11 tests aur production TypeScript build.
- Compiled runtime smoke tests pass hain: backend health/validation/404 aur frontend representative routes.
- Database connectivity check fail hai kyun ke configured Aiven hostname DNS se resolve nahi ho raha (`ENOTFOUND`). Is liye real DB insert, migration apply aur Resend end-to-end test pending hain.
- Backend production Vercel deploy aur final frontend URL integration next deployment phase mein hongi.

## 1. Objective

Current mixed setup ko clean, maintainable aur production-ready structure mein convert karna hai:

- frontend aur backend ke source, dependencies, configs, environment variables aur commands bilkul separate hon;
- backend Express + TypeScript par ho aur separation of concerns follow kare;
- database, validation, controllers, services, repositories, middleware aur routes ki clear boundaries hon;
- backend Vercel par independent project ke taur par deploy ho sake;
- backend deploy hone ke baad us ka production base URL frontend ke environment variable se use ho;
- frontend code mein backend ka koi hardcoded base URL na ho;
- frontend ko standard Next.js app bana kar Vercel par independently deploy kiya ja sake.

## 2. Current Setup Ki Audit Findings

### Jo abhi sahi kaam kar raha hai

- Existing root setup ka `lint` pass hai.
- Existing Vinext/Cloudflare build pass hai.
- Existing 5 Node tests pass hain.
- Contact form PostgreSQL/Aiven mein record save karta hai aur Resend notification bhejta hai.
- `.env.local` Git se ignored hai aur koi generated build directory tracked nahi hai.
- Frontend contact form mein local uncommitted change ke through `NEXT_PUBLIC_API_URL` introduce ho chuka hai.

### Jo mixed ya problematic hai

- Sirf root par aik `package.json`, aik `package-lock.json` aur aik `node_modules/` hai; frontend/backend ki dependencies shared hain.
- Backend Express nahi hai; `backend/worker/index.ts` Cloudflare Worker aur Vinext runtime entry point hai.
- Contact API do jagah duplicate hai:
  - `backend/worker/index.ts`
  - `frontend/app/api/contact/route.ts`
- Frontend API route directly backend DB files import karti hai; is wajah se dono apps independently build/deploy nahi ho sakte.
- Database client request ke andar create hota hai aur lifecycle/connection handling centralized nahi hai.
- Validation handwritten aur duplicate hai; controller, service, repository aur middleware layers maujood nahi.
- CORS abhi `*` hai, jo production allowlist approach nahi hai.
- Current browser `localStorage` rate limit security control nahi hai; user isay bypass kar sakta hai.
- Root configs frontend, Cloudflare runtime aur database ko mix karte hain.
- Frontend standard Next.js/Vercel setup ke bajaye Vinext + Vite + Wrangler se build hota hai.
- Root `.env.local` mein frontend aur backend variables mix hain.
- Root par generated folders aur obsolete candidates maujood hain: `.next/`, `.vinext/`, `.wrangler/`, `dist/`, `node_modules/`, empty `Digital_Solutions/`, aur Cloudflare-specific build files.

### Existing user changes jo preserve hongi

Implementation ke start par current dirty worktree ka snapshot/diff dobara inspect hoga. In changes ko overwrite ya discard nahi kiya jayega:

- `frontend/src/features/contact/components/BookDemoPage.tsx`
- `tsconfig.json`

## 3. Target Repository Structure

```text
project-root/
├── frontend/
│   ├── app/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   └── lib/
│   │       └── api/
│   ├── tests/
│   ├── .env.example
│   ├── .env.local                 # ignored
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts
│   │   ├── controllers/
│   │   │   └── contact.controller.ts
│   │   ├── db/
│   │   │   ├── client.ts
│   │   │   ├── migrations/
│   │   │   └── schema.ts
│   │   ├── middleware/
│   │   │   ├── error-handler.ts
│   │   │   ├── not-found.ts
│   │   │   ├── rate-limit.ts
│   │   │   └── validate.ts
│   │   ├── repositories/
│   │   │   └── contact.repository.ts
│   │   ├── routes/
│   │   │   ├── contact.routes.ts
│   │   │   ├── health.routes.ts
│   │   │   └── index.ts
│   │   ├── schemas/
│   │   │   └── contact.schema.ts
│   │   ├── services/
│   │   │   ├── contact.service.ts
│   │   │   └── email.service.ts
│   │   ├── templates/
│   │   │   └── contact-email.ts
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── tests/
│   ├── .env.example
│   ├── .env                       # ignored
│   ├── drizzle.config.ts
│   ├── eslint.config.mjs
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── vercel.json                # sirf agar zero-config se extra setting required ho
├── .gitignore
├── README.md
└── PROJECT_REVAMP_PLAN.md
```

Root ko npm workspace nahi banaya jayega, kyun ke requirement ke mutabiq frontend aur backend ke apne lockfiles aur apne `node_modules` hone chahiye. Dono folders independently `npm install`, build, test aur start honge.

## 4. Backend Request Flow

```text
HTTP Request
  -> Express app/middleware
  -> route
  -> request schema validation
  -> controller
  -> contact service
       -> contact repository -> PostgreSQL
       -> email service      -> Resend
  -> consistent JSON response
  -> centralized error handler
```

Layers ki responsibilities:

- **Routes:** URL aur HTTP method ko controller se map karna.
- **Schemas:** Zod ke through request body/env validation aur inferred TypeScript types.
- **Controllers:** HTTP request/response handle karna; business logic yahan nahi hogi.
- **Services:** contact submission ka business workflow aur email behavior.
- **Repositories:** sirf database queries.
- **DB:** connection/client, Drizzle schema aur versioned migrations.
- **Middleware:** CORS, security headers, rate limit, validation, 404 aur global errors.
- **Config:** environment variables ko startup par validate karna.

## 5. Proposed API Contract

### `GET /api/health`

- Basic deployment health check.
- Secret values ya sensitive dependency details expose nahi karega.
- Response example: `{ "success": true, "service": "digital-solutions-api" }`.

### `POST /api/v1/contact`

- Current form fields accept karega: `name`, `email`, `phone`, `company`, `service`, `subService`, `message`.
- Zod validation whitespace, email format, phone format aur sensible length limits enforce karegi.
- Successful DB insert ke baad email notification send hogi.
- Current behavior preserve hoga: email failure DB save ko rollback nahi karegi, lekin structured log generate hoga.
- Success, validation, rate-limit aur server errors ka consistent JSON shape hoga.
- Legacy `/api/contact` ko ya to temporary compatibility alias diya jayega ya frontend ke saath atomic migration mein remove kiya jayega. Final state mein aik documented canonical endpoint hoga.

## 6. Environment Variables Ka Separation

### Backend: `backend/.env`

```dotenv
NODE_ENV=development
PORT=4000
DATABASE_URL=
RESEND_API_KEY=
ADMIN_EMAIL=
EMAIL_FROM=
CORS_ORIGINS=http://localhost:3000
```

### Frontend: `frontend/.env.local`

Backend deploy hone se pehle placeholder/example rahega. Production URL milne ke baad value set hogi:

```dotenv
NEXT_PUBLIC_API_URL=https://your-backend-project.vercel.app
```

Rules:

- Real secrets kabhi commit nahi hongi.
- Dono apps mein documented `.env.example` commit honge.
- Frontend mein sirf public backend base URL hoga; DB/Resend secrets frontend mein nahi jayenge.
- API helper base URL normalize karega, trailing slash issue handle karega aur missing variable par clear error dega.
- `localhost`, `vercel.app`, production backend domain ya koi aur backend base URL source code mein hardcode nahi hoga.

## 7. Package Ownership Aur Commands

### Frontend package

Frontend sirf UI dependencies rakhega: Next.js, React, React DOM, Lucide, ESLint/PostCSS waghera. Drizzle, PostgreSQL, Resend, Express aur backend-only libraries frontend se remove hongi.

Expected scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "test": "..."
}
```

### Backend package

Backend sirf API dependencies rakhega: Express, Drizzle/Postgres, Resend, Zod, CORS/security middleware aur required dev/test tooling.

Expected scripts:

```json
{
  "dev": "tsx watch src/index.ts",
  "build": "tsc -p tsconfig.json",
  "start": "node dist/index.js",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "test": "...",
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "db:studio": "drizzle-kit studio"
}
```

`src/app.ts` Express application configure/export karega. `src/index.ts` local Node server start karega aur Vercel-compatible default export provide karega. Is se local `npm start` aur Vercel function dono supported rahenge.

## 8. Execution Phases

### Phase 0 — Safety, Baseline Aur Inventory

- Current Git status aur user changes record karna.
- Secrets ko output/log mein expose kiye baghair env key inventory lena.
- Current passing lint/build/tests ko baseline banana.
- Existing contact request/response behavior document karna.
- Destructive cleanup se pehle exact tracked/untracked targets verify karna.

**Exit criteria:** baseline documented ho aur koi user change lost na ho.

### Phase 1 — Physical Frontend/Backend Separation

- Frontend configs root se `frontend/` mein move/recreate karna.
- Backend configs `backend/` mein move/recreate karna.
- Dono folders mein independent `package.json` aur `package-lock.json` banana.
- Root shared `package.json`, `package-lock.json` aur `node_modules` dependency model remove karna.
- `npm install` dono folders ke andar separately run karna.
- Root README ko new two-app workflow ke mutabiq update karna.

**Exit criteria:** `frontend/node_modules` aur `backend/node_modules` independently exist karein; dono ke commands apne folder se run hon.

### Phase 2 — Express Backend Revamp

- Cloudflare Worker entry point ko Express + TypeScript app se replace karna.
- Environment validation, DB client, Drizzle schema/migrations aur clean shutdown/local server behavior add karna.
- Route, schema, controller, service, repository, email template aur middleware layers implement karna.
- `helmet`, JSON size limit, strict CORS allowlist aur centralized errors configure karna.
- Rate limiting backend par move karna. Serverless-safe shared store available na ho to limitation document hogi; production abuse protection ke liye distributed store preferred hoga.
- Logs mein secrets aur raw sensitive payloads include nahi honge.
- Existing Aiven PostgreSQL table/data ko preserve karna; destructive migration nahi chalani.

**Exit criteria:** local Express API health/contact endpoints work karein aur frontend source import kiye baghair backend build/start ho.

### Phase 3 — Backend Tests Aur Quality Gate

- Unit tests: schema validation, service behavior aur email failure policy.
- Integration tests: health, valid/invalid contact, 404, method errors aur rate limit.
- External DB/Resend ko tests mein mock/fake karna; real production services hit nahi hongi.
- `lint`, `typecheck`, `test`, `build`, aur local smoke test pass karna.
- Migration status inspect karna aur required migration explicitly run karna.

**Exit criteria:** backend independent, tested aur deploy-ready ho.

### Phase 4 — Backend Vercel Readiness Aur Deployment

- Backend project root ko `backend/` set karna.
- Vercel Express auto-detection verify karna; unnecessary custom routing config avoid karna.
- Required environment variables Vercel Preview aur Production environments mein set karna.
- Preview deployment par `/api/health` aur `/api/v1/contact` smoke test karna.
- Production deployment create karna aur logs/DB/email behavior verify karna.
- Production backend base URL record karna.

Official Vercel docs ke mutabiq Express app default-exported `app.ts`, `index.ts` ya `server.ts` se auto-detect ho sakti hai, aur monorepo ke har app ke liye alag Vercel project/root directory configure ki ja sakti hai.

**Exit criteria:** backend ka verified HTTPS production base URL available ho.

### Mandatory Pause / User Handoff

Is point par kaam pause hoga. User backend ka final Vercel URL share/confirm karega. Is URL ke baghair frontend production integration finalize nahi hogi.

### Phase 5 — Frontend API Integration

- Frontend se duplicate `app/api/contact/route.ts` remove karna.
- Backend DB/schema imports frontend se completely remove karna.
- Central API client/helper banana jo sirf `NEXT_PUBLIC_API_URL` read kare.
- Contact form ko canonical backend endpoint ke saath connect karna.
- Browser-only rate-limit ko UX hint tak limit ya remove karna; security enforcement backend par hogi.
- Repository-wide scan se confirm karna ke backend base URL hardcoded nahi.
- Network, validation, timeout aur server errors ke user-friendly states verify karna.

**Exit criteria:** local frontend deployed backend ko env variable ke through call kare aur direct backend imports/hardcoded base URLs zero hon.

### Phase 6 — Standard Next.js Frontend Aur Vercel Deployment

- Vinext/Vite/Wrangler/Cloudflare-specific frontend runtime remove karna.
- Standard Next.js configs/scripts ke saath frontend build karna.
- Existing page routes, assets, metadata aur visual behavior preserve karna.
- Frontend project root Vercel par `frontend/` set karna.
- `NEXT_PUBLIC_API_URL` Preview aur Production mein configure karna.
- Frontend preview aur production deploy karna.
- Frontend production origin ko backend `CORS_ORIGINS` allowlist mein add karke backend redeploy karna.
- End-to-end contact submission, DB row aur Resend email verify karna.

**Exit criteria:** frontend production URL live ho, contact flow end-to-end pass ho aur CORS exact production origins tak restricted ho.

### Phase 7 — Final Cleanup Aur Documentation

Migration successful hone ke baad hi obsolete files remove honge:

- root `.next/`, `.vinext/`, `.wrangler/`, `dist/`, `node_modules/`;
- empty `Digital_Solutions/`;
- Cloudflare Worker source aur Cloudflare-only tests/config;
- root `vite.config.ts` aur `build/sites-vite-plugin.ts`;
- obsolete root package/config files after their frontend/backend replacements exist;
- one-off `download-logos.cjs` ko ya `frontend/scripts/` mein move karna ya, agar no longer required ho, remove karna;
- `test-db.ts` ko safe backend diagnostic script mein convert karna ya remove karna;
- current Dockerfile ko remove ya backend/frontend-specific version se replace karna, depending on future non-Vercel need;
- `.openai/hosting.json` ko sirf tab remove karna jab confirm ho ke current hosting workflow mein required nahi.

Cleanup ke baad final repository scan, Git diff review aur fresh installs se reproducibility verify hogi.

## 9. Verification Checklist

### Backend

- [x] Fresh `npm ci` succeeds inside `backend/`.
- [x] Lint, typecheck, tests aur build pass.
- [x] Compiled `npm start` runtime smoke test pass.
- [x] Health endpoint 200 return kare.
- [x] Invalid contact payload 4xx return kare.
- [ ] Valid contact DB mein exactly aik row create kare.
- [ ] Resend notification expected recipient ko jaye.
- [x] Email failure saved DB submission ko fail na kare (unit test).
- [x] Unknown route consistent 404 JSON return kare.
- [x] CORS unknown origin reject kare.
- [ ] Vercel preview aur production smoke tests pass.

### Frontend

- [x] Fresh `npm ci` succeeds inside `frontend/`.
- [x] Lint, typecheck, tests aur `next build` pass.
- [x] Existing public routes render hon.
- [x] Contact form env-based backend ko call kare.
- [x] Missing API env par clear controlled error ho.
- [x] Backend URL ka hardcoded occurrence zero ho.
- [x] Backend-only package/import frontend mein zero ho.
- [ ] Vercel preview aur production render/smoke tests pass.

### Repository

- [x] Root shared npm dependency setup remove ho.
- [x] Frontend/backend ke separate lockfiles aur modules hon.
- [x] Real `.env` files ignored hon; `.env.example` safe ho.
- [x] Generated folders tracked na hon.
- [x] README local development, migrations aur deployment explain kare.
- [x] User ki pre-existing uncommitted changes preserve/merge hon.

## 10. Key Risks Aur Controls

- **Existing data loss:** schema push blindly nahi chalega; pehle current table inspect aur versioned migration review hogi.
- **Serverless DB connections:** DB client warm invocation reuse ke liye module scope par manage hoga; connection count constrained hoga.
- **Rate limiting:** in-memory limiter multiple serverless instances mein globally reliable nahi; distributed store ko production-grade option maana jayega.
- **CORS chicken-and-egg:** frontend URL milne ke baad backend allowlist update aur final redeploy required hoga.
- **Email partial failure:** DB ko source of truth rakha jayega; email failure log hogi aur response policy tests se lock hogi.
- **Framework migration regression:** Vinext removal ke baad har public route aur visual asset ka smoke test hoga.
- **Secret leakage:** env values console, Git diff, client bundle aur error responses mein expose nahi hongi.
- **Uncommitted work:** cleanup se pehle dirty files review honge; unrelated edits touch nahi hongi.

## 11. Deployment Decision

User ke requested workflow ke mutabiq recommended model **same repository + two separate Vercel projects** hai:

1. Backend Vercel project, Root Directory = `backend`
2. Frontend Vercel project, Root Directory = `frontend`

Yeh model separate base URLs, independent deployments aur clear dependency ownership deta hai. Vercel Services abhi is plan ke liye use nahi ki jayengi, kyun ke requested flow explicitly pehle backend URL hasil karne aur phir frontend env mein set karne ka hai.

## 12. Official References

- [Vercel: Ship an Express app](https://vercel.com/kb/guide/ship-a-express-app-on-vercel)
- [Vercel: Using monorepos](https://vercel.com/docs/monorepos)
- [Vercel: Project configuration](https://vercel.com/docs/project-configuration/vercel-json)
