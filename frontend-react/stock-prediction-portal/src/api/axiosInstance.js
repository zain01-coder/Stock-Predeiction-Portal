import axios from 'axios'

// The address of the Django backend.
// Change it in the .env file, not here, when you deploy the project.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/'

// One shared axios object for the whole app, so we never repeat the base URL
const api = axios.create({
    baseURL: baseURL,
})

export default api
