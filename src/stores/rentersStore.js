import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { successMsg, errorMsg } from 'src/utils/toasts'
import { i18n } from 'boot/i18n'

export const useRenterStore = defineStore('renter', {
    state: () => ({
        renters: [],
        loading: false,
        error: null
    }),
    actions: {
        fetchRenters() {
            this.loading = true
            this.error = null

            return api.get('/renter')
                .then(response => {
                    this.renters = response.data
                })
                .catch(e => {
                    console.error('Erro:', e.response?.data || e.message);
                    errorMsg(i18n.global.t('toasts.error.getError'));
                })
                .finally(() => {
                    this.loading = false
                })
        },

        addRenter(renter) {
            return api.post('/renter', renter)
                .then(response => {
                    this.renters.push(response.data)
                    successMsg(i18n.global.t('toasts.success.postSuccess'))
                    return true
                })
                .catch(error => {
                    errorMsg(i18n.global.t('toasts.error.postErrorCpf'));
                    console.error('Erro:', error.response?.data || error.message);
                    return false
                })
        },

        updateRenter(id, updated) {
            return api.put(`/renter/${id}`, updated)
                .then(response => {
                    const index = this.renters.findIndex(r => r.id === id)
                    if (index !== -1) this.renters[index] = response.data
                    successMsg(i18n.global.t('toasts.success.putSuccess'))
                    return true
                })
                .catch(error => {
                    const msg = error.response?.data?.error || error.message;
                    console.error('Erro:', msg);
                    errorMsg(i18n.global.t('toasts.error.putErrorCpf'));
                    return false
                })
        },

        deleteRenter(id) {
            return api.delete(`/renter/${id}`)
                .then(() => {
                    this.renters = this.renters.filter(r => r.id !== id)
                    successMsg(i18n.global.t('toasts.success.deleteSuccess'))
                })
                .catch(error => {
                    const msg = error.response?.data?.error || error.message;
                    console.error('Erro:', msg);
                    errorMsg(i18n.global.t('toasts.error.deleteErrorRenters'));
                })
        }
    }
})