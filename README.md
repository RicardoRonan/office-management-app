# Office Management App

A Vue.js app for managing offices and workers. Backend on Render, frontend on Netlify.

---

## Live Demo

| | URL |
|---|-----|
| **Frontend** | [https://rics-office-management.netlify.app](https://rics-office-management.netlify.app) |
| **Backend API** | [https://office-management-app.onrender.com](https://office-management-app.onrender.com) |

---

## Tech Stack

- **Frontend:** Vue.js, Vue Router, Pinia, Axios
- **Backend:** JSON Server (Node)
- **Hosting:** Netlify (frontend), Render (backend)

---

## Local Development

### Prerequisites

- Node.js 14+
- npm

### 1. Clone and install

```bash
git clone https://github.com/RicardoRonan/office-management-app.git
cd office-management-app
npm install
```

### 2. Run the frontend

```bash
npm run serve
```

App runs at `http://localhost:8080` (or the port shown in the terminal).

### 3. Run the backend

In a **second terminal**:

```bash
cd backend
npm install
npm start
```

Backend runs at `http://localhost:3000`.

### 4. Point frontend to local backend (optional)

For local development the app uses `http://localhost:3000` by default. To override:

```bash
# In project root
echo VUE_APP_API_URL=http://localhost:3000 > .env
```

---

## Hosting (Free)

### Backend — Render

1. Sign up at [render.com](https://render.com) (e.g. with GitHub).
2. **New +** → **Web Service** → connect `office-management-app` repo.
3. Use:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Create the service. Render sets `PORT` automatically.
5. Note the URL (e.g. `https://office-management-app.onrender.com`).

**Note:** Free tier spins down after ~15 minutes of inactivity; the first request after that can take 30–60 seconds.

### Frontend — Netlify

1. Sign up at [netlify.com](https://netlify.com) (e.g. with GitHub).
2. **Add new site** → **Import an existing project** → choose the repo.
3. Use:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. (Optional) Add env: `VUE_APP_API_URL` = your Render URL.
5. Deploy.

`src/config/api.js` is already set to use the Render URL in production, so the app will work once both are deployed.

---

## Project Structure

```
office-management-app/
├── backend/           # JSON Server API
│   ├── db.json
│   ├── server.js
│   └── package.json
├── public/
├── src/
│   ├── config/        # API URL (api.js)
│   ├── components/
│   ├── views/
│   ├── store/
│   └── router/
├── package.json
└── README.md
```

---

## API

- `GET /offices` — list offices
- `POST /offices` — create office
- `GET /offices/:id` — get office
- `PUT /offices/:id` — update office
- `DELETE /offices/:id` — delete office
- `GET /workers` — list workers
- `POST /workers` — create worker
- `GET /workers/:id` — get worker
- `PUT /workers/:id` — update worker
- `DELETE /workers/:id` — delete worker

---

## License

MIT
