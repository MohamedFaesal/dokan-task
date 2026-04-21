# Dokan Task — Full-stack project

This repository is a **monorepo** with two applications:

| Folder | Stack | Role |
|--------|--------|------|
| **`backend/`** | Laravel 11, PHP 8.2+, Laravel Sanctum | REST API (login, logout, tokens, users) |
| **`frontend/`** | Next.js 16, React 19, Tailwind CSS 4 | Web UI (login flow, success screen, dashboard stub) |

The frontend talks to the backend over HTTP (JSON). Authentication uses **Sanctum personal access tokens** stored in the browser (`localStorage`) for development.

---

## Prerequisites

Install these on your machine before you start:

| Tool | Version (recommended) | Used by |
|------|------------------------|---------|
| **PHP** | 8.2 or newer | Backend |
| **Composer** | 2.x | Backend dependencies |
| **Node.js** | **18.12+** (20 LTS is a safe choice) | Frontend — Next.js 16 and `pnpm` need a current Node |
| **pnpm** | 9.x (or compatible) | Frontend (lockfile is `pnpm-lock.yaml`) |

Optional but useful:

- **SQLite** — nothing to install; Laravel can use a file DB (default in `backend/.env.example`).
- **PostgreSQL / MySQL** — if you switch `DB_*` in `.env`, use a client you already use for administration.

---

## Quick start (run everything)

You need **two terminal windows** (or tabs): one for the API, one for the web app.

### 1) Backend (Laravel API)

```bash
cd backend
```

**Install PHP dependencies:**

```bash
composer install
```

**Environment file:**

```bash
cp .env.example .env
php artisan key:generate
```

Edit **`backend/.env`** and set at least:

- **`APP_URL`** — e.g. `http://127.0.0.1:8000` if you use `php artisan serve` on port 8000.
- **Database** — default example uses SQLite (`DB_CONNECTION=sqlite`). Ensure the database file exists:

  ```bash
  touch database/database.sqlite
  ```

  If you use **PostgreSQL** or **MySQL**, set `DB_CONNECTION`, `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` accordingly. The DB user must be allowed to run migrations (create tables) on the chosen database.

**CORS (required so the Next.js app can call the API from another origin):**

In **`backend/.env`**, set allowed frontend origins (comma-separated, no spaces unless intentional):

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Adjust ports/hosts if your Next dev server runs elsewhere.

**Run migrations and seed sample data:**

```bash
php artisan migrate
php artisan db:seed
```

The seeder creates **five** users: one fixed test account plus four from the factory. Use this account to try the UI:

| Field | Value |
|--------|--------|
| **Email** | `test@dokan.sa` |
| **Password** | `Dokan@123456` |

(Defined in `database/seeders/UserSeeder.php`.)

**Start the API server:**

```bash
php artisan serve
```

By default the API is at **`http://127.0.0.1:8000`**.  
JSON routes are under the **`/api`** prefix, for example:

- `POST /api/login` — email + password → returns `user`, `token`, `token_type`
- `POST /api/logout` — requires `Authorization: Bearer {token}`

**Optional — list users from the CLI:**

```bash
php artisan users:list
```

---

### 2) Frontend (Next.js)

```bash
cd frontend
```

**Install dependencies:**

```bash
pnpm install
```

If you do not use `pnpm`, you can try `npm install` or `yarn install`, but the repo is set up for **pnpm** (`pnpm-lock.yaml`).

**Environment file:**

Create **`frontend/.env.local`** (Next.js reads this locally; it is not committed to git). You can start from the example:

```bash
cp .env.example .env.local
```

Set the API base URL to match your Laravel server (no trailing slash):

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

**Start the dev server:**

```bash
pnpm dev
```

Open **`http://localhost:3000`** (or the URL printed in the terminal). The app redirects `/` → **`/login`**.

**Production-style run (after a build):**

```bash
pnpm build
pnpm start
```

---

## How the pieces fit together

1. **Login** (`/login`) — form submits to **`POST {NEXT_PUBLIC_API_URL}/api/login`**. On success, the app stores `auth_token` and `auth_user` in **`localStorage`** and navigates to **`/login/success`**.
2. **Success** (`/login/success`) — shown only with a valid token in `localStorage`. Includes **Log out**, which calls **`POST /api/logout`** with the Bearer token, then clears storage and returns to **`/login`**.
3. **Guard** — If you already have a token and open **`/login`**, the client redirects you to **`/login/success`** so you are not stuck on the login form while still “logged in”.
4. **Dashboard** (`/dashboard`) — minimal page that reads the stored user; link back to the welcome screen instead of the raw login URL.
