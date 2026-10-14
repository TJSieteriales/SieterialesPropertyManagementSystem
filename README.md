# StandByGIthub CRUD Lab Boilerplate

Reusable lab-exam starter with a React frontend, Laravel API, Super Admin login, CRUD records, Render deployment, and Aiven MySQL support.

## Structure

- `backend/` - Laravel 12 REST API
- `frontend/` - React 19 + Vite interface
- `render.yaml` - Render Blueprint for both services

## Local start

Backend:

```powershell
cd backend
copy .env.example .env
php artisan key:generate
New-Item -ItemType File -Force database\database.sqlite
php artisan migrate --seed
php artisan serve
```

Frontend in another terminal:

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

Default local-only credentials from `.env.example`:

- Email: `admin@example.com`
- Password: `change-me-now`

Change them before any public deployment.

## Aiven variables

Set these on the Render backend service from the Aiven connection information:

- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE` (often `defaultdb`)
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_SSL_CA_B64`

Create the CA value in PowerShell after downloading Aiven's `ca.pem`:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("ca.pem"))
```

Also provide:

- `APP_KEY` from `php artisan key:generate --show`
- `SUPER_ADMIN_EMAIL`
- `SUPER_ADMIN_PASSWORD`

Do not commit real credentials.

## Tomorrow's lab modification pattern

The generic entity is currently `Record` with `name`, `description`, and `status`. Rename or replace these pieces for the exam subject:

- `backend/app/Models/Record.php`
- `backend/app/Http/Controllers/Api/RecordController.php`
- the `records` migration
- `frontend/src/services/recordService.js`
- `frontend/src/components/RecordForm.jsx`
- `frontend/src/components/RecordTable.jsx`

Login, Super Admin authorization, API authentication, Render deployment, and Aiven configuration can stay unchanged.