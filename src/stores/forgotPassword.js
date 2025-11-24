import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useRecoverPasswordStore = defineStore('recoverPassword', {
  state: () => ({
    recoverToken: null
  }),

  actions: {
    async forgotPassword(email) {
      const response = await api.post('/auth/forgot-password', { email })
      //  console.log("RESPOSTA DO BACK:", response.data)

      const token = response.data.resetToken
      this.recoverToken = token
      localStorage.setItem('recoverToken', token)

      return response
    },

    async resetPassword(newPassword) {
      const token = this.recoverToken || localStorage.getItem('recoverToken')

      if (!token) {
        throw new Error("Token de recuperação não encontrado!")
      }

      return await api.post('/auth/reset-password', {
        token,
        newPassword
      })
    }
  }
})
