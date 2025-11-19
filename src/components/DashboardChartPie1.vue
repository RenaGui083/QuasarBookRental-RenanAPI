<template>
    <div class="q-pa-md">
        <PieChart :data="chartData" :options="chartOptions" />
    </div>
</template>


<script setup>
const chartData = computed(() => ({
  labels: [
    t('dashboard.chart.publishers'),
    t('dashboard.chart.books'),
    t('dashboard.chart.renters')
  ],
  datasets: [
    {
      label: "Cadastros",
      data: [
        publishers.value ?? 0,
        books.value ?? 0,
        rentersNumber.value ?? 0
      ],
      backgroundColor: ['#404668', '#121F2F', '#F7B176'],
    }
  ]
}))

</script>