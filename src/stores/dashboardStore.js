import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { errorMsg } from 'src/utils/toasts'
import { i18n } from 'boot/i18n'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    // ----- Dados vindos diretamente do backend -----
    rented: 0,
    late: 0,
    returnedOnTime: 0,
    returnedLate: 0,
    topBooks: [],
    topRenters: [],
    users: [],
    numberOfAdmins: 0,
    numberOfUsers: 0,

    // ----- Controle interno -----
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

        // Preenche os dados exatamente como vem do backend
        this.rented = data.rented
        this.late = data.late
        this.returnedOnTime = data.returnedOnTime
        this.returnedLate = data.returnedLate
        this.topBooks = data.topBooks
        this.topRenters = data.topRenters

        console.log("Dashboard carregado:", data)

      } catch (e) {
        console.error('Erro ao carregar dashboard:', e.response?.data || e.message)
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

                    // salva a lista inteira
                    this.users = allUsers

                    // conta admins e não-admins
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
  }
})
