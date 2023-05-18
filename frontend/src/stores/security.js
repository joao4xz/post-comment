import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { notify } from 'boot/app'

export const securityStore = defineStore('auth', {
  state: () => ({
    auth: {
      token: null
    }
  }),
  actions: {
    async login ({ login, senha }) {
      const res = await api.post('/security/v1/login', { login, senha })
      const { message } = res.data
      if (message) {
        notify({
          type: 'negative',
          message
        })
        return
      }
      this.auth = res.data
      this.router.push('/')
    },
    logoff () {
      this.auth = {
        token: null
      }
      this.router.push('/login')
    }
  },
  persist: {
    key: 'app',
    path: ['auth'],
    storage: localStorage
  }
})
