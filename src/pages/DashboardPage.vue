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
                    <q-table :rows="renters" :columns="columns" row-key="id" v-model:pagination="pagination"
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
import { useCrud } from 'src/utils/dashboard.js'

import { Dark } from 'quasar'

Dark.set(false)

const {
    ChartBar1, ChartBar2, ChartPie1, renters, loading,
    $q, t, numberOfAdmins, numberOfUsers, numberOfMonths, numberOfMonthsTop3,
    pagination, columns, paginationLabel
} = useCrud()
</script>