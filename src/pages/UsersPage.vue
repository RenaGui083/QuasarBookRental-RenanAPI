<template>
    <q-page class="mainContainer">
        <div class="headerTitle">
            <q-icon name="badge" />
            <!-- <h5>Biblioteca</h5> -->
            <header class="topTittle">{{ t('users.headerTitle') }}</header>
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
            <div class="text-h6 text-center full-width">{{ t('users.table.tableTitle') }}</div>
            <q-table :rows="users" :columns="columns" row-key="id" v-model:pagination="pagination"
                :rows-per-page-options="$q.screen.lt.md ? [] : [5, 6]" :filter="filter" flat bordered
                :no-data-label="t('tables.noData')" :rows-per-page-label="t('tables.rowsPerPage')"
                :pagination-label="paginationLabel" class="my-table shadow-2 rounded-borders"
                :hide-bottom="$q.screen.lt.md" :loading="loading" :loading-label="t('tables.loading')">
                <!-- Modo tabela normal (desktop) -->
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="text-center" :data-label="props.col.label">
                        <q-btn flat round dense icon="edit" color="#121f2f" @click="prepareEditUser(props.row)" />
                        <q-btn flat round dense icon="delete" color="#121f2f" @click="deleteUser(props.row)" />
                        <q-btn flat round dense icon="visibility" color="#121f2f"
                            @click="viewUserFunction(props.row)" />
                    </q-td>
                </template>
                <template v-slot:body-cell="props">
                    <q-td :props="props" :data-label="props.col.label">
                        {{ props.value }}
                    </q-td>
                </template>
                <template v-slot:body-cell-role="props">
                    <q-td :props="props">
                        {{ props.row.role === 'ADMIN' ? t('roleAdmin') : t('roleUser') }}
                    </q-td>
                </template>
                <template v-slot:item="props">
                    <div class="q-pa-sm q-mb-sm rounded-borders shadow-1 bg-grey-1">
                        <div v-for="col in props.cols" :key="col.name" class="row q-pb-xs">
                            <div class="col-4 text-weight-bold">{{ col.label }}</div>
                            <div class="col-8">{{ col.value }}</div>
                        </div>
                        <div class="row justify-end q-mt-sm">
                            <q-btn flat round dense icon="edit" color="#121f2f" @click="prepareEditUser(props.row)" />
                            <q-btn flat round dense icon="delete" color="#121f2f" @click="deleteUser(props.row)" />
                            <q-btn flat round dense icon="visibility" color="#121f2f"
                                @click="viewUserFunction(props.row)" />
                        </div>
                    </div>
                </template>
            </q-table>


        </div>

        <!-- Modals -->
        <q-dialog v-model="openModalCreate" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('users.createModal.title') }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup class="closeIcon" />
                </q-card-section>

                <q-separator />


                <q-card-section class="scroll">
                    <slot>
                        <q-form @submit="onSubmit" @reset="onReset" ref="formRef">
                            <q-input filled v-model="newUser.name" type="text" color="primary"
                                :label="t('users.createModal.name')" class="inputModal" :rules="[

                                    val => !!val || t('users.errorInput.name'),
                                    val => isDuplicate('name', val)
                                ]" />

                            <q-input filled v-model="newUser.email" type="email" color="primary"
                                :label="t('users.createModal.email')" class="inputModal" :rules="[
                                    val => !!val || t('users.errorInput.email'),
                                    val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || t('users.errorInput.invalidEmail'),
                                    val => isDuplicate('email', val)
                                ]" />

                            <q-input filled v-model="newUser.password" type="password" color="primary"
                                :label="t('users.createModal.password')" class="inputModal" :rules="[
                                    val => !!val || t('users.errorInput.password'),
                                    val => val.length >= 8 || t('users.errorInput.weakPassword')
                                ]" />

                            <div class="q-pa-lg radio-container">
                                <q-option-group v-model="newUser.role" :options="options" color="primary" inline
                                    class="radio" :rules="[val => !!val || t('users.errorInput.role')]" />
                            </div>

                        </q-form>
                    </slot>
                </q-card-section>


                <q-separator />
                <q-card-actions align="left">
                    <q-btn unelevated :label="t('users.createModal.registerButton')" color="primary" @click="addUser"
                        class="buttonRegister" />
                    <q-btn flat :label="t('users.createModal.cancelButton')" color="white" @click="cancel"
                        v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>



        <q-dialog v-model="openModalEdit" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('users.editModal.title') + " " + (fixedName) + "?" }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup class="closeIcon" />
                </q-card-section>

                <q-separator />


                <q-card-section class="scroll">
                    <slot>

                        <q-form @submit="onSubmit" @reset="onReset" ref="formRefEdit">
                            <q-input filled v-model="editUser.name" type="text" color="primary"
                                :label="t('users.createModal.name')" class="inputModal" :rules="[
                                    val => !!val || t('users.errorInput.name'),
                                    val => isDuplicate('name', val)
                                ]" />

                            <q-input filled v-model="editUser.email" type="email" color="primary"
                                :label="t('users.createModal.email')" class="inputModal" :rules="[
                                    val => !!val || t('users.errorInput.email'),
                                    val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || t('users.errorInput.invalidEmail'),
                                    val => isDuplicate('email', val)
                                ]" />


                            <div class="q-pa-lg radio-container">
                                <q-option-group v-model="editUser.role" :options="options" color="primary" inline
                                    class="radio" :rules="[val => !!val || t('users.errorInput.role')]" />
                            </div>

                        </q-form>

                    </slot>
                </q-card-section>


                <q-separator />
                <q-card-actions align="left">
                    <q-btn unelevated :label="t('users.editModal.registerButton')" color="primary"
                        @click="tryOpenConfirm" class="buttonRegister" />
                    <q-btn flat :label="t('users.editModal.cancelButton')" color="white" @click="cancel"
                        v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>



        <q-dialog v-model="openModalExclude" persistent :maximized="$q.screen.lt.md">
            <q-card style="min-width: 400px; max-width: 95vw; max-height: none;" class="mainModal">

                <q-card-section class="row items-center">
                    <div class="text-h5">{{ t('excludeModal.text') + " " + "(" + (selectUser.name) + ")" }}</div>
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
                    <div class="text-h5">{{ t('users.viewModal.title') + " " + (viewUser?.name ?? '') }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup class="closeIcon" />
                </q-card-section>

                <q-separator />

                <q-card-section class="scroll">



                    <q-field class="viewInput" filled :label="t('users.viewModal.id')" label-color="primary"
                        stack-label>
                        <template v-slot:prepend>
                            <q-icon name="key" color="primary" />
                        </template>
                        <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0" style="color: white;">{{
                                (viewUser?.id ??'') }}</div>
                        </template>
                    </q-field>

                    <q-field class="viewInput" filled :label="t('users.viewModal.name')" label-color="primary"
                        stack-label>
                        <template v-slot:prepend>
                            <q-icon name="person" color="primary" />
                        </template>
                        <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0" style="color: white;">{{
                                (viewUser?.name ??'') }}</div>
                        </template>
                    </q-field>

                    <q-field class="viewInput" filled :label="t('users.viewModal.email')" label-color="primary"
                        stack-label>
                        <template v-slot:prepend>
                            <q-icon name="email" color="primary" />
                        </template>
                        <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0" style="color: white;">{{
                                (viewUser?.email ??'') }}</div>
                        </template>
                    </q-field>

                    <q-field class="viewInput" filled :label="t('users.viewModal.role')" label-color="primary"
                        stack-label>
                        <template v-slot:prepend>
                            <q-icon name="work" color="primary" />
                        </template>
                        <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0" style="color: white;">{{
                                (viewUser?.role ??'') }}</div>
                        </template>
                    </q-field>


                </q-card-section>

                <q-separator />

                <q-card-section class="left">
                    <q-btn flat :label="t('users.viewModal.cancelButton')" color="white" v-close-popup />
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
                    <q-btn unelevated :label="t('confirmModal.yesButton')" color="primary" @click="updateUser"
                        class="buttonRegister" />
                    <q-btn flat :label="t('confirmModal.noButton')" color="white" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>

    </q-page>
</template>

<script setup>
import { useCrud } from 'src/utils/users.js'


const { newUser, addUser, isDuplicate, prepareEditUser, editUser, formRefEdit, tryOpenConfirm, updateUser, cancel, fixedName, viewUserFunction, viewUser,

    $q, openModalCreate, openModalEdit, openModalExclude, openModalView, options, openModalConfirm, deleteUser, confirmDelete, selectUser,

    filter, pagination, columns, t, paginationLabel, users, loading, formRef } = useCrud()

</script>