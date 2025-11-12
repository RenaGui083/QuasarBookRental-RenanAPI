<template>
    <div class="q-pa-md">
        <PieChart :data="chartData" :options="chartOptions" />
    </div>
</template>


<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import {
    Chart as ChartJS,
    Title, Tooltip, Legend,
    ArcElement
} from "chart.js";
import { Pie } from "vue-chartjs";

import { useDashboardStore } from 'src/stores/dashboardStore';
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

 const dashboardStore = useDashboardStore()

const { publishers,rentersNumber,books } = storeToRefs(dashboardStore)

// registrar os módulos do Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData = computed(() => ({
    labels: [t('dashboard.chart.publishers'),t('dashboard.chart.books'),t('dashboard.chart.renters')],
    datasets: [
        {
            label: "Cadastros",
            data: [publishers.value,books.value,rentersNumber.value],
            backgroundColor: ['#404668', '#121F2F', '#F7B176'],
        },
    ],
}));

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: "bottom" },
        title: { display: false, text: "Aluguéis (mensal)" },
    },


};

const PieChart = Pie;
</script>