<template>
    <q-page class="mainContainer">
        <div class="headerTitle">
            <q-icon name="insights" />
            <header class="topTittle">{{ t('dashboard.headerTitle') }}</header>
        </div>
        <div class="dashboardContainer">

            <div class="sectionTop">

                <q-card class="cardSection">
                    <q-card-section>
                        <div class="headerContainerChart" id="conteinerDashboard">
                            <header>{{ t('dashboard.rentsChart') }}</header><q-input filled :label="t('monthLabel')" v-model="numberOfMonths" type="number" class="numberOfMonths" placeholder="months" min="1" />
                        </div>
                        <ChartBar1 style="height: 200px;" />
                    </q-card-section>
                </q-card>

                <q-card class="cardSection" >
                    <q-card-section>
                        <div class="headerContainerChart"  id="conteinerDashboard2">
                            <header>{{ t('dashboard.top3Chart') }}</header>  <q-input filled :label="t('monthLabel')" v-model="numberOfMonthsTop3" type="number" class="numberOfMonths" placeholder="months" min="1" />
                        </div>
                        <ChartBar2 style="min-height: 200px;" />
                    </q-card-section>
                </q-card>

                <q-card class="cardSection" id="chartPieSection">
                    <q-card-section>
                        <div class="headerContainerChart">
                            <header>{{ t('dashboard.publishersBooksRenters') }}</header>
                        </div>
                        <ChartPie1 id="chartPieBottom" />
                    </q-card-section>
                </q-card>
            </div>

            <div class="sectionBottom">

                <div class="tableContainer" id="gridDashboard">
                    <div class="text-h6 text-center full-width">{{ t('dashboard.table.tableTitle') }}</div>
                    <q-table :rows="dashboardStore.topRenters" :columns="columns" row-key="id" v-model:pagination="pagination"
                        :filter="filter" flat bordered :no-data-label="t('tables.noData')"
                        :rows-per-page-label="t('tables.rowsPerPage')" :pagination-label="paginationLabel"
                        class="my-table shadow-2 rounded-borders" :hide-bottom="$q.screen.lt.md" :loading="loading"
                        :loading-label="t('tables.loading')" :rows-per-page-options="[renters.length]">

                        <template v-slot:body-cell="props">
                            <q-td :props="props" :data-label="props.col.label">
                                {{ props.value }}
                            </q-td>
                        </template>
                    </q-table>
                </div>
                <q-card class="cardSection" id="dataChart">
                    <q-card-section>
                        <div class="headerContainerChart" id="usersChart">
                            <header class="headerUsers">{{ t('dashboard.numberOfUsers') }}</header>
                            <p>{{ numberOfUsers }}</p>
                        </div>
                        <div class="headerContainerChart" id="adminsChart">
                            <header class="headerUsers">{{ t('dashboard.numberOfAdmins') }}</header>
                            <p>{{ numberOfAdmins }}</p>
                        </div>
                    </q-card-section>
                </q-card>

            </div>


        </div>

    </q-page>
</template>

<script setup>
import { onMounted, ref,computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDashboardStore } from 'src/stores/dashboardStore'
import { storeToRefs } from 'pinia'
import ChartBar1 from "src/components/DashboardChartBar1.vue";
import ChartBar2 from "src/components/DashboardChartBar2.vue";
import ChartPie1 from "src/components/DashboardChartPie1.vue";
import { Dark } from 'quasar'

Dark.set(false)
const { t } = useI18n()

// store
const dashboardStore = useDashboardStore()
const {
  topRenters,
  numberOfAdmins,
  numberOfUsers,
  loading
} = storeToRefs(dashboardStore)

// inputs dos gráficos (já existiam)
const numberOfMonths = ref(6)
const numberOfMonthsTop3 = ref(6)

// tabela
const renters = topRenters          // ← você usa "renters" na q-table, então só apontamos pra topRenters
const filter = ref('')
const pagination = ref({
  page: 1,
  rowsPerPage: 5
})

const columns = computed(() => [
  { name: "renterName", label: t('dashboard.table.renters'), field: "renterName", align: "left", sortable: true },
  { name: "totalRents", label: t('dashboard.table.rentsQuantity'), field: "totalRents", align: "left", sortable: true },
  { name: "activeRents", label: t('dashboard.table.rentsActive'), field: "activeRents", align: "left", sortable: true }
])

// label usada no pagination
function paginationLabel(first, last, total) {
  return `${first}-${last} / ${total}`
}

// carrega tudo ao abrir o dashboard
onMounted(async () => {
  await dashboardStore.fetchDashboard()
  await dashboardStore.fetchRentersAndAdmins()
})
</script>