import axios from 'axios'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const http = axios.create({
        baseURL: config.public.apiBase,
        timeout: 10000,
    })

    http.interceptors.response.use(
        (res) => res,
        (err) => Promise.reject(err)
    )

    return { provide: { http } }
})

declare module '#app' {
    interface NuxtApp {
        $http: import('axios').AxiosInstance
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $http: import('axios').AxiosInstance
    }
}