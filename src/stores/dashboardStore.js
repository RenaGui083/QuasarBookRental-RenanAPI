import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { errorMsg } from 'src/utils/toasts'
import { i18n } from 'boot/i18n'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    rented: 0,
    late: 0,
    returnedOnTime: 0,
    returnedLate: 0,
    topBooks: [],
    topRenters: [],
    users: [],
    numberOfAdmins: 0,
    numberOfUsers: 0,
    books: [],
    renters: [],
    publishers: [],
    totalBooks: 0,
    totalRenters: 0,
    totalPublishers: 0,

    loading: false,
    error: null
  }),

  actions: {
    async fetchDashboard() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/dashboard')
        const data = response.data

        this.rented = data.rented
        this.late = data.late
        this.returnedOnTime = data.returnedOnTime
        this.returnedLate = data.returnedLate
        this.topBooks = data.topBooks
        this.topRenters = data.topRenters

        console.log("Dashboard data:", data)

      } catch (e) {
        console.error('Error to fetch data in dashboard:', e.response?.data || e.message)
        this.error = e
        errorMsg(i18n.global.t('toasts.error.getError'))

      } finally {
        this.loading = false
      }
    },

    fetchRentersAndAdmins() {
      return api.get('/users')
        .then(response => {
          const allUsers = response.data.content

          this.users = allUsers

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

    async fetchPublishersRentersBooks() {
      this.loading = true
      this.error = null

      try {
        const books = await api.get('/books')
        const renters = await api.get('/renters')
        const publishers = await api.get('/publishers')

        this.books = books.data.content
        this.renters = renters.data.content
        this.publishers = publishers.data.content

        this.totalBooks = this.books.length
        this.totalRenters = this.renters.length
        this.totalPublishers = this.publishers.length

        console.log("Totals:", {
          books: this.totalBooks,
          renters: this.totalRenters,
          publishers: this.totalPublishers
        })

      } catch (e) {
        console.error('Error to fetch data in dashboard:', e.response?.data || e.message)
        this.error = e
        errorMsg(i18n.global.t('toasts.error.getError'))

      } finally {
        this.loading = false
      }
    },
  }
})
