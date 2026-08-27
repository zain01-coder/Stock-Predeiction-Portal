import axios from 'axios'

// The address of the Django backend.
// Change it in the .env file, not here, when you deploy the project.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/'

// One shared axios object for the whole app, so we never repeat the base URL
const api = axios.create({
    baseURL: baseURL,
    headers:{
        'Content-Type':'application/json',
    }
})

//Request Interceptor
api.interceptors.request.use (
    function(config){
        const accessToken = localStorage.getItem('accessToken')
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)


api.interceptors.response.use(
    function(response){
        return response
    },
    async function(error){
        const originalRequest = error.config
        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true
            const refreshToken = localStorage.getItem('refreshToken')
            try{
                const response = await api.post('accounts/api/token/refresh/', {refresh:refreshToken})
                localStorage.setItem('accessToken', response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return api(originalRequest)
            }
            catch{
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default api
