// API Configuration
// IMPORTANT: Replace 'YOUR_RENDER_URL' with your actual Render backend URL
// For local development, use: http://localhost:3000
// For production, use your Render URL (e.g., https://your-app-name.onrender.com)
// You can also set this via environment variable: VUE_APP_API_URL

// Default to localhost for development, but you MUST update this for production
const API_BASE_URL = process.env.VUE_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? 'YOUR_RENDER_URL' : 'http://localhost:3000');

// Warn if using placeholder URL
if (API_BASE_URL === 'YOUR_RENDER_URL') {
  console.error('⚠️ WARNING: Please update the API URL in src/config/api.js or set VUE_APP_API_URL environment variable');
  console.error('Current API URL is set to placeholder. Update it with your Render backend URL.');
}

const config = {
  baseURL: API_BASE_URL,
  endpoints: {
    offices: `${API_BASE_URL}/offices`,
    workers: `${API_BASE_URL}/workers`,
  }
};

export default config;
