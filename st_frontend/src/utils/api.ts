import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Добавляем параметры сортировки в запросы
api.interceptors.request.use(config => {
    if (config.params?.sort_by) {
        config.params.ordering = config.params.sort_dir === 'desc'
            ? `-${config.params.sort_by}`
            : config.params.sort_by
        delete config.params.sort_by
        delete config.params.sort_dir
    }
    return config
})

export default api