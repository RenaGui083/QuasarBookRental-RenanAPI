<template>
    <q-page class="mainContainer">
        <div class="headerTitle">
            <q-icon name="edit" />
            <!-- <h5>Biblioteca</h5> -->
            <header class="topTittle">{{ t('publishers.headerTitle') }}</header>
        </div>
        <div class="searchContainer">
            <div class="search" id="search">
                <label for="" class="searchInput">
                    <q-icon name="search" class="searchIcon" />
                </label>
                <input type="text" id="searchInput" v-model="filter" :placeholder="t('search.searchBar')">
            </div>
            <q-btn push :label="t('search.createButton')" class="addButton" @click="openModalCreate = true" />
        </div>


        <div class="tableContainer">
            <div class="text-h6 text-center full-width">{{ t('publishers.table.tableTitle') }}</div>
            <q-table :rows="publishers" :columns="columns" row-key="id" v-model:pagination="pagination"
                :rows-per-page-options="$q.screen.lt.md ? [] : [5, 6]" :filter="filter" flat bordered
                :no-data-label="t('tables.noData')" :rows-per-page-label="t('tables.rowsPerPage')"
                :pagination-label="paginationLabel" :loading="loading" :loading-label="t('tables.loading')"
                class="my-table shadow-2 rounded-borders" id="publishersTable" :hide-bottom="$q.screen.lt.md">
                <!-- Modo tabela normal (desktop) -->

                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="text-center" :data-label="props.col.label">
                        <q-btn flat round dense icon="edit" color="#121f2f" @click="prepareEditPublisher(props.row)"/>
                        <q-btn flat round dense icon="delete" color="#121f2f" @click="deletePublisher(props.row)" />
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
                            <q-btn flat round dense icon="edit" color="#121f2f" @click="prepareEditPublisher(props.row)"/>
                            <q-btn flat round dense icon="delete" color="#121f2f" @click="deletePublisher(props.row)" />
                        </div>
                    </div>
                </template>
            </q-table>


        </div>


        <!-- Modals -->
        <q-dialog v-model="openModalCreate" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('publishers.createModal.title') }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup class="closeIcon" />
                </q-card-section>

                <q-separator />


                <q-card-section class="scroll">
                    <slot>
                        <q-form @submit="onSubmit" @reset="onReset" ref="formRef">
                            <q-input filled v-model="newPublisher.name" type="text" color="primary"
                                :label="t('publishers.createModal.name')" class="inputModal" :rules="[
                                    val => val && val.length > 0 ||  t('publishers.errorInput.name'),
                                    val => isDuplicate('name', val)
                                ]" />
                            <q-input filled v-model="newPublisher.email" type="email"
                                :label="t('publishers.createModal.email')" class="inputModal" :rules="[
                                    val => val && val.length > 0 ||  t('publishers.errorInput.email'),
                                    val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || t('publishers.errorInput.invalidEmail'),
                                    val => isDuplicate('email', val)
                                ]" />
                            <q-input filled v-model="newPublisher.telephone" type="text"
                                :label="t('publishers.createModal.telephone')" class="inputModal" mask="(##) #####-####"
                                unmasked-value :rules="[
                                    val => !!val ||  t('publishers.errorInput.telephone'),
                                    val => /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/.test(val) || t('publishers.errorInput.invalidTelephone'),
                                    val => isDuplicate('telephone', val)
                                ]" />
                            <q-input filled v-model="newPublisher.site" type="text"
                                :label="t('publishers.createModal.site')" class="inputModal" :rules="[
                                    val => !val || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w- .\/?%&=]*)?$/.test(val) || t('publishers.errorInput.invalidSite'),
                                    val => isDuplicate('site', val)
                                ]" />

                        </q-form>
                    </slot>
                </q-card-section>


                <q-separator />
                <q-card-actions align="left">
                    <q-btn unelevated :label="t('publishers.createModal.registerButton')" color="primary"
                        @click="addPublisher" class="buttonRegister" />
                    <q-btn flat :label="t('publishers.createModal.cancelButton')" color="white" @click="cancel" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>



        <q-dialog v-model="openModalEdit" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('publishers.editModal.title')  + " " + (fixedName) + "?"}}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup class="closeIcon" />
                </q-card-section>

                <q-separator />


                <q-card-section class="scroll">
                    <slot>
                        <q-form @submit="onSubmit" @reset="onReset" ref="formRefEdit">
                            <q-input filled v-model="editPublisher.name" type="text" color="primary"
                                :label="t('publishers.createModal.name')" class="inputModal" :rules="[
                                    val => val && val.length > 0 || t('publishers.errorInput.name'),
                                    val => isDuplicate('name', val)
                                ]" />
                            <q-input filled v-model="editPublisher.email" type="email"
                                :label="t('publishers.createModal.email')" class="inputModal" :rules="[
                                    val => val && val.length > 0 ||  t('publishers.errorInput.email'),
                                    val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || t('publishers.errorInput.invalidEmail'),
                                    val => isDuplicate('email', val)
                                ]" />
                            <q-input filled v-model="editPublisher.telephone" type="text"
                                :label="t('publishers.createModal.telephone')" class="inputModal" mask="(##) #####-####"
                                unmasked-value :rules="[
                                    val => !!val ||  t('publishers.errorInput.telephone'),
                                    val => /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/.test(val) || t('publishers.errorInput.invalidTelephone'),
                                    val => isDuplicate('telephone', val)
                                ]" />
                            <q-input filled v-model="editPublisher.site" type="text"
                                :label="t('publishers.createModal.site')" class="inputModal" :rules="[
                                    val => !val || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w- .\/?%&=]*)?$/.test(val) || t('publishers.errorInput.invalidSite'),
                                    val => isDuplicate('site', val)
                                ]" />
                        </q-form>
                    </slot>
                </q-card-section>


                <q-separator />
                <q-card-actions align="left">
                    <q-btn unelevated :label="t('publishers.editModal.registerButton')" color="primary"
                         @click="tryOpenConfirm" class="buttonRegister" />
                    <q-btn flat :label="t('publishers.editModal.cancelButton')" color="white" @click="cancel" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>



        <q-dialog v-model="openModalExclude" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('excludeModal.text') + " " + "(" +(selectPublisher.name) + ")" }}</div>
                    <q-space />
                    <!-- <q-btn icon="close" flat round dense v-close-popup class="closeIcon" /> -->
                </q-card-section>

                <q-card-section class="scroll">
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn unelevated :label="t('excludeModal.yesButton')" color="primary" @click="confirmDelete"
                        class="buttonRegister" />
                    <q-btn flat :label="t('excludeModal.noButton')" color="white" v-close-popup />
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
                    <q-btn unelevated :label="t('confirmModal.yesButton')" color="primary" @click="updatePublisher"
                        class="buttonRegister" />
                    <q-btn flat :label="t('confirmModal.noButton')" color="white" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>
    </q-page>
</template>
<script setup>
import { useCrud } from 'src/utils/publishers.js'
const {
    newPublisher, addPublisher, $q, openModalCreate, openModalEdit, openModalExclude, openModalConfirm, fixedName,
    filter, pagination, columns, t, paginationLabel, publishers, loading, formRef, deletePublisher, confirmDelete,
     editPublisher,prepareEditPublisher, formRefEdit, updatePublisher,tryOpenConfirm, isDuplicate, cancel, selectPublisher
} = useCrud()
</script>