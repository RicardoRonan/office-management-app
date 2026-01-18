// API Configuration
// IMPORTANT: Replace 'YOUR_RENDER_URL' with your actual Render backend URL
// For local development, use: http://localhost:3000
// For production, use your Render URL (e.g., https://your-app-name.onrender.com)
// You can also set this via environment variable: VUE_APP_API_URL

// Default to localhost for development, production uses Render URL
const API_BASE_URL = process.env.VUE_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? 'https://office-management-app.onrender.com' : 'http://localhost:3000');

// Log the current API URL for debugging
console.log('🔌 API Base URL:', API_BASE_URL);

const config = {
  baseURL: API_BASE_URL,
  endpoints: {
    offices: `${API_BASE_URL}/offices`,
    workers: `${API_BASE_URL}/workers`,
  }
};

export default config;
