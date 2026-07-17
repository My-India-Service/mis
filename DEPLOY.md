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
| `ADMIN_PASSWORD` | Yes | a strong password |
| `EMAIL_TO` / `EMAIL_FROM` | No | contact form recipient/sender |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | No | contact form email |

## Step 6: Install dependencies

In the Node.js app panel click **Run NPM Install**. Because the root [`package.json`](package.json) lists the runtime dependencies, this installs `express`, `mongoose`, etc. into the virtualenv.

Verify in Terminal (activate the venv command shown in the panel first):

```bash
cd ~/mis
node -e "require('express'); require('mongoose'); console.log('deps OK')"
```

You should see `deps OK`. If not, see Troubleshooting.

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

## Troubleshooting

| Problem | Fix |
|---------|-----|
| 503 / `Error: Cannot find module 'express'` | Runtime deps missing. Ensure root [`package.json`](package.json) lists them, then **Run NPM Install** + **Restart**. Quick check: `node -e "require('express')"` |
| `npm install` says "audited 2 packages" | The dependency is not in the **app-root** `package.json`. On this host npm only installs from the app root, not from `server/` |
| `sh: vite: command not found` | Do not build on the server (`omit=dev` blocks vite). Build `client/dist` locally and commit it (Step 2) |
| `sh: nodemon: command not found` | Expected — `nodemon` is a devDependency and is not installed in production. Use the panel Restart, not `npm run dev` |
| Blank page but `/api/health` works | `client/dist` missing on server — rebuild locally and commit, then `git pull` |
| CORS error | Set `CLIENT_URL` to the exact live URL including `https://` |
| MongoDB connection failed | Check Atlas IP allowlist and `MONGODB_URI` |
| Old PHP site still showing | Domain must map to the Node.js app, not `public_html` |

## Notes

- Do not upload the project as a ZIP via File Manager — cPanel antivirus often flags it (`Sanesecurity.Foxhole...`). Use Git.
- Keep the app code in `~/mis` (home directory), not inside `public_html`.
