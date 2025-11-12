<template>
    <q-page class="mainContainer">
        <div class="headerTitle">
            <q-icon name="person" />
            <!-- <h5>Biblioteca</h5> -->
            <header class="topTittle">{{ t('renters.headerTitle') }}</header>
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
            <div class="text-h6 text-center full-width">{{ t('renters.table.tableTitle') }}</div>
            <q-table :rows="renters" :columns="columns" row-key="id" v-model:pagination="pagination"
                :rows-per-page-options="$q.screen.lt.md ? [] : [5, 6]" :filter="filter" flat bordered
                :no-data-label="t('tables.noData')" :rows-per-page-label="t('tables.rowsPerPage')"
                :pagination-label="paginationLabel" class="my-table shadow-2 rounded-borders" :loading="loading"
                :loading-label="t('tables.loading')" :hide-bottom="$q.screen.lt.md">
                <!-- Modo tabela normal (desktop) -->
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="text-center" :data-label="props.col.label">
                        <q-btn flat round dense icon="edit" color="#121f2f" @click="prepareEditRenter(props.row)" />
                        <q-btn flat round dense icon="delete" color="#121f2f" @click="deleteRenter(props.row)" />
                        <q-btn flat round dense icon="visibility" color="#121f2f"
                            @click="viewRenterFunction(props.row)" />
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
                            <q-btn flat round dense icon="edit" color="#121f2f" @click="prepareEditRenter(props.row)" />
                            <q-btn flat round dense icon="delete" color="#121f2f" @click="deleteRenter(props.row)" />
                            <q-btn flat round dense icon="visibility" color="#121f2f"
                                @click="viewRenterFunction(props.row)" />
                        </div>
                    </div>
                </template>
            </q-table>


        </div>

        <!-- Modals -->
        <q-dialog v-model="openModalCreate" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('renters.createModal.title') }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup class="closeIcon" />
                </q-card-section>

                <q-separator />


                <q-card-section class="scroll">
                    <slot>
                        <q-form @submit="onSubmit" @reset="onReset" ref="formRef">
                            <q-input filled v-model="newRenter.name" type="text" color="primary"
                                :label="t('renters.createModal.name')" class="inputModal" :rules="[
                                    val => val && val.length > 0 || t('renters.errorInput.name'),
                                    val => isDuplicate('name', val)
                                ]" />

                            <q-input filled v-model="newRenter.email" type="email" color="primary"
                                :label="t('renters.createModal.email')" class="inputModal" :rules="[
                                    val => val && val.length > 0 || t('renters.errorInput.email'),
                                    val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || t('renters.errorInput.invalidEmail'),
                                    val => isDuplicate('email', val)
                                ]" />

                            <q-input filled v-model="newRenter.telephone" type="text" color="primary"
                                :label="t('renters.createModal.telephone')" class="inputModal" mask="(##) #####-####"
                                unmasked-value :rules="[
                                    val => !!val || t('renters.errorInput.telephone'),
                                    val => /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/.test(val) || t('renters.errorInput.invalidTelephone'),
                                    val => isDuplicate('telephone', val)
                                ]" />

                            <q-input filled v-model="newRenter.cpf" type="text" color="primary"
                                :label="t('renters.createModal.cpf')" class="inputModal" mask="###.###.###-##"
                                unmasked-value :rules="[
                                    val => !!val || t('renters.errorInput.cpf'),
                                    val => /^\d{11}$/.test(val.replace(/\D/g, '')) || t('renters.errorInput.invalidCpf'),
                                    val => isDuplicate('cpf', val)
                                ]" />

                            <q-input filled v-model="newRenter.address" type="text" color="primary"
                                :label="t('renters.createModal.address')" class="inputModal" :rules="[
                                    val => !!val || t('renters.errorInput.address')
                                ]" />
                        </q-form>
                    </slot>
                </q-card-section>


                <q-separator />
                <q-card-actions align="left">
                    <q-btn unelevated :label="t('renters.createModal.registerButton')" color="primary"
                        @click="addRenter" class="buttonRegister" />
                    <q-btn flat :label="t('renters.createModal.cancelButton')" color="white" @click="cancel"
                        v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>



        <q-dialog v-model="openModalEdit" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('renters.editModal.title') + " " + (fixedName) + "?" }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup class="closeIcon" />
                </q-card-section>

                <q-separator />


                <q-card-section class="scroll">
                    <q-form @submit="onSubmit" @reset="onReset" ref="formRefEdit">
                        <q-input filled v-model="editRenter.name" type="text" color="primary"
                            :label="t('renters.createModal.name')" class="inputModal" :rules="[
                                val => val && val.length > 0 || t('renters.errorInput.name'),
                                val => isDuplicate('name', val)
                            ]" />

                        <q-input filled v-model="editRenter.email" type="email" color="primary"
                            :label="t('renters.createModal.email')" class="inputModal" :rules="[
                                val => val && val.length > 0 || t('renters.errorInput.email'),
                                val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || t('renters.errorInput.invalidEmail'),
                                val => isDuplicate('email', val)
                            ]" />

                        <q-input filled v-model="editRenter.telephone" type="text" color="primary"
                            :label="t('renters.createModal.telephone')" class="inputModal" mask="(##) #####-####"
                            unmasked-value :rules="[
                                val => !!val || t('renters.errorInput.telephone'),
                                val => /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/.test(val) || t('renters.errorInput.invalidTelephone'),
                                val => isDuplicate('telephone', val)
                            ]" />

                        <q-input filled v-model="editRenter.cpf" type="text" color="primary"
                            :label="t('renters.createModal.cpf')" class="inputModal" mask="###.###.###-##"
                            unmasked-value :rules="[
                                val => !!val || t('renters.errorInput.cpf'),
                                val => /^\d{11}$/.test(val.replace(/\D/g, '')) || t('renters.errorInput.invalidCpf'),
                                val => isDuplicate('cpf', val)
                            ]" />

                        <q-input filled v-model="editRenter.address" type="text" color="primary"
                            :label="t('renters.createModal.address')" class="inputModal" :rules="[
                                val => !!val || t('renters.errorInput.address')
                            ]" />
                    </q-form>
                </q-card-section>


                <q-separator />
                <q-card-actions align="left">
                    <q-btn unelevated :label="t('renters.editModal.registerButton')" color="primary"
                        @click="tryOpenConfirm" class="buttonRegister" />
                    <q-btn flat :label="t('renters.editModal.cancelButton')" color="white" @click="cancel"
                        v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>



        <q-dialog v-model="openModalExclude" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('excludeModal.text') + " " + "(" +(selectRenter.name) + ")"}}</div>
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



        <q-dialog v-model="openModalView" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('renters.viewModal.title') + " " + (viewRenter?.name ??'') }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup class="closeIcon" />
                </q-card-section>

                <q-separator />

                <q-card-section class="scroll">

                    <q-field class="viewInput" filled :label="t('renters.viewModal.id')" label-color="primary" stack-label>
                        <template v-slot:prepend>
                            <q-icon name="key" color="primary" />
                        </template>
                        <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0" style="color: white;">{{ (viewRenter?.id ??'') }}</div>
                        </template>
                    </q-field>

                    <q-field class="viewInput" filled :label="t('renters.viewModal.name')" label-color="primary" stack-label>
                        <template v-slot:prepend>
                            <q-icon name="person" color="primary" />
                        </template>
                        <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0" style="color: white;">{{ (viewRenter?.name ??'') }}</div>
                        </template>
                    </q-field>

                    <q-field class="viewInput" filled :label="t('renters.viewModal.email')" label-color="primary" stack-label>
                        <template v-slot:prepend>
                            <q-icon name="email" color="primary" />
                        </template>
                        <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0" style="color: white;">{{ (viewRenter?.email ??'') }}</div>
                        </template>
                    </q-field>

                    <q-field class="viewInput" filled :label="t('renters.viewModal.telephone')" label-color="primary" stack-label>
                        <template v-slot:prepend>
                            <q-icon name="phone" color="primary" />
                        </template>
                        <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0" style="color: white;">{{ (viewRenter?.telephone ??'') }}</div>
                        </template>
                    </q-field>

                    <q-field class="viewInput" filled :label="t('renters.viewModal.cpf')" label-color="primary" stack-label>
                        <template v-slot:prepend>
                            <q-icon name="article" color="primary" />
                        </template>
                        <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0" style="color: white;">{{ (viewRenter?.cpf ??'') }}</div>
                        </template>
                    </q-field>

                    <q-field class="viewInput" filled :label="t('renters.viewModal.address')" label-color="primary" stack-label>
                        <template v-slot:prepend>
                            <q-icon name="map" color="primary" />
                        </template>
                        <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0" style="color: white;">{{ (viewRenter?.address ??'') }}</div>
                        </template>
                    </q-field>

                </q-card-section>

                <q-separator />

                <q-card-section class="left">
                    <q-btn flat :label="t('renters.viewModal.cancelButton')" color="white" v-close-popup />
                </q-card-section>

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
                    <q-btn unelevated :label="t('confirmModal.yesButton')" color="primary" @click="upadteRenter"
                        class="buttonRegister" />
                    <q-btn flat :label="t('confirmModal.noButton')" color="white" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>
    </q-page>
</template>
<script setup>
import { useCrud } from 'src/utils/renters.js'

const {

    $q, openModalCreate, openModalEdit, openModalExclude, openModalView, openModalConfirm,

    filter, pagination, columns, addRenter, newRenter, formRef, formRefEdit,

    t, paginationLabel, isDuplicate, editRenter, tryOpenConfirm, prepareEditRenter,

    renters, loading, upadteRenter, cancel, fixedName,

    deleteRenter, confirmDelete, viewRenter, viewRenterFunction, selectRenter
} = useCrud()
</script>
