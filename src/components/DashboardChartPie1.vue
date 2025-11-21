<template>
  <div class="q-pa-md">
    <PieChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// CHART.JS
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  ArcElement
} from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, ArcElement)

// STORE
import { useDashboardStore } from 'src/stores/dashboardStore'
import { storeToRefs } from 'pinia'

const dashboardStore = useDashboardStore()

const {
  topBooks,
  numberOfAdmins,
  numberOfUsers
} = storeToRefs(dashboardStore)

// // BUSCANDO DADOS NECESSÁRIOS
// onMounted(async () => {
//   await dashboardStore.fetchDashboard()
//   await dashboardStore.fetchRentersAndAdmins()
// })

// CHART DATA
const chartData = computed(() => ({
  labels: [ t('dashboard.chart.publishers'),t('dashboard.chart.books'),t('dashboard.chart.renters') ],
  datasets: [
    {
      label: t('dashboard.chart.registrations'),
      data: [
        topBooks.value.length ?? 0,
        numberOfAdmins.value ?? 0,
        numberOfUsers.value ?? 0
      ],
      backgroundColor: ['#404668', '#121F2F', '#F7B176'],
    }
  ]
}))

// OPTIONS
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
        legend: { position: "bottom" },
        title: { display: false, text: "Aluguéis (mensal)" },
    },
}

const PieChart = Pie
</script>


