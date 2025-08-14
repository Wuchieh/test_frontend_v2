import axios from 'axios'
interface ApiResp<T> { code: number; data: T; message: string }
interface UserItem { id: number; name: string; age: number }

export default defineEventHandler(async () => {
    const { public: { apiBase } } = useRuntimeConfig()
    const r = await axios.get<ApiResp<UserItem[]>>(`${apiBase}/api/user`)
    return r.data
})