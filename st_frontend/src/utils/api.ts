import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: false
})

// Интерцептор для обработки параметров сортировки
api.interceptors.request.use(config => {
    if (config.params?.sort_by) {
        config.params.ordering = config.params.sort_dir === 'desc'
            ? `-${config.params.sort_by}`
            : config.params.sort_by
        delete config.params.sort_by
        delete config.params.sort_dir
    }

    // Очистка от реактивных свойств Vue
    if (config.params) {
        const cleanParams: Record<string, any> = {}
        Object.keys(config.params).forEach(key => {
            if (!key.startsWith('__v_') && !key.startsWith('_')) {
                cleanParams[key] = config.params[key]
            }
        })
        config.params = cleanParams
    }

    return config
})

// Интерцептор для обработки ошибок
api.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ECONNABORTED') {
            error.message = 'Таймаут запроса к серверу'
        } else if (error.response) {
            // Обработка HTTP ошибок
            switch (error.response.status) {
                case 401:
                    error.message = 'Требуется авторизация'
                    break
                case 404:
                    error.message = 'Ресурс не найден'
                    break
                case 500:
                    error.message = 'Ошибка сервера'
                    break
            }
        }
        return Promise.reject(error)
    }
)

export default api