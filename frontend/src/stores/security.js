import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { notify } from 'boot/app'

export const securityStore = defineStore('auth', {
  state: () => ({
    auth: {
      token: null
    }
  }),
  action: {
    async login ({ login, senha }) {
      const res = await api.post('security/v1/login', { login, senha })
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
    }
  }
})
