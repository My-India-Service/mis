# cPanel (CloudLinux) Deployment Guide

Deploy the My India Service MERN app on cPanel using **Setup Node.js App**. Express serves both the React frontend and the API from a single Node.js process — no separate frontend hosting.

## How this app runs

```
Browser ──► myindiaservice.com ──► cPanel Node.js App
                                        │
                                        ▼
                                  server/index.js (Express)
                                   ├── /api/*        → REST API
                                   ├── /uploads/*    → uploaded images
                                   └── /*            → client/dist (React SPA)
                                        │
                                        ▼
                                  MongoDB Atlas (cloud)
```

`server/index.js` serves the pre-built React app from `../client/dist` and the API on the same origin. The frontend calls the API using the relative path `/api`, so no API URL configuration is needed.

## Important CloudLinux cPanel constraints (read first)
Note: activiating node env: [wwwmyind@s1334 ~]$ source ~/nodevenv/mis/20/bin/activate
This host (CloudLinux Node.js Selector) behaves differently from a normal server. These two facts drive the whole deployment:

1. **npm installs only from the app-root `package.json` into a virtualenv.**
   The app root's `node_modules` is a symlink to the virtualenv
   (`~/mis/node_modules -> ~/nodevenv/mis/20/lib/node_modules`).
   `npm install --prefix server` and `cd server && npm install` do **not** create `server/node_modules`.
   Therefore the **root [`package.json`](package.json) must declare all runtime dependencies** the server needs. It does — its `dependencies` mirror [`server/package.json`](server/package.json).

2. **`omit=dev` is enforced**, so devDependencies (like `vite`) are never installed.
   You **cannot build the React app on the server**. Build it locally and commit `client/dist`.

## Prerequisites

- cPanel account with **Setup Node.js App** (Node 18.x or 20.x)
- Domain linked + SSL active
- [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier is fine)
- Git access to the repository

## Step 1: MongoDB Atlas

1. Create a free cluster.
2. Create a database user + password.
3. Network Access: allow the server IP (or `0.0.0.0/0` for testing).
4. Copy the connection string: `mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/mis`

## Step 2: Build the frontend locally and commit it

On your own machine (where devDependencies install normally):

```bash
npm run install:all
npm run build:client      # outputs client/dist
git add client/dist
git commit -m "build client for deploy"
git push
```

`client/dist` is intentionally tracked in git (see [.gitignore](.gitignore)) so the server never needs to build.

## Step 3: Get the code on the server

In cPanel → Terminal:

```bash
cd ~
git clone https://github.com/My-India-Service/mis.git mis
cd mis
```

(For updates later: `cd ~/mis && git pull`.)

## Step 4: Create the Node.js app

cPanel → **Setup Node.js App → Create Application**

| Setting | Value |
|---------|-------|
| Node.js version | 18.x or 20.x |
| Application mode | Production |
| Application root | `mis` |
| Application URL | `myindiaservice.com` |
| Application startup file | `server/index.js` |

## Step 5: Environment variables

Add these in the Node.js app panel:

| Variable | Required | Example |
|----------|----------|---------|
| `PORT` | Yes | (value shown by cPanel, e.g. `5001`) |
| `MONGODB_URI` | Yes | `mongodb+srv://user:pass@cluster.mongodb.net/mis` |
| `CLIENT_URL` | Yes | `https://myindiaservice.com` |
| `JWT_SECRET` | Yes | a long random string |
| `ADMIN_EMAIL` | Yes | `admin@myindiaservice.com` |
| `ADMIN_PASSWORD` | Yes | a strong password (synced into Mongo on every app start via `seedAdmin`) |
| `EMAIL_TO` / `EMAIL_FROM` | No | contact form recipient/sender |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | No | contact form email |

## Step 6: Install dependencies

In the Node.js app panel click **Run NPM Install**. Because the root [`package.json`](package.json) lists the runtime dependencies, this installs `express`, `mongoose`, etc. into the virtualenv.

Verify in Terminal (activate the venv command shown in the panel first). **Venv activation is per terminal session** — closing Terminal drops it, so you must activate again every time you reopen Terminal before `node` / `npm` work:

```bash
cd ~/mis
node -e "require('express'); require('mongoose'); console.log('deps OK')"
```

You should see `deps OK`. A working session’s prompt includes the app prefix (e.g. `[mis (20)]`). If not, see Troubleshooting.

## Step 7: Restart and test

Click **Restart** in the Node.js app panel, then:

- `https://myindiaservice.com/api/health` → `{"status":"ok"}`
- `https://myindiaservice.com` → the site loads
- `https://myindiaservice.com/admin/login` → admin login

## Updating after code changes

```bash
cd ~/mis
git pull
```

- If frontend changed: make sure you rebuilt `client/dist` locally and committed it (Step 2).
- If server dependencies changed: update the `dependencies` in the root [`package.json`](package.json) to match [`server/package.json`](server/package.json), commit, pull, then click **Run NPM Install**.
- Click **Restart**.

### Admin users & permissions

Dashboard users have a per-user permission matrix (`manage_blogs`, `manage_events`, `manage_stories`, `manage_submissions`, `manage_users`, `manage_uploads`). Anyone with `manage_users` can add/edit users from the **Users** tab.

