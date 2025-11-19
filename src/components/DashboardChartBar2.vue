<template>
  <div class="q-pa-md">
    <BarChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale
} from "chart.js";
import { Bar } from "vue-chartjs";
import { useDashboardStore } from 'src/stores/dashboardStore';
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const dashboardStore = useDashboardStore()

// agora usando os dados corretos
const { topBooks } = storeToRefs(dashboardStore)

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// monta os labels e valores direto do topBooks
const chartData = computed(() => {
  const labels = topBooks.value?.map(b => b.title) || []
  const values = topBooks.value?.map(b => b.totalRented || b.totalRents || 0) || []

  return {
    labels,
    datasets: [
      {
        label: "Top 3 Livros",
        data: values,
        backgroundColor: ["#88B6EE", "#4B6B92", "#404668"],
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "none" },
    title: { display: false },
  },
  scales: {
    x: {
      ticks: {
        callback(value) {
          const label = this.getLabelForValue(value)
          return label.length > 12 ? label.substr(0, 12) + "…" : label
        },
      },
    },
    y: {
      ticks: {
        padding: 4,
      },
    },
  },
}

const BarChart = Bar
</script>
