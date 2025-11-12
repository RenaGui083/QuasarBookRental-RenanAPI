<template>
    <q-page class="mainContainer">
        <div class="headerTitle">
            <q-icon name="assignment" />
            <!-- <h5>Biblioteca</h5> -->
            <header class="topTittle">{{ t('rents.headerTitle') }}</header>
        </div>
        <div class="searchContainer">
            <div class="search" id="search">
                <label for="searchInput" class="searchInput">
                    <q-icon name="search" class="searchIcon" />
                </label>
                <input type="text" id="searchInput" v-model="filter" :placeholder="t('search.searchBar')">
            </div>
            <q-btn push :label="t('search.createButton')" class="addButton" @click="openModalCreate = true" />
        </div>

        <div class="tableContainer">
            <div class="text-h6 text-center full-width">{{ t('rents.table.tableTitle') }}</div>
            <q-table :rows="fetchRentsTable" :columns="columns" row-key="id" v-model:pagination="pagination"
                :rows-per-page-options="$q.screen.lt.md ? [] : [5, 6]" :filter="filter" flat bordered
                :no-data-label="t('tables.noData')" :rows-per-page-label="t('tables.rowsPerPage')"
                :pagination-label="paginationLabel" class="my-table shadow-2 rounded-borders" :loading="loading"
                :loading-label="t('tables.loading')" :hide-bottom="$q.screen.lt.md">
                <!-- Modo tabela normal (desktop) -->
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="text-center" :data-label="props.col.label">
                        <q-btn flat round dense icon="edit" color="#121f2f" @click="prepareEditRent(props.row)"
                            v-if="['Rented', 'Alugado', 'Alquilado'].includes(props.row.status)" />
                        <q-btn flat round dense icon="check" color="#121f2f" @click="openModalFinishRent(props.row)"
                            v-if="['Rented', 'Alugado', 'Alquilado'].includes(props.row.status)" />
                    </q-td>
                </template>
                <template v-slot:body-cell="props">
                    <q-td :props="props" :data-label="props.col.label">
                        {{ props.value }}
                    </q-td>
                </template>
                <template v-slot:item="props">
                    <div class="q-pa-sm q-mb-sm rounded-borders shadow-1 bg-grey-1">
                        <div v-for="col in props.cols" :key="col.name" class="row q-pb-xs">
                            <div class="col-4 text-weight-bold">{{ col.label }}</div>
                            <div class="col-8">{{ col.value }}</div>
                        </div>
                        <div class="row justify-end q-mt-sm">
                            <q-btn flat round dense icon="edit" color="#121f2f" @click="prepareEditRent(props.row)"
                                v-if="['Rented', 'Alugado', 'Alquilado'].includes(props.row.status)" />
                            <q-btn flat round dense icon="check" color="#121f2f" @click="openModalFinishRent(props.row)"
                                v-if="['Rented', 'Alugado', 'Alquilado'].includes(props.row.status)" />
                        </div>
                    </div>
                </template>
            </q-table>


        </div>



        <!-- Modals -->
        <q-dialog v-model="openModalCreate" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('rents.createModal.title') }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup class="closeIcon" />
                </q-card-section>

                <q-separator />

                <q-card-section class="scroll">
                    <slot>
                        <q-form @submit="onSubmit" @reset="onReset" ref="formRef">
                            <q-select filled v-model="newRent.bookId" :options="booksOptions" option-value="id"
                                option-label="name" emit-value map-options :label="t('rents.createModal.book')"
                                class="inputModal" color="primary"
                                :rules="[val => !!val || t('rents.errorInput.book')]" />

                            <q-select filled v-model="newRent.renterId" :options="rentersOptions" option-value="id"
                                option-label="name" emit-value map-options :label="t('rents.createModal.renter')"
                                class="inputModal" color="primary"
                                :rules="[val => !!val || t('rents.errorInput.renter')]" />


                            <q-input filled v-model="newRent.deadLine" :label="t('rents.createModal.deadLine')"
                                :mask="locale === 'en-US' ? '##/##/####' : '##/##/####'"
                                :placeholder="locale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'" class="inputModal"
                                color="primary" :rules="[
                                    val => !!val || t('rents.errorInput.deadLine'),
                                    val => {
                                        if (!val) return true

                                        let inputDate

                                        if (locale === 'en-US') {
                                            // Formato: MM/DD/YYYY
                                            const [month, day, year] = val.split('/')
                                            inputDate = new Date(year, month - 1, day)
                                        } else {
                                            // Formato: DD/MM/YYYY
                                            const [day, month, year] = val.split('/')
                                            inputDate = new Date(year, month - 1, day)
                                        }

                                        const today = new Date()
                                        today.setHours(0, 0, 0, 0)
                                        inputDate.setHours(0, 0, 0, 0)

                                        // Verifica se é data no passado
                                        if (inputDate < today) {
                                            return t('rents.errorInput.invalidDeadLine')
                                        }

                                        // Verifica se passou de 30 dias
                                        const diffMs = inputDate - today
                                        const diffDays = diffMs / (1000 * 60 * 60 * 24)
                                        if (diffDays > 30) {
                                            return t('rents.errorInput.tooFarDeadLine')
                                        }

                                        return true
                                    }
                                ]" />
                        </q-form>
                    </slot>
                </q-card-section>


                <q-separator />
                <q-card-actions align="left">
                    <q-btn unelevated :label="t('rents.createModal.registerButton')" color="primary" @click="addRent"
                        class="buttonRegister" />
                    <q-btn flat :label="t('rents.createModal.cancelButton')" color="white" @click="cancel" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>



        <q-dialog v-model="openModalEdit" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('rents.editModal.title')  + " " + (fixedName) + "?" }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup class="closeIcon" />
                </q-card-section>

                <q-separator />


                <q-card-section class="scroll">
                    <slot>
                        <q-form @submit="onSubmit" @reset="onReset" ref="formRefEdit">
                            <q-select filled v-model="editRent.bookId" :options="booksOptions" option-value="id"
                                option-label="name" emit-value map-options :label="t('rents.createModal.book')"
                                class="inputModal" color="primary"
                                :rules="[val => !!val || t('rents.errorInput.book')]" />

                            <q-select filled v-model="editRent.renterId" :options="rentersOptions" option-value="id"
                                option-label="name" emit-value map-options :label="t('rents.createModal.renter')"
                                class="inputModal" color="primary"
                                :rules="[val => !!val || t('rents.errorInput.renter')]" />


                            <q-input filled v-model="editRent.deadLine" :label="t('rents.createModal.deadLine')"
                                :mask="locale === 'en-US' ? '##/##/####' : '##/##/####'"
                                :placeholder="locale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'" class="inputModal"
                                color="primary" :rules="[
                                    val => !!val || t('rents.errorInput.deadLine'),
                                    val => {
                                        if (!val) return true

                                        let inputDate

                                        if (locale === 'en-US') {
                                            // Formato: MM/DD/YYYY
                                            const [month, day, year] = val.split('/')
                                            inputDate = new Date(year, month - 1, day)
                                        } else {
                                            // Formato: DD/MM/YYYY
                                            const [day, month, year] = val.split('/')
                                            inputDate = new Date(year, month - 1, day)
                                        }

                                        const today = new Date()
                                        today.setHours(0, 0, 0, 0)
                                        inputDate.setHours(0, 0, 0, 0)

                                        // Verifica se é data no passado
                                        if (inputDate < today) {
                                            return t('rents.errorInput.invalidDeadLine')
                                        }

                                        // Verifica se passou de 30 dias
                                        const diffMs = inputDate - today
                                        const diffDays = diffMs / (1000 * 60 * 60 * 24)
                                        if (diffDays > 30) {
                                            return t('rents.errorInput.tooFarDeadLine')
                                        }

                                        return true
                                    }
                                ]" />
                        </q-form>
                    </slot>
                </q-card-section>


                <q-separator />
                <q-card-actions align="left">
                    <q-btn unelevated :label="t('rents.editModal.registerButton')" color="primary"
                        @click="tryOpenConfirm" class="buttonRegister" />
                    <q-btn flat :label="t('rents.editModal.cancelButton')" color="white" @click="cancel" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>



        <q-dialog v-model="openModalBookReturn" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('rents.editModal.returnModal.text') + " " + "(" +(selectRent.book) + ")"  }}</div>
                    <q-space />
                    <!-- <q-btn icon="close" flat round dense v-close-popup class="closeIcon" /> -->
                </q-card-section>

                <q-card-section class="scroll">
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn unelevated :label="t('rents.editModal.returnModal.yesButton')" color="primary"
                        @click="finishRent" class="buttonRegister" />
                    <q-btn flat :label="t('rents.editModal.returnModal.noButton')" color="white" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>


        <q-dialog v-model="openModalConfirm" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('confirmModal.text') }}</div>
                    <q-space />
                    <!-- <q-btn icon="close" flat round dense v-close-popup class="closeIcon" /> -->
                </q-card-section>

                <q-card-section class="scroll">
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn unelevated :label="t('confirmModal.yesButton')" color="primary" @click="updateRent"
                        class="buttonRegister" />
                    <q-btn flat :label="t('confirmModal.noButton')" color="white" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>

    </q-page>
</template>
<script setup>
import { useCrud } from 'src/utils/rents.js'


const { loading, newRent, addRent, formRef, fetchRentsTable, booksOptions, rentersOptions, editRent, formRefEdit, prepareEditRent, cancel,

    $q, openModalCreate, openModalEdit, openModalBookReturn, openModalConfirm, t, locale, fixedName, tryOpenConfirm, selectRent,

    filter, pagination, columns, paginationLabel, updateRent, finishRent, openModalFinishRent } = useCrud()
</script>