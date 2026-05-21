# AutoSmart Maroc API

Express + MongoDB Atlas backend for the React client.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Edit `.env`:

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DB_NAME?retryWrites=true&w=majority
   JWT_SECRET=change_this_secret
   CLIENT_URL=http://localhost:5173
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=change_this_password
   ```

3. Start the API:

   ```bash
   npm run dev
   ```

The API runs at `http://localhost:5000/api`. Uploaded images are served from `http://localhost:5000/uploads`.

Health check:

```text
GET /api/health
```

Response:

```json
{ "success": true, "message": "Server running" }
```

## Client

The existing Vite proxy already sends `/api` and `/uploads` to `http://localhost:5000` during local development.

For hosted frontend deployments, set:

```env
VITE_API_URL=https://your-backend-domain.com
```

On MongoDB Atlas, Network Access must allow Vercel IPs. Use `0.0.0.0/0` for testing if needed, then restrict it later.

## Routes

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/cars`
- `GET /api/cars/:id`
- `POST /api/cars`
- `PUT /api/cars/:id`
- `PATCH /api/cars/:id/status`
- `DELETE /api/cars/:id`

Admin routes require `Authorization: Bearer <token>`.
