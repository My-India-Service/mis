# Admin Login Fix & cPanel Deployment

Summary of the `401 Unauthorized` admin-login issue on `myindiaservice.com/admin/login`, the fix, and how to deploy it on cPanel.

## What was wrong

1. **Password mismatch (the 401).** `POST /api/auth/login` returned `401 {"success":false,"message":"Invalid credentials"}`. The stored admin password hash no longer matched what was being typed. The seeder (`server/utils/seedAdmin.js`) only *creates* the admin if it does not already exist — it never *updates* the password. So the stored password reflected whatever `ADMIN_PASSWORD` was on the first server boot (or the default `admin123`), and later env changes had no effect.

2. **Broken password hashing hook.** The `Admin` model's `pre('save')` hook was written as an `async function (next)` that called `next()`. In Mongoose 8, async middleware is promise-based and receives **no** `next` callback, so `next()` threw `next is not a function`. This surfaced when resetting the password via `.save()`.

## What was changed

| File | Change |
|------|--------|
| `server/models/Admin.js` | Rewrote the `pre('save')` hook to the promise-based style (no `next`) so password hashing works on both `create()` and `save()`. |
| `server/utils/resetAdminPassword.js` | New one-off CLI script to reset (or create) the admin password. |
| `package.json` | Added `reset:admin` npm script. |

### The reset script

`server/utils/resetAdminPassword.js`:
- Connects to MongoDB using the existing `server/config/db.js`.
- Email: `ADMIN_EMAIL` (lowercased) or `admin@myindiaservice.com`.
- Password: first CLI argument, else `ADMIN_PASSWORD`, else `admin123`.
- Updates the existing admin's password (hashed by the model hook) or creates the admin if missing.
- Logs the email only (never the password), then exits.

## Deploy on cPanel (CloudLinux Node.js)

The server is a **git checkout** — GitHub is the source of truth. Never commit on the server; only pull.

### 1. Push the fix from your local machine

```bash
git add server/models/Admin.js server/utils/resetAdminPassword.js package.json
git commit -m "fix: admin password hashing + reset script"
git push origin main
```

### 2. Update the server

In cPanel, open **Terminal** (or the venv command from **Setup Node.js App**) so the prompt shows the venv prefix, e.g. `[mis (20)] [wwwmyind@s1334 mis]$`, then:

```bash
cd ~/mis
git pull
```

If `git pull` complains about local changes (from a prior `git add .` on the server), force the checkout to match GitHub — safe because code lives in git:

```bash
git reset --hard origin/main
```

> `node_modules` here is a symlink to the CloudLinux virtualenv and is gitignored, so `git reset --hard` will not touch your installed dependencies.

### 3. Reset the admin password

```bash
node server/utils/resetAdminPassword.js "YourNewStrongPassword"
```

Expected output:

```
MongoDB connected
Admin password reset for: admin@myindiaservice.com
```

No server restart is needed — the script writes directly to MongoDB Atlas.

### 4. Log in

Go to `https://myindiaservice.com/admin/login`:
- Email: `admin@myindiaservice.com`
- Password: exactly what you passed to the script (password comparison is case-sensitive).

## Common pitfalls

| Symptom | Cause / Fix |
|---------|-------------|
| `npm error Missing script: "reset:admin"` | Server not yet updated. `git pull` (or `git reset --hard origin/main`) first. |
| `Cannot find module '.../resetAdminPassword.js'` | Same — the file arrives only after pulling the latest commit. |
| `Failed to reset admin password: next is not a function` | Old `Admin.js` still on server. Pull the model fix. |
| `git pull` aborts: "local changes would be overwritten" | Run `git reset --hard origin/main`. Do not `git commit` on the server. |
| `Author identity unknown` on commit | You tried to commit on the server. Don't — commit locally, pull on the server. |
| Still `Invalid credentials` after reset | Password is case-sensitive; use the exact string passed to the script. Confirm `ADMIN_EMAIL` matches `admin@myindiaservice.com`. |

## Junk files to clean (optional)

A stray `git add .` on the server created untracked files `mis-mern@1.0.0` and `npm` in `~/mis`. Safe to remove:

```bash
rm -f ~/mis/mis-mern@1.0.0 ~/mis/npm
```

Do **not** delete `node_modules` (venv symlink) or `tmp/restart.txt` (cPanel restart trigger).
