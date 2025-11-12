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

            return api.get('/user')
                .then(response => {
                    this.users = response.data
                    // this.users = response.data.map(user => ({
                    //     ...user,
                    //     role: user.role === 'ADMIN' 
                    //     ? i18n.global.t('roleAdmin') 
                    //     : i18n.global.t('roleUser')
                    // }))
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
            return api.post('/user', user)
                .then(response => {
                    this.users.push(response.data)
                    successMsg(i18n.global.t('toasts.success.postSuccess'))
                    return true
                })
                .catch(error => {
                    errorMsg(i18n.global.t('toasts.error.postError'));
                    console.error('Erro:', error.response?.data || error.message);
                    return false
                })
        },

        updateUser(id, updated) {
            return api.put(`/user/${id}`, updated)
                .then(response => {
                    const index = this.users.findIndex(u => u.id === id)
                    if (index !== -1) this.users[index] = response.data
                    successMsg(i18n.global.t('toasts.success.putSuccess'))
                    return true
                })
                .catch(error => {
                    const msg = error.response?.data?.error || error.message;
                    console.error('Erro:', msg);
                    errorMsg(i18n.global.t('toasts.error.putError'));
                    return false
                })
        },

        deleteUser(id) {
            return api.delete(`/user/${id}`)
                .then(() => {
                    this.users = this.users.filter(u => u.id !== id)
                    successMsg(i18n.global.t('toasts.success.deleteSuccess'))
                })
                .catch(error => {
                    const msg = error.response?.data?.error || error.message;
                    console.error('Erro:', msg);
                    errorMsg(i18n.global.t('toasts.error.deleteError'));
                })
        }
    }
})