# My India Service - MERN Stack

Website converted from PHP/HTML to MERN (MongoDB, Express, React, Node.js).

## Project Structure

```
mis/
├── client/          # React frontend (Vite)
├── server/          # Express + MongoDB API
└── package.json     # Root scripts
```

## Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)

## Setup

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Server environment

Copy `server/.env.example` to `server/.env` and update values.

For email (contact form), set Gmail SMTP credentials. Without SMTP, form data still saves to MongoDB.

### 3. Start MongoDB

Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017/mis`

## Run Development

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
npm run dev:client
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Pages (same as original)

| Route | Page |
|-------|------|
| `/` | Home |
| `/faq` | FAQ |
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |
| `/contact` | Contact Us |
| `/refund` | Cancellation & Refund |

## Admin Dashboard

Manage blogs and events from the admin panel.

| URL | Description |
|-----|-------------|
| `/admin/login` | Admin login |
| `/admin` | Dashboard (blogs + events CRUD) |

**Default credentials** (change in `server/.env`):
- Email: `admin@myindiaservice.com`
- Password: `admin123`

### Public pages

| Route | Page |
|-------|------|
| `/blogs` | All published blogs |
| `/blogs/:slug` | Single blog detail |
| `/events` | All published events |

Published blogs/events also appear on the home page automatically.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | No | Admin login |
| GET | `/api/auth/me` | Yes | Current admin |
| GET | `/api/blogs` | No | Published blogs |
| GET | `/api/blogs?admin=true` | No* | All blogs (admin UI uses token) |
| POST/PUT/DELETE | `/api/blogs` | Yes | Manage blogs |
| GET | `/api/events` | No | Published events |
| POST/PUT/DELETE | `/api/events` | Yes | Manage events |
| POST | `/api/contact` | No | Contact form |

## Production Build

```bash
npm run build:client
npm run start:server
```

Serve `client/dist` via Express or deploy client to Vercel/Netlify and server separately.
