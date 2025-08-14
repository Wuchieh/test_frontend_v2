import axios from 'axios'
export default defineEventHandler(async (event) => {
    const body = await readBody<{ id: number }>(event)
    const { public: { apiBase } } = useRuntimeConfig()
    const r = await axios.delete(`${apiBase}/api/user`, { data: body })
    return r.data
})