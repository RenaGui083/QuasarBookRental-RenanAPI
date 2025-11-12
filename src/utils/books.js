import { ref, watch, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import i18n from 'src/i18n';
import { storeToRefs } from 'pinia'
import { useBookStore } from 'src/stores/booksStore'

export function useCrud() {
    const booksStore = useBookStore()

    const newBook = ref({
        name: '',
        author: '',
        launchDate: '',
        totalQuantity: null,
        publisherId: null
    })

    const editBook = ref({
        name: '',
        author: '',
        launchDate: '',
        totalQuantity: null,
        publisherId: null
    })

    const $q = useQuasar()

    const openModalCreate = ref(false)
    const openModalEdit = ref(false)
    const openModalExclude = ref(false)
    const openModalConfirm = ref(false)

    const { t } = useI18n()
    const { locale } = useI18n()

    const { books, loading, error, fetchBooksTable, publishersOptions } = storeToRefs(booksStore)


    const filter = ref("")
    const formRef = ref(null)
    const formRefEdit = ref(null)
    const selectBook = ref(null)
    const fixedName = ref('')

    const pagination = ref({
        page: 1,
        rowsPerPage: $q.screen.lt.md ? 0 : 5
    })

    watch(() => $q.screen.lt.md, (isMobile) => {
        pagination.value.rowsPerPage = isMobile ? 0 : 5
    })

    function isDuplicate(field, value) {
        if (!value) return true

        const isDuplicated = books.value.some(
            b => b[field] === value && b.id !== (selectBook.value?.id ?? null)
        )

        return isDuplicated ? t('errorDuplicate') : true
    }


    // colunas
    const columns = computed(() => [
        { name: "name", label: t('library.table.name'), field: "name", align: "left", sortable: true },
        { name: "publisher", label: t('library.table.publisher'), field: "publisher", align: "left", sortable: true },
        { name: "author", label: t('library.table.author'), field: "author", align: "left", sortable: true },
        { name: "launchDate", label: t('library.table.launchDate'), field: row => formatISOToLocale(row.launchDate, locale.value), align: "left", sortable: true },
        { name: "totalQuantity", label: t('library.table.totalQuantity'), field: "totalQuantity", align: "left", sortable: true },
        { name: "totalInUse", label: t('library.table.totalInUse'), field: "totalInUse", align: "left", sortable: true },
        { name: "actions", label: t('library.table.actions'), field: "actions", align: "center", filter: false }
    ])

    const paginationLabel = (start, end, total) => `${start} - ${end} ${t('tables.of')} ${total}`

    //get books on load

    onMounted(async () => {
        try {
            await Promise.all([
                booksStore.fetchBooks(),
                booksStore.fetchPublishers()
            ])
            console.log('Books fetched on mount')
        } catch (error) {
            console.log(error)('Failed to fetch Books on mount')
        }
    })

    //add books

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

    async function addBook() {
        const success = await formRef.value.validate()
        if (!success) {
            console.log('Invalid form')
            return
        }

        const payload = {
            name: newBook.value.name,
            author: newBook.value.author,
            launchDate: parseInputDateToISO(newBook.value.launchDate, locale.value),
            totalQuantity: newBook.value.totalQuantity,
            publisherId: newBook.value.publisherId
        }

        try {
            const add = await booksStore.addBook(payload)
            if (add) {
                console.log(payload)
                newBook.value = { name: '', author: '', launchDate: '', totalQuantity: '', publisherId: '' }
                openModalCreate.value = false
                await booksStore.fetchBooks()
            }
        } catch (error) {
            console.error('Error to add book', error)

        }

    }

    //update Book

    function prepareEditBook(book) {
        openModalEdit.value = true
        selectBook.value = book

        editBook.value = {
            name: book.name,
            author: book.author,
            launchDate: formatISOToLocale(book.launchDate, locale.value),
            totalQuantity: book.totalQuantity,
            publisherId: book.publisherId
        }
        fixedName.value = book.name
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

    async function updateBook() {
        const payload = {
            name: editBook.value.name,
            author: editBook.value.author,
            launchDate: parseInputDateToISO(editBook.value.launchDate, locale.value),
            totalQuantity: editBook.value.totalQuantity,
            publisherId: editBook.value.publisherId
        }

        console.log('Payload enviado pra API:', payload)

        const updated = await booksStore.updateBook(selectBook.value.id, payload)
        if (updated == true) {
            await booksStore.fetchBooks()
            openModalEdit.value = false
            openModalConfirm.value = false
            editBook.value = { name: '', author: '', launchDate: '', totalQuantity: null, publisherId: null }
            selectBook.value = null
        } else {
            console.error('Failed to update book:', error)
            openModalConfirm.value = false
            openModalEdit.value = true
        }

    }

    // delete book


    function deleteBook(book) {
        selectBook.value = book
        openModalExclude.value = true
    }

    async function confirmDelete() {
        if (!selectBook.value) return console.warn('No book selected for deletion')

        try {
            await booksStore.deleteBook(selectBook.value.id)
            await booksStore.fetchBooks()
            openModalExclude.value = false
            selectBook.value = null
        } catch (error) {
            console.error(error)
        }
    }

    //cancel

    function cancel() {
        openModalEdit.value = false
        openModalCreate.value = false
        editBook.value = { name: '', author: '', launchDate: '', totalQuantity: null, publisherId: null }
        newBook.value = {  name: '', author: '', launchDate: '', totalQuantity: null, publisherId: null }
        selectBook.value = null
    }

    return {

        fetchBooksTable, addBook, formRef, newBook, isDuplicate, publishersOptions, prepareEditBook, fixedName, editBook, selectBook,


        $q, openModalCreate, openModalEdit, openModalExclude, openModalConfirm, t, i18n, locale, tryOpenConfirm, formRefEdit,


        filter, pagination, columns, paginationLabel, books, loading, error, updateBook, deleteBook, confirmDelete, cancel
    }
}