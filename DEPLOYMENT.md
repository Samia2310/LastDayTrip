# Deployment Guide

## Recommended setup

This repo is now set up for this deployment split:

- Frontend on Vercel
- Backend on Render
- Database on MongoDB Atlas Free

This works well because the frontend is already a Vite app and the backend is a normal Express/Mongoose app.

## Why this is the safest free option

- Vercel is excellent for the `client` app.
- Render still offers a free Node web service, but it spins down after 15 minutes of inactivity.
- MongoDB Atlas Free still gives you one free cluster per project and is a common choice for MERN demos.

## Frontend on Vercel, backend on Render

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
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Do not use `client/dist` as the output directory.

Do not use the repository root as the Vercel project root for this setup.

Required environment variable on Vercel:

```text
VITE_API_BASE_URL=https://your-api-name.onrender.com/api
```

You can also set it to `https://your-api-name.onrender.com`. The frontend now normalizes that value to `/api` automatically.

The frontend already supports this pattern in [client/src/lib/api.js](./client/src/lib/api.js).

The SPA rewrite for Vercel is already in [client/vercel.json](./client/vercel.json).

## Important note

I removed an unnecessary `file:..` dependency from both `client/package.json` and `server/package.json`.

That dependency often breaks deployments on platforms that isolate a subdirectory build root.

I also removed the repository root `vercel.json` so Vercel will not force repo-level install/build settings onto the frontend deployment.
