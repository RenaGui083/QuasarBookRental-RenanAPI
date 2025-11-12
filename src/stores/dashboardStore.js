import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { errorMsg } from 'src/utils/toasts'
import { i18n } from 'boot/i18n'

export const useDashboardStore = defineStore('data', {
    state: () => ({
        renters: [],
        users: [],
        bookMoreRented: [],
        labelsTop3: [],
        valuesTop3: [],
        late: [],
        delay: [],
        inTime: [],
        rented: [],
        publishers: [],
        rentersNumber: [],
        books: [],
        loading: false,
        error: null,
        numberOfAdmins: 0,
        numberOfUsers: 0,
    }),
    actions: {
        async fetchRenters() {
            this.loading = true
            this.error = null

            try {
                let allRenters = []
                let page = 0
                const size = 50 // ou o que a API permitir
                let totalPages = 1

                do {
                    const response = await api.get(`/dashboard/rentsPerRenter?page=${page}&size=${size}`)
                    const content = response.data.content

                    allRenters = allRenters.concat(
                        content.map(item => ({
                            name: item.name,
                            rentsQuantity: item.rentsQuantity,
                            rentsActive: item.rentsActive
                        }))
                    )

                    totalPages = response.data.totalPages
                    page++
                } while (page < totalPages)

                this.renters = allRenters

            } catch (e) {
                console.error('Error to fetch renters in dashboard:', e.response?.data || e.message)
                errorMsg(i18n.global.t('toasts.error.getError'))
            } finally {
                this.loading = false
            }
        },

        fetchRentersAndAdmins() {
            return api.get('/user')
                .then(response => {
                    const allUsers = response.data
                    this.users = allUsers.role

                    // Contagem de admins e usuários
                    this.numberOfAdmins = allUsers.filter(u => u.role === 'ADMIN').length
                    this.numberOfUsers = allUsers.filter(u => u.role !== 'ADMIN').length

                    console.log('Admins:', this.numberOfAdmins, 'Users:', this.numberOfUsers)
                    console.log(response)
                })
                .catch(e => {
                    console.error('Error to fetch admins in dashboard:', e.response?.data || e.message)
                    errorMsg(i18n.global.t('toasts.error.getError'))
                })

        },

        fetchTop3(inputTop3) {
            return api.get('/dashboard/bookMoreRented', {
                params: { numberOfMonths: inputTop3 }
            })
                .then(response => {
                    this.bookMoreRented = response.data
                    this.labelsTop3 = this.bookMoreRented.map(item => item.name);
                    this.valuesTop3 = this.bookMoreRented.map(item => item.totalRents);
                })
                .catch(e => {
                    console.error('Error to fetch top 3 in dashboard:', e.response?.data || e.message)
                    errorMsg(i18n.global.t('toasts.error.getError'))
                })
        },

        async fetchRents(inputRents) {
            try {
                const [resLate, resDelay, resInTime, resRented] = await Promise.all([
                    api.get('/dashboard/rentsLateQuantity', { params: { numberOfMonths: inputRents } }),
                    api.get('/dashboard/deliveredWithDelayQuantity', { params: { numberOfMonths: inputRents } }),
                    api.get('/dashboard/deliveredInTimeQuantity', { params: { numberOfMonths: inputRents } }),
                    api.get('/dashboard/rentsQuantity', { params: { numberOfMonths: inputRents } })
                ]);

                const safe = (res) =>
                    typeof res.data === 'object' && res.data !== null
                        ? Object.values(res.data)[0]
                        : res.data;

                this.late = safe(resLate);
                this.delay = safe(resDelay);
                this.inTime = safe(resInTime);
                this.rented = safe(resRented);

                console.log('late:', this.late, 'delay:', this.delay, 'inTime:', this.inTime, 'rented:', this.rented);

            } catch (e) {
                console.error('Error to fetch rents in dashboard:', e.response?.data || e.message)
                errorMsg(i18n.global.t('toasts.error.getError'))
            }
        },

        async fetchPublishersBooksRenters() {
            try {
                const [publisher, renter, book] = await Promise.all([
                    api.get('/publisher'),
                    api.get('/renter'),
                    api.get('/book'),
                ]);

                this.publishers = publisher.data.length;
                this.rentersNumber = renter.data.length;
                this.books = book.data.length;

                console.log(this.publishers, this.rentersNumber, this.books);


                console.log(this.publishers, this.renters, this.books);

            } catch (e) {
                console.error('Error to fetch rents in dashboard:', e.response?.data || e.message)
                errorMsg(i18n.global.t('toasts.error.getError'))
            }
        }
    }
})