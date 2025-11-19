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

// pegando os valores CERTOS do store novo
const { rented, late, returnedOnTime, returnedLate } = storeToRefs(dashboardStore)

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
    plugins: {
        legend: { position: "none" },
        title: { display: false },
    },
};

const BarChart = Bar;
</script>
