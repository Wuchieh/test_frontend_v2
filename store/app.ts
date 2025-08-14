import { defineStore } from 'pinia'

export interface UserItem { id: number; name: string; age: number }
interface ApiResp<T> { code: number; data: T; message: string }

export const useAppStore = defineStore('app', {
  state: () => ({ list: [] as UserItem[], loading: false }),
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const r = await $fetch<ApiResp<UserItem[]>>('/api/users')
        this.list = r.data
      } finally { this.loading = false }
    },

    // ✅ 立刻插入到表格，使用回傳的 id
    async create(payload: Omit<UserItem, 'id'>) {
      const r = await $fetch<ApiResp<{ id: number }>>('/api/users', {
        method: 'POST',
        body: payload,
      })
      this.list.push({ id: r.data.id, ...payload })
      // 若想與後端 100% 同步（例如後端會正規化字串），再補一行：
      // await this.fetchAll()
    },

    // ✅ 前端同步更新（也可改成 await this.fetchAll()）
    async update(payload: UserItem) {
      await $fetch<ApiResp<string>>('/api/users', { method: 'PUT', body: payload })
      const i = this.list.findIndex(x => x.id === payload.id)
      if (i !== -1) this.list[i] = payload
      // 或：await this.fetchAll()
    },

    async remove(id: number) {
      await $fetch<ApiResp<string>>('/api/users', { method: 'DELETE', body: { id } })
      this.list = this.list.filter(x => x.id !== id)
    },
  }
})