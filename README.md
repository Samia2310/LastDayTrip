# LastDayTrip MERN Tour Page

This project recreates the long-form travel details page from your screenshots using:

- `MongoDB`
- `Express`
- `React + Vite`
- `Node.js`
- MVC backend structure

## Folder structure

```text
.
|-- client
|-- server
|-- package.json
```

## Step-by-step setup

### 1. Install prerequisites

- Node.js 20 or newer
- MongoDB Community Server or MongoDB Atlas
- Git optional

### 2. Install dependencies

From the project root:

```bash
npm install
npm run install:all
```

### 3. Configure the backend environment

Copy `server/.env.example` to `server/.env` and update the values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/lastdaytrip
CLIENT_URL=http://localhost:5173
```

### 4. Add your images

Put your exported images into `client/public/assets/` and rename them to match the filenames listed in:

- `client/public/assets/README.md`

Until you add the real images, the page shows styled placeholders with the expected image filenames.

### 5. Seed the tour data into MongoDB

```bash
npm run seed
```

### 6. Start the app

```bash
npm run dev
```

Open:

- Frontend: `http://localhost:5173`
- API: `http://localhost:5000/api`

## Backend MVC structure

```text
server/src
|-- config
|-- controllers
|-- data
|-- models
|-- routes
|-- scripts
|-- app.js
|-- server.js
```

## Available API routes

- `GET /api/tours/barishal-backwater-sundarbans`
- `POST /api/bookings`
- `POST /api/inquiries`

## Notes

- The frontend is intentionally image-ready: you only need to replace the placeholder filenames with your actual exported assets.
- The layout is built for long-page browsing with sticky navigation, a sticky booking panel, smooth scrolling, and horizontal scrollers where the screenshots suggest them.

