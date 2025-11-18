import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { successMsg, errorMsg } from 'src/utils/toasts'
import { i18n } from 'boot/i18n'


export const usePublisherStore = defineStore('publisher', {
    state: () => ({
        publishers: [],
        loading: false,
        error: null
    }),

    actions: {
        fetchPublishers() {
            this.loading = true
            this.error = null

            return api.get('/publishers')
                .then(response => {
                    this.publishers = response.data.content
                })
                .catch(e => {
                    console.error('Erro:', e.response?.data || e.message);
                    errorMsg(i18n.global.t('toasts.error.getError'));
                })
                .finally(() => {
                    this.loading = false
                })
        },

        addPublisher(publisher) {
            return api.post('/publishers', publisher)
                .then(response => {
                    this.publishers.push(response.data)
                    successMsg(i18n.global.t('toasts.success.postSuccess'))
                    return true
                })
                .catch(error => {
                    errorMsg(i18n.global.t('toasts.error.postError'));
                    console.error('Erro:', error.response?.data || error.message);
                    return false
                })
        },

        updatePublisher(id, updated) {
            return api.put(`/publishers/${id}`, updated)
                .then(response => {
                    const index = this.publishers.findIndex(p => p.id === id)
                    if (index !== -1) this.publishers[index] = response.data
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

        deletePublisher(id) {

            return api.delete(`/publishers/${id}`)
                .then(() => {
                    this.publishers = this.publishers.filter(p => p.id !== id)
                    successMsg(i18n.global.t('toasts.success.deleteSuccess'))
                })
                .catch(error => {
                    const msg = error.response?.data?.error || error.message;
                    console.error('Erro:', msg);
                    errorMsg(i18n.global.t('toasts.error.deleteErrorPublishers'));
                    console.log("API message:", error.response?.data?.detail);
                })

        }
    }
})