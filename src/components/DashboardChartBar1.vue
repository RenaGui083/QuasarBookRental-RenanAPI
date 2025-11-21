<template>
  <div class="chart-wrapper">
    <BarChart v-if="chartData" :data="chartData" :options="chartOptions" />
    <div v-else class="text-center text-grey">Carregando...</div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale
} from "chart.js";
import { Bar } from "vue-chartjs";

import { useDashboardStore } from 'src/stores/dashboardStore';
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const dashboardStore = useDashboardStore()
const { rented, late, returnedOnTime, returnedLate } = storeToRefs(dashboardStore)

onMounted(async () => {
  await dashboardStore.fetchDashboard()
})

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = computed(() => ({
    
  labels: [
    t('dashboard.chart.rented'),
    t('dashboard.chart.late'),
    t('dashboard.chart.onTime'),
    t('dashboard.chart.returnedLate')
  ],
  datasets: [
    {
      label: t('dashboard.headerTitle'),
      data: [
        rented.value,
        late.value,
        returnedOnTime.value,
        returnedLate.value
      ],
      backgroundColor: ['#404668', '#121F2F', '#F7B176', '#4B6B92'],
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 30
    }
  },
  plugins: {
    legend: { position: "none" },
    title: { display: false },
  },
};

const BarChart = Bar;
</script>
