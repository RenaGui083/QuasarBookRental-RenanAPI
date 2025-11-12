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

const { labelsTop3, valuesTop3 } = storeToRefs(dashboardStore)

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = computed(() => ({
  labels: labelsTop3.value,
  datasets: [
    {
      label: "Distribuição",
      data: valuesTop3.value,
      backgroundColor: ["#88B6EE", "#4B6B92", "#404668"],
    },
  ],
}));

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

const BarChart = Bar;

</script>