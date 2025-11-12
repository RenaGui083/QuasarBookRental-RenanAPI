<template>
    <div class="q-pa-md">
        <BarChart :data="chartData" :options="chartOptions" />
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
import { computed } from 'vue'

 const dashboardStore = useDashboardStore()

const { late, delay, inTime, rented } = storeToRefs(dashboardStore)

// registrar os módulos do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = computed(() => ({
    labels: [t('dashboard.chart.rented'),t('dashboard.chart.late'),t('dashboard.chart.onTime'),t('dashboard.chart.returnedLate')],
    datasets: [
        {
            label: "Vendas",
            data: [rented.value, inTime.value, delay.value, late.value],
            backgroundColor: ['#404668', '#121F2F', '#F7B176', '#4B6B92'],
        },
    ],
}));

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: "none" },
        title: { display: false, text: "Aluguéis (mensal)" },
    },
};

const BarChart = Bar;
</script>