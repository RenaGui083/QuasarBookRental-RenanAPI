import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { successMsg, errorMsg } from 'src/utils/toasts'
import { i18n } from 'boot/i18n'
import { watch } from 'vue'

export const useRentsStore = defineStore('rents', {
    state: () => ({
        rents: [],
        fetchRentsTable: [],
        booksOptions: [],
        rentersOptions: [],
        loading: false,
        error: null
    }),
    actions: {
        fetchRents() {
            this.loading = true
            this.error = null

            return api.get('/rents')
                .then(response => {
                    const content = response.data.content

                    this.rents = content

                    this.fetchRentsTable = content.map(rent => ({
                        ...rent,
                        book: rent.book?.name,
                        renter: rent.renter?.name,
                        bookId: rent.book?.id,
                        renterId: rent.renter?.id,
                        rentDate: rent.rentDate,
                        deadLine: rent.deadLine,
                        status: i18n.global.t(`rents.status.${rent.status}`)
                    }))

                    console.log('Rents fetched:', this.rents)
                })
                .catch(e => {
                    console.error('Erro:', e.response?.data || e.message);
                    errorMsg(i18n.global.t('toasts.error.getError'));
                })
                .finally(() => {
                    this.loading = false
                })
        },

        async addRent(rent) {
            try {
                await api.post('/rents', rent)
            
                successMsg(i18n.global.t('toasts.success.postSuccess'))
                return true

            } catch (error) {
                console.error('Erro:', error.response?.data || error.message)
                errorMsg(i18n.global.t('toasts.error.postErrorRent'))
                console.log("API message:", error.response?.data?.detail);
                return false
            }
        },

        async updateRent(id, updated) {
            try {
                await api.put(`/rents/${id}`, updated)
              
                successMsg(i18n.global.t('toasts.success.putSuccess'))
                return true
            } catch (error) {
                console.log(error)
                errorMsg(i18n.global.t('toasts.error.putError'))
                console.log("API message:", error.response?.data?.detail);
                return false
            }
        },

        async finishRent(id) {
            try {
                await api.put(`/rents/deliver/${id}`)

                successMsg(i18n.global.t('toasts.success.finishRent'))
                return true

            } catch (error) {
                console.error('Erro ao finalizar aluguel:', error.response?.data || error.message)
                errorMsg(i18n.global.t('toasts.error.putError'))
                console.log("API message:", error.response?.data?.detail);
                return false
            }
        },

        async fetchBooksAndRenters() {
            try {
                const booksRes = await api.get('/books')
                const rentersRes = await api.get('/renters')

                this.booksOptions = booksRes.data.content.map(b => ({
                    label: b.name,
                    value: b.id,
                    ...b
                }))

                this.rentersOptions = rentersRes.data.content.map(r => ({
                    label: r.name,
                    value: r.id,
                    ...r
                }))

                console.log('Books:', this.booksOptions)
                console.log('Renters:', this.rentersOptions)
            } catch (err) {
                console.error('Error to fetch books and renters:', err)
                errorMsg(i18n.global.t('toasts.error.getError'))
                console.log("API message:", err.response?.data?.detail);
            }
        }
    }
})

const rentsStore = useRentsStore()
watch(
    () => i18n.global.locale.value,
    () => {
        rentsStore.fetchRents()
            .then(() => console.log('Rents refetched after locale change'))
            .catch(err => console.error(err))
    }
)