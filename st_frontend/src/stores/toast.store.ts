import { defineStore } from 'pinia'

interface ToastState {
    message: string | null
    type: 'success' | 'error' | 'info'
    timeout: number
}

interface User {
    id: number
    username: string
    email: string
    phone?: string
    date_joined: string
}

export const useToastStore = defineStore('toast', {
    state: (): ToastState => ({
        message: null,
        type: 'info',
        timeout: 3000
    }),

    actions: {
        show(message: string, type: 'success' | 'error' | 'info' = 'info') {
            this.message = message
            this.type = type

            // Автоматическое скрытие через timeout
            if (this.timeout) {
                setTimeout(() => {
                    this.hide()
                }, this.timeout)
            }
        },

        hide() {
            this.message = null
        }
    }
})

