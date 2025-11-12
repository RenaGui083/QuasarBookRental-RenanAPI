import { ref, watch, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import i18n from 'src/i18n';
import { useUserStore } from 'src/stores/usersStore';
import { storeToRefs } from 'pinia'
import { errorMsg } from 'src/utils/toasts'

export function useCrud() {
    const newUser = ref({
        name: '',
        email: '',
        password: '',
        role: 'USER'
    })

    const editUser = ref({
        name: '',
        email: '',
        role: ''
    })

    const viewUser = ref({
        id: null,
        name: '',
        email: '',
        role: ''
    })

    const fixedName = ref('')

    const $q = useQuasar()

    const { t } = useI18n()
    const { locale } = useI18n()

    const openModalCreate = ref(false)
    const openModalEdit = ref(false)
    const openModalExclude = ref(false)
    const openModalView = ref(false)
    const openModalConfirm = ref(false)

    const options = computed(() => [
        { label: t('users.createModal.user'), value: 'USER' },
        { label: t('users.createModal.admin'), value: 'ADMIN' }
    ])

    const userStore = useUserStore()
    const { users, loading, error } = storeToRefs(userStore)

    const filter = ref("")
    const formRef = ref(null)
    const formRefEdit = ref(null)
    const selectUser = ref(null)

    const pagination = ref({
        page: 1,
        rowsPerPage: $q.screen.lt.md ? 0 : 5
    })

    watch(() => $q.screen.lt.md, (isMobile) => {
        pagination.value.rowsPerPage = isMobile ? 0 : 5
    })

    function isDuplicate(field, value) {
        if (!value) return true

        const isDuplicated = users.value.some(
            p => p[field] === value && p.id !== (selectUser.value?.id ?? null)
        )

        return isDuplicated ? t('errorDuplicate') : true
    }


    const columns = computed(() => [
        { name: "name", label: t('users.table.name'), field: "name", align: "left", sortable: true },
        { name: "email", label: t('users.table.email'), field: "email", align: "left", sortable: true },
        { name: "role", label: t('users.table.role'), field: "role", align: "left", sortable: true },
        { name: "actions", label: t('users.table.actions'), field: "actions", align: "center", filter: false }
    ])

    const paginationLabel = (start, end, total) => `${start} - ${end} ${t('tables.of')} ${total}`

    // get users on mount
    onMounted(async () => {
        try {
            await userStore.fetchUsers()
            console.log('Users fetched successfully on mount.')
        } catch (error) {
            console.error('Error fetching users on mount:', error)
        }
    })

    //add user

    async function addUser() {
        const success = await formRef.value.validate()
        if (success) {
            const added = await userStore.addUser(newUser.value)
            if (added) {
                await userStore.fetchUsers()
                newUser.value = { name: '', email: '', password: '', role: '' }
                openModalCreate.value = false
            }
        } else {
            console.log('Invalid form')
        }
    }

    //edit user

    function prepareEditUser(user) {
        openModalEdit.value = true
        selectUser.value = user

        editUser.value = {
            name: user.name,
            email: user.email,
            role: user.role
        }

        fixedName.value = user.name
    }

    async function tryOpenConfirm() {
        if (!formRefEdit.value) return
        const valid = await formRefEdit.value.validate()
        if (valid) {
            openModalConfirm.value = true
            openModalEdit.value = false
        } else {
            console.warn('Formulário inválido')
        }
    }

    async function updateUser() {
        editUser.value = { ...editUser.value }
        const updated = await userStore.updateUser(selectUser.value.id, editUser.value)
        if (updated) {
            await userStore.fetchUsers()
            openModalEdit.value = false
            openModalConfirm.value = false
            editUser.value = { name: '', email: '', role: '' }
            selectUser.value = null
        } else {
            console.error('Failed to update user', error)
            openModalConfirm.value = false
            openModalEdit.value = true
        }
    }

    //cancel

    function cancel() {
        openModalEdit.value = false
        openModalCreate.value = false
        editUser.value = { name: '', email: '', role: '' }
        newUser.value = { name: '', email: '', password: '', role: '' }
        selectUser.value = null
    }

    //delete user

    function deleteUser(user) {
        selectUser.value = user
        openModalExclude.value = true
    }

    async function confirmDelete() {
        if (!selectUser.value) return console.warn('No renter selected for deletion')
        let userName = localStorage.getItem('nameUser')
        if (selectUser.value.name == userName) return errorMsg(t('toasts.error.deleteErrorOwnUser'))

        try {
            await userStore.deleteUser(selectUser.value.id)
            await userStore.fetchUsers()
            openModalExclude.value = false
            selectUser.value = null
        } catch (error) {
            console.error(error)
        }
    }

    //view user

    function viewUserFunction(user) {
        selectUser.value = user
        openModalView.value = true

        viewUser.value = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role === 'ADMIN' ? t('roleAdmin') : t('roleUser')
        }
    }


    return {
        newUser, addUser, prepareEditUser, formRefEdit, editUser, tryOpenConfirm, updateUser, fixedName,

        $q, openModalCreate, openModalEdit, openModalExclude, openModalView, options, openModalConfirm,

        t, i18n, locale, cancel, deleteUser, confirmDelete, viewUserFunction, viewUser,

        filter, pagination, columns, selectUser,

        paginationLabel, users, loading, error, formRef, isDuplicate
    }
}