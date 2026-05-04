# Deployment Guide

## Recommended setup

For this repo, the cleanest free deployment is:

- Frontend on Vercel
- Backend on Render
- Database on MongoDB Atlas Free

This works well because the frontend is already a Vite app and the backend is a normal Express/Mongoose app.

## Why this is the safest free option

- Vercel is excellent for the `client` app.
- Render still offers a free Node web service, but it spins down after 15 minutes of inactivity.
- MongoDB Atlas Free still gives you one free cluster per project and is a common choice for MERN demos.

## Option 1: Frontend on Vercel, backend on Render

### 1. Deploy the backend to Render

This repo now includes a [render.yaml](./render.yaml) blueprint for the backend service.

Render settings for this project:

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`

Required environment variables on Render:

- `MONGODB_URI`
- `CLIENT_URL`

Set `CLIENT_URL` to your final Vercel frontend URL, for example:

```text
https://your-app.vercel.app
```

After deploy, your backend URL will look like:

```text
https://your-api-name.onrender.com
```

### 2. Deploy MongoDB

Create a MongoDB Atlas Free cluster and copy the connection string into Render as `MONGODB_URI`.

For a hobby/demo app, many people temporarily allow access from anywhere in Atlas:

```text
0.0.0.0/0
```

Use a strong database password if you do this.

### 3. Deploy the frontend to Vercel

Deploy only the `client` folder to Vercel.

Use these settings:

- Root Directory: `client`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

Required environment variable on Vercel:

```text
VITE_API_BASE_URL=https://your-api-name.onrender.com/api
```

The frontend already supports this pattern in [client/src/lib/api.js](./client/src/lib/api.js).

The SPA rewrite for Vercel is already in [client/vercel.json](./client/vercel.json).

## Option 2: Deploy the whole project on Vercel

This repo also has a Vercel serverless adapter in [api/[...path].js](./api/%5B...path%5D.js), so full deployment on Vercel is possible for a hobby demo.

Use this only if your API traffic is light and you are okay with serverless behavior:

- cold starts
- MongoDB connection reuse concerns
- request duration limits

For this option:

- Deploy the repo root to Vercel
- Keep the root [vercel.json](./vercel.json)
- Add `MONGODB_URI` in Vercel environment variables

In this mode, the frontend can keep using same-origin `/api` requests in production.

## Important note

I removed an unnecessary `file:..` dependency from both `client/package.json` and `server/package.json`.

That dependency often breaks deployments on platforms that isolate a subdirectory build root.
