# AutoSmart Maroc Deployment

This repository has two Vercel projects:

- `server`: Node.js Express API with MongoDB Atlas
- `client`: React Vite frontend

## Local Development

Install and run the backend:

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Edit `server/.env` with real local values before running the API.

Install and run the frontend:

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

For local frontend development, use:

```env
VITE_API_URL=http://localhost:5000
```

The backend health route is:

```text
GET http://localhost:5000/api/health
```

Expected response:

```json
{ "success": true, "message": "Server running" }
```

## Vercel Server Deployment

Create a Vercel project for the API.

Settings:

- Root Directory: `server`
- Framework Preset: `Other`
- Build Command: leave empty
- Output Directory: leave empty
- Install Command: `npm install`
- Start Command: leave empty

Environment variables:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DB_NAME?retryWrites=true&w=majority
JWT_SECRET=change_this_secret
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_this_password
```

Deploy the server first, then test:

```text
https://your-server-project.vercel.app/api/health
```

MongoDB Atlas note: in Atlas Network Access, allow Vercel IPs. For testing, many projects use `0.0.0.0/0`, then tighten this later.

## Vercel Client Deployment

Create a separate Vercel project for the frontend.

Settings:

- Root Directory: `client`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Environment variables:

```env
VITE_API_URL=https://your-server-project.vercel.app
```

Deploy the client and copy the frontend URL:

```text
https://your-client-project.vercel.app
```

Then update the server Vercel project:

```env
CLIENT_URL=https://your-client-project.vercel.app
```

Redeploy both Vercel projects after changing environment variables.
