import { ref, watch, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import i18n from 'src/i18n';
import { storeToRefs } from 'pinia'
import { usePublisherStore } from 'src/stores/publishersStore'
// import { successMsg, errorMsg } from 'src/utils/toasts'

export function useCrud() {

    const publisherStore = usePublisherStore()
    const newPublisher = ref({
        name: '',
        email: '',
        telephone: '',
        site: ''
    })

    const editPublisher = ref({
        name: '',
        email: '',
        telephone: '',
        site: ''
    })

    const editedPublisher = ref({
        name: '',
        email: '',
        telephone: '',
        site: ''
    })

    const fixedName = ref('')
    const { publishers, loading, error } = storeToRefs(publisherStore)


    const $q = useQuasar()

    const { t, locale } = useI18n()

    const formRef = ref(null)
    const formRefEdit = ref(null)

    const selectPublisher = ref(null)

    const openModalCreate = ref(false)
    const openModalEdit = ref(false)
    const openModalExclude = ref(false)
    const openModalConfirm = ref(false)

    const paginationLabel = (start, end, total) => `${start} - ${end} ${t('tables.of')} ${total}`

    const filter = ref("")

    const pagination = ref({ page: 1, rowsPerPage: $q.screen.lt.md ? 0 : 5 })

    function isDuplicate(field, value) {
        if (!value) return true

        const isDuplicated = publishers.value.some(
            p => p[field] === value && p.id !== (selectPublisher.value?.id ?? null)
        )

        return isDuplicated ? t('errorDuplicate') : true
    }

    watch(() => $q.screen.lt.md, (isMobile) => { pagination.value.rowsPerPage = isMobile ? 0 : 5 })

    const columns = computed(() => [
        { name: "name", label: t('publishers.table.name'), field: "name", align: "left", sortable: true },
        { name: "email", label: t('publishers.table.email'), field: "email", align: "left", sortable: true },
        { name: "telephone", label: t('publishers.table.telephone'), field: "telephone", align: "left", sortable: true },
        { name: "site", label: t('publishers.table.site'), field: "site", align: "left", sortable: true },
        { name: "actions", label: t('publishers.table.actions'), field: "actions", align: "center", filter: false }
    ])

    //get publishers on load

    onMounted(async () => {
        try {
            await publisherStore.fetchPublishers()
            console.log('Publishers fetched on mount')
        } catch (error) {
            console.log(error)('Failed to fetch publishers on mount')
        }
    })

    //add publisher
    async function addPublisher() {
        const success = await formRef.value.validate()
        if (success) {
            await publisherStore.addPublisher({ ...newPublisher.value })
            await publisherStore.fetchPublishers()
            newPublisher.value = { name: '', email: '', telephone: '', site: '' }
            openModalCreate.value = false
        } else {
            console.log('Invalid form')
        }
    }

    //delete publisher
    function deletePublisher(publisher) {
        selectPublisher.value = publisher
        openModalExclude.value = true
    }

    async function confirmDelete() {
        if (!selectPublisher.value) return console.warn('No publisher selected for deletion')

        try {
            await publisherStore.deletePublisher(selectPublisher.value.id)
            await publisherStore.fetchPublishers()
            openModalExclude.value = false
            selectPublisher.value = null
        } catch (error) {
            console.error(error)
        }
    }

    //update publisher

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

    function prepareEditPublisher(publisher) {
        openModalEdit.value = true
        selectPublisher.value = publisher

        editPublisher.value = {
            name: publisher.name,
            email: publisher.email,
            telephone: publisher.telephone,
            site: publisher.site
        }
        fixedName.value = publisher.name
    }

    async function updatePublisher() {
        editedPublisher.value = { ...editPublisher.value }
        try {
            await publisherStore.updatePublisher(selectPublisher.value.id, editPublisher.value)
            await publisherStore.fetchPublishers()
            openModalEdit.value = false
            openModalConfirm.value = false
            editPublisher.value = { name: '', email: '', telephone: '', site: '' }
            selectPublisher.value = null
        } catch (err) {
            console.error(err)
        }
    }

    //cancel

    function cancel() {
        openModalEdit.value = false
        openModalCreate.value = false
        editPublisher.value = { name: '', email: '', telephone: '', site: '' }
        newPublisher.value = { name: '', email: '', telephone: '', site: '' }
        selectPublisher.value = null                             
    }

    return {
        newPublisher, addPublisher, formRef, formRefEdit, deletePublisher, selectPublisher, confirmDelete, editPublisher, prepareEditPublisher,

        updatePublisher, tryOpenConfirm,

        $q, openModalCreate, openModalEdit, openModalExclude, openModalConfirm,

        filter, pagination, columns,

        t, i18n, locale, paginationLabel, fixedName,

        publishers, loading, error, isDuplicate, cancel

    }
}