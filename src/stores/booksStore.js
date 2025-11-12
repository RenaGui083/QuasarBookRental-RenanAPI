import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { successMsg, errorMsg } from 'src/utils/toasts'
import { i18n } from 'boot/i18n'
import { watch } from 'vue'

export const useBookStore = defineStore('book', {
    state: () => ({
        books: [],
        fetchBooksTable: [],
        publishersOptions: [],
        loading: false,
        error: null
    }),

    actions: {
        fetchBooks() {
            this.loading = true
            this.error = null

            return api.get('/books')
                .then(response => {
                    console.log('response.data:', response.data)
                    this.books = response.data

                    this.fetchBooksTable = response.data.content.map(book => ({
                        ...book,
                        name: book.name,
                        publisher: book.publisher.name,
                        publisherId: book.publisher.id,
                        author: book.author,
                        launchDate: book.launchDate,
                        totalQuantity: book.totalQuantity,
                        totalInUse:  Math.max(0, book.totalInUse || 0)
                    }))
                    console.log('Books fetched:', this.books);
                })
                .catch(e => {
                    console.error('Erro:', e.response?.data || e.message);
                    errorMsg(i18n.global.t('toasts.error.getError'));
                })
                .finally(() => {
                    this.loading = false
                })
        },

        addBook(books) {
            return api.post('/books', books)
                .then(response => {
                    this.books.push(response.data)
                    successMsg(i18n.global.t('toasts.success.postSuccess'))
                    return true
                })
                .catch(error => {
                    errorMsg(i18n.global.t('toasts.error.postError'));
                    console.error('Erro:', error.response?.data || error.message);
                    return false
                })
        },

        updateBook(id, updated) {
            return api.put(`/books/${id}`, updated)
                .then(response => {
                    const index = this.books.findIndex(b => b.id === id)
                    if (index !== -1) this.books[index] = response.data
                    successMsg(i18n.global.t('toasts.success.putSuccess'))
                    return true
                })
                .catch(error => {
                    const msg = error.response?.data?.error || error.message;
                    console.error('Erro:', msg);
                    errorMsg(i18n.global.t('toasts.error.putError'));
                    return false
                })
        },

        deleteBook(id) {
            return api.delete(`/books/${id}`)
                .then(() => {
                    this.books = this.books.filter(b => b.id !== id)
                    successMsg(i18n.global.t('toasts.success.deleteSuccess'))
                })
                .catch(error => {
                    const msg = error.response?.data?.error || error.message;
                    console.error('Erro:', msg);
                    errorMsg(i18n.global.t('toasts.error.deleteErrorBook'));
                })
        },

        async fetchPublishers() {
            try {
                const publisherRes = await api.get('/publishers')
                this.publishersOptions = publisherRes.data.

                console.log('publishers:', this.publishersOptions)
            } catch (err) {
                console.error('Error to fetch publishers', err)
                errorMsg(i18n.global.t('toasts.error.getError'))
            }
        }
    }
})

const booksStore = useBookStore()
watch(
    () => i18n.global.locale.value,
    () => {
        booksStore.fetchBooks()
            .then(() => console.log('Books refetched after locale change'))
            .catch(err => console.error(err))
    }
)