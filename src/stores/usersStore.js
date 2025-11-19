import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { successMsg, errorMsg } from 'src/utils/toasts'
import { i18n } from 'boot/i18n'

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        loading: false,
        error: null
    }),
    actions: {
        fetchUsers() {
            this.loading = true
            this.error = null

            return api.get('/users')
                .then(response => {
                    this.users = response.data.content
                })
                .catch(e => {
                    console.error('Erro:', e.response?.data || e.message);
                    errorMsg(i18n.global.t('toasts.error.getError'));
                })
                .finally(() => {
                    this.loading = false
                })
        },

        addUser(user) {
            return api.post('/users', user)
                .then(() => {
                    successMsg(i18n.global.t('toasts.success.postSuccess'))
                    return true
                })
                .catch(error => {
                    errorMsg(i18n.global.t('toasts.error.postError'));
                    console.error('Erro:', error.response?.data || error.message);
                    console.log("API message:", error.response?.data?.detail);
                    return false
                })
        },

        updateUser(id, updated) {
            return api.put(`/users/${id}`, updated)
                .then(() => {
                    successMsg(i18n.global.t('toasts.success.putSuccess'))
                    return true
                })
                .catch(error => {
                    errorMsg(i18n.global.t('toasts.error.postError'));
                    console.error('Erro:', error.response?.data || error.message);
                    console.log("API message:", error.response?.data?.detail);
                    return false
                })
        },

        deleteUser(id) {
            return api.delete(`/users/${id}`)
                .then(() => {
                    successMsg(i18n.global.t('toasts.success.deleteSuccess'))
                    return true
                })
                .catch(error => {
                    errorMsg(i18n.global.t('toasts.error.deleteError'));
                    console.error('Erro:', error.response?.data || error.message);
                    console.log("API message:", error.response?.data?.detail);
                    return false
                })
        }
    }
})