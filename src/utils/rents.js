import { ref, watch, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import i18n from 'src/i18n';
import { useRentsStore } from 'src/stores/rentsStore';
import { storeToRefs } from 'pinia'

export function useCrud() {
    const rentsStore = useRentsStore()

    const newRent = ref({
        renterId: null,
        bookId: null,
        deadLine: ''
    })

    const editRent = ref({
        renterId: null,
        bookId: null,
        deadLine: ''
    })

    const $q = useQuasar()

    const openModalCreate = ref(false)
    const openModalEdit = ref(false)
    const openModalBookReturn = ref(false)
    const openModalConfirm = ref(false)

    const filter = ref("")
    const formRef = ref(null)
    const formRefEdit = ref(null)

    const selectRent = ref(null)
    const fixedName = ref('')

    const { t } = useI18n()
    const { locale } = useI18n()

    const { booksOptions, rentersOptions, fetchRentsTable, rents, loading, error } = storeToRefs(rentsStore)

    const pagination = ref({
        page: 1,
        rowsPerPage: $q.screen.lt.md ? 0 : 5
    })

    watch(() => $q.screen.lt.md, (isMobile) => {
        pagination.value.rowsPerPage = isMobile ? 0 : 5
    })

    const columns = computed(() => [
        { name: "book", label: t('rents.table.book'), field: "book", align: "left", sortable: true },
        { name: "renter", label: t('rents.table.renter'), field: "renter", align: "left", sortable: true },
        { name: "rentDate", label: t('rents.table.rentDate'), field: row => formatISOToLocale(row.rentDate, locale.value), align: "left", sortable: true },
        { name: "deadLine", label: t('rents.table.deadLine'), field: row => formatISOToLocale(row.deadLine, locale.value), align: "left", sortable: true },
        { name: "status", label: t('rents.table.status'), field: "status", align: "left", sortable: true },
        { name: "actions", label: t('rents.table.actions'), field: "actions", align: "center", filter: false }
    ])


    const paginationLabel = (start, end, total) => `${start} - ${end} ${t('tables.of')} ${total}`


    //get rents on load

    onMounted(async () => {
        try {
            await Promise.all([
                rentsStore.fetchRents(),
                rentsStore.fetchBooksAndRenters()
            ])
            console.log('Rents, books and renters fetched')
        } catch (error) {
            console.error('Error to fetch data', error)
        }
    })

    //add rent

    async function addRent() {
        const success = await formRef.value.validate()
        if (!success) {
            console.log('Invalid form')
            return
        }

        const payload = {
            renterId: newRent.value.renterId,
            bookId: newRent.value.bookId,
            deadLine: parseInputDateToISO(newRent.value.deadLine, locale.value)
        }

        try {
            const add = await rentsStore.addRent(payload)
            if (add) {
                console.log(payload)
                newRent.value = { bookId: '', renterId: '', deadLine: '' }
                openModalCreate.value = false
                await rentsStore.fetchRents()
            }
        } catch (error) {
            console.error('Error to add rent', error)
        }
    }

    function parseInputDateToISO(dateStr, locale) {
        if (!dateStr) return ''
        const parts = dateStr.split('/')
        let day, month, year

        if (locale.toLowerCase() === 'en-us') {
            // MM/DD/YYYY
            [month, day, year] = parts
        } else {
            // DD/MM/YYYY
            [day, month, year] = parts
        }

        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }

    function formatISOToLocale(isoDate, locale) {
        if (!isoDate) return ''
        const [year, month, day] = isoDate.split('-')

        if (locale.toLowerCase() === 'en-us') {
            // MM/DD/YYYY
            return `${month}/${day}/${year}`
        } else {
            // DD/MM/YYYY
            return `${day}/${month}/${year}`
        }
    }


    //update rent

    function prepareEditRent(rent) {
        openModalEdit.value = true
        selectRent.value = rent

        editRent.value = {
            bookId: rent.bookId,
            renterId: rent.renterId,
            deadLine: formatISOToLocale(rent.deadLine, locale.value)
        }
        fixedName.value = rent.book
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

    async function updateRent() {
        const payload = {
            renterId: editRent.value.renterId,
            bookId: editRent.value.bookId,
            deadLine: parseInputDateToISO(editRent.value.deadLine, locale.value)
        }

        const updated = await rentsStore.updateRent(selectRent.value.id, payload)
        if (updated == true) {
            await rentsStore.fetchRents()
            openModalEdit.value = false
            openModalConfirm.value = false
            editRent.value = { bookId: '', renterId: '', deadLine: '' }
            selectRent.value = null
        } else {
            console.error('Failed to update rent:', error)
            openModalConfirm.value = false
            openModalEdit.value = true
        }

    }

    //finish rent

    function openModalFinishRent(rent) {
        openModalBookReturn.value = true
        selectRent.value = rent
    }

    async function finishRent() {

        const updated = await rentsStore.finishRent(selectRent.value.id)
        if (updated == true) {
            await rentsStore.fetchRents()
            openModalBookReturn.value = false
        } else {
            console.error('Failed to finish rent:', error)
        }
    }

    //cancel

    function cancel() {
        openModalEdit.value = false
        openModalCreate.value = false
        editRent.value = { bookId: '', renterId: '', deadLine: '' }
        newRent.value = { bookId: '', renterId: '', deadLine: '' }
        selectRent.value = null
    }

    return {
        newRent, addRent, formRef, fetchRentsTable, booksOptions, rentersOptions, editRent, formRefEdit, prepareEditRent, selectRent,

        $q, openModalCreate, openModalEdit, openModalBookReturn, openModalConfirm, t, i18n, locale, tryOpenConfirm,

        filter, pagination, columns, paginationLabel, rents, loading, error, fixedName, updateRent, finishRent, openModalFinishRent, cancel
    }
}