After deploying this feature: rebuild/commit `client/dist`, `git pull` on the server, then **Restart**. `seedAdmin` grants **all** permissions to the `ADMIN_EMAIL` account. Other existing admins default to no permissions until a full-access user grants them (or you set flags in Atlas).

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `bash: node: command not found` after reopening Terminal | Activate the Node.js app virtualenv every new session (panel “Enter to the virtual environment” command, or `source ~/nodevenv/mis/20/bin/activate`). Confirm the prompt shows `[mis (20)]`. Adjust `20` if the app uses Node 18. The live site can still run via Passenger even when Terminal has no Node. |
| 503 / `Error: Cannot find module 'express'` | Runtime deps missing. Ensure root [`package.json`](package.json) lists them, then **Run NPM Install** + **Restart**. Quick check: `node -e "require('express')"` |
| `npm install` says "audited 2 packages" | The dependency is not in the **app-root** `package.json`. On this host npm only installs from the app root, not from `server/` |
| `sh: vite: command not found` | Do not build on the server (`omit=dev` blocks vite). Build `client/dist` locally and commit it (Step 2) |
| `sh: nodemon: command not found` | Expected — `nodemon` is a devDependency and is not installed in production. Use the panel Restart, not `npm run dev` |
| Blank page but `/api/health` works | `client/dist` missing on server — rebuild locally and commit, then `git pull` |
| CORS error | Set `CLIENT_URL` to the exact live URL including `https://` |
| MongoDB connection failed | Check Atlas IP allowlist and `MONGODB_URI` |
| Site data / admin login does not match panel Atlas or `ADMIN_PASSWORD` | Wrong DB name in URI (often missing `/mis` → DB `test`), or Terminal using a different env than Passenger. See **Verify active MongoDB / env** below. |
| Admin login `Invalid credentials` despite panel `ADMIN_PASSWORD` | Panel env is not checked at login — the password is stored hashed in Mongo. After this deploy, `seedAdmin` syncs panel `ADMIN_EMAIL` / `ADMIN_PASSWORD` into Mongo on every app **Restart**. Pull latest code, then Restart. Immediate workaround (venv on, URI with `/mis`): `node server/utils/resetAdminPassword.js 'YourPanelPassword'` (case-sensitive). |
| Dashboard tabs missing / “no dashboard permissions” after deploy | Existing users default to no caps. Restart so `seedAdmin` restores full access for `ADMIN_EMAIL`, then use **Users** to grant other accounts. |
| Old PHP site still showing | Domain must map to the Node.js app, not `public_html` |

### `node: command not found` (new Terminal session)

CloudLinux does not put Node on PATH for a bare shell. After opening Terminal:

1. cPanel → **Setup Node.js App** → your `mis` app → copy **Enter to the virtual environment** (or run `source ~/nodevenv/mis/20/bin/activate`).
2. `cd ~/mis` then `node -v` / `npm -v` — versions should print and the prompt should show `[mis (20)]`.

Env vars for one-off `node` scripts may still be empty in that shell (they live in the Node.js App panel for Passenger). Export `MONGODB_URI=...` inline, or use a `.env` under `~/mis` if you keep one there.

### Verify active MongoDB / env

The live site (Passenger) gets env from **Setup Node.js App**. Terminal does **not** inherit those vars automatically — after activating the venv, one-off scripts only see shell exports plus `~/mis/.env` if present (`dotenv` does not override panel vars already set in Passenger). App root is `~/mis`, so dotenv looks for `~/mis/.env`, not `server/.env`.

1. Activate venv and `cd ~/mis` (prompt must show `[mis (20)]`). Pull latest code first so these scripts exist: `git pull`.

2. Print what this shell sees (password masked):

```bash
node server/utils/printMongoEnv.js
```

3. Connect and print the **actual DB name + counts** (the data this process would hit):

```bash
node server/utils/checkMongoDb.js
```

4. Compare with the panel: **Setup Node.js App** → `mis` → Environment variables → `MONGODB_URI`.

- Good: `...mongodb.net/mis?...` (database name `mis`)
- Bad / common mismatch: `...mongodb.net/?appName=...` (no DB name → often database `test`)

### Switch from DB `test` to DB `mis`

If `checkMongoDb.js` prints `db name: test`, the URI is missing the database name. Same cluster, wrong database.

1. Change the URI from  
   `...mongodb.net/?appName=Cluster0`  
   to  
   `...mongodb.net/mis?appName=Cluster0`  
   (insert `/mis` immediately before `?`; keep the same user, password, and host).

2. **Live site:** cPanel → **Setup Node.js App** → Environment variables → set `MONGODB_URI` to the value with `/mis` → **Save** / **Restart**.

3. **Terminal (this session):**

```bash
export MONGODB_URI='mongodb+srv://USER:PASS@cluster.mongodb.net/mis?appName=Cluster0'
node server/utils/printMongoEnv.js
node server/utils/checkMongoDb.js
```

Confirm `db name: mis`. Optional: put the same line in `~/mis/.env` for future CLI runs (do not commit `.env`).

4. Admin on `mis` may differ from `test`. After the switch:

```bash
node server/utils/resetAdminPassword.js "YourNewStrongPassword"
```

5. If `printMongoEnv.js` says `MONGODB_URI` is missing but the site works: panel has the var for Passenger only. Export the **real** URI from the panel (with `/mis`, not placeholder text), then re-run `checkMongoDb.js`. Or put the same URI in `~/mis/.env` for Terminal scripts.

## Notes

- Do not upload the project as a ZIP via File Manager — cPanel antivirus often flags it (`Sanesecurity.Foxhole...`). Use Git.
- Keep the app code in `~/mis` (home directory), not inside `public_html`.
