import axios from 'axios'
export default defineEventHandler(async (event) => {
    const body = await readBody<{ name: string; age: number }>(event)
    const { public: { apiBase } } = useRuntimeConfig()
    const r = await axios.post(`${apiBase}/api/user`, body)
    return r.data
})