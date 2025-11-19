import { ref, watch, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import ChartBar1 from "src/components/DashboardChartBar1.vue";
import ChartBar2 from "src/components/DashboardChartBar2.vue";
import ChartPie1 from "src/components/DashboardChartPie1.vue";
import { useI18n } from 'vue-i18n'
import i18n from 'src/i18n';
import { useDashboardStore } from 'src/stores/dashboardStore';
import { storeToRefs } from 'pinia'

export function useCrud() {
    const dashboardStore = useDashboardStore()
    const { t } = useI18n()
    const $q = useQuasar()

    // paginação das tabelas
    const pagination = ref({
        page: 1,
        rowsPerPage: 2
    })

    const numberOfMonths = ref(1)
    const numberOfMonthsTop3 = ref(1)

    // pega refs direto do novo store
    const { 
      loading, 
      error, 
      users, 
      numberOfAdmins, 
      numberOfUsers,
      topBooks,
      topRenters,
      rented,
      late,
      returnedOnTime,
      returnedLate
    } = storeToRefs(dashboardStore)

    const updatePagination = () => {
        if ($q.screen.lt.md) {
            pagination.value.rowsPerPage = 0
        } else if ($q.screen.lt.lg) {
            pagination.value.rowsPerPage = 2 
        } else if ($q.screen.lt.xl) {
            pagination.value.rowsPerPage = 3 
        } else {
            pagination.value.rowsPerPage = 5 
        }
    }

    // como essas funções NÃO existem mais no store, removi os watchers antigos.
    // Caso você volte a ter filtros por mês, a gente recoloca.
    watch(numberOfMonths, () => {})
    watch(numberOfMonthsTop3, () => {})

    onMounted(async () => {
        try {
            await Promise.all([
                dashboardStore.fetchDashboard(),
                dashboardStore.fetchRentersAndAdmins(),
            ])
            console.log('Dashboard data fetched')
        } catch (error) {
            console.error('Failed to fetch data on mount', error)
        }

        updatePagination()
    })

    // tabela de USERS (caso use)
    const columns = computed(() => [
        { name: "name", label: t('dashboard.table.renters'), field: "name", align: "left", sortable: true },
        { name: "email", label: "Email", field: "email", align: "left", sortable: true },
        { name: "role", label: "Role", field: "role", align: "left", sortable: true },
    ])

    const paginationLabel = (start, end, total) => `${start} - ${end} ${t('tables.of')} ${total}`

    watch(() => $q.screen.name, updatePagination)

    return {
        // charts
        ChartBar1, ChartBar2, ChartPie1,

        // store refs
        rented, late, returnedOnTime, returnedLate,
        topBooks, topRenters,
        users, numberOfAdmins, numberOfUsers,
        loading, error,

        // utils
        fetchDashboard: dashboardStore.fetchDashboard,
        fetchRentersAndAdmins: dashboardStore.fetchRentersAndAdmins,

        $q, t, i18n,
        pagination, columns, paginationLabel,
        numberOfMonths, numberOfMonthsTop3,
    }
}
