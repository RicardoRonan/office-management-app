# Office Management App

## Project Setup

This project is built using Vue.js and uses several packages for various functionalities. The JSON server backend is hosted on Render, and the frontend application is deployed on Netlify.

### Packages Used

- Vue.js
- Vue Router
- Pinia (state management)
- Axios (for HTTP requests)
- JSON Server (hosted on Render)
- Netlify (for frontend deployment)

### Clone the Repository

To clone the repository and run the project locally, follow these steps:

1. Clone the repository:
    git clone https://github.com/RicardoRonan/office-management-app.git


2. Navigate to the project directory:

    cd office-management-app


3. Install the dependencies:

    npm install


### Compiles and Hot-Reloads for Development

To start the development server with hot-reloading, run:

npm run serve

### Running the Backend Locally

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the JSON Server:
   ```
   npm start
   ```

   The server will run on `http://localhost:3000`

4. Update the API URL in `src/config/api.js` to use `http://localhost:3000` for local development, or create a `.env` file in the root directory with:
   ```
   VUE_APP_API_URL=http://localhost:3000
   ```

### HOSTING 

#### Backend (JSON Server) - Render Setup

The JSON server backend is hosted on Render. Follow these steps to set it up:

**Step 1: Create a Render Account**
1. Go to [render.com](https://render.com)
2. Sign up for a free account (you can use GitHub to sign in)

**Step 2: Create a New Web Service**
1. Click "New +" in the dashboard
2. Select "Web Service"
3. Connect your GitHub repository (or use "Public Git repository" and paste your repo URL)
4. Select the repository: `office-management-app`

**Step 3: Configure the Service**
- **Name**: `office-management-backend` (or any name you prefer)
- **Environment**: `Node`
- **Region**: Choose the closest region to you
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Step 4: Environment Variables**
- No environment variables are required for basic setup
- Render will automatically set the `PORT` environment variable

**Step 5: Deploy**
1. Click "Create Web Service"
2. Render will start building and deploying your backend
3. Wait for the deployment to complete (usually 2-3 minutes)
4. Once deployed, you'll get a URL like: `https://your-app-name.onrender.com`

**Step 6: Update Frontend Configuration**
1. Copy your Render backend URL
2. Update `src/config/api.js` and replace `'https://your-app.onrender.com'` with your actual Render URL
3. Or create a `.env` file in the root directory:
   ```
   VUE_APP_API_URL=https://your-app-name.onrender.com
   ```

**Important Notes:**
- Render's free tier spins down after 15 minutes of inactivity. The first request after spin-down may take 30-60 seconds to respond.
- For production, consider upgrading to a paid plan for always-on service.
- The `db.json` file will persist data, but it's stored in the filesystem. For production, consider using a proper database.

#### Frontend Deployment
The application frontend is deployed on Netlify. You can access the live version at:

### https://office-management-app-ricardo-moses.netlify.app