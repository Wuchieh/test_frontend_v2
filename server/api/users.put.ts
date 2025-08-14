import axios from 'axios'
export default defineEventHandler(async (event) => {
    const body = await readBody<{ id: number; name: string; age: number }>(event)
    const { public: { apiBase } } = useRuntimeConfig()
    const r = await axios.put(`${apiBase}/api/user`, body)
    return r.data
})