import { useAuthStore } from '@/stores/auth.store'

export const authGuard = (to: any, from: any, next: any) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
        next({
            path: '/auth',
            query: {
                type: 'login',
                redirect: to.fullPath
            }
        })
    } else {
        next()
    }
}