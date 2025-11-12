

export default {
    login: {
        bookRental: 'Book rental',
        welcome: 'Welcome Back!',
        title: "Login",
        email: "Email",
        password: "Password",
        button: "Login",
        forgotPassword: "Forgot password?",
        hints: {
            email: "User email",
            password: "User password",
            errorEmail: "Please enter your email",
            errorPassword: "Please enter your password",
            alert: "Something is wrong..."
        }
    },


    forgotPassword: {
        bookRental: 'Book rental',
        forgotPasswordTitle: 'Forgot password?',
        title: "Recover password",
        email: "Email",
        button: "Continue",
        buttonBack: "Back"
    },


    sideBar: {
        dashboard: "Dashboard",
        library: "Library",
        rents: "Rents",
        users: "Users",
        renters: "Renters",
        publishers: "Publishers",
        logout: "Logout",
        header: "Book rental"
    },


    dashboard: {
        headerTitle: "Dashboard",
        rentsChart: "Rental data by month",
        top3Chart: "Top 3 Most Rented Books",
        publishersBooksRenters: "Publishers, books and renters registered",
        numberOfUsers: "Number of users:",
        numberOfAdmins: "Number of admins:",
        chart: {
            rented: "Rented",
            late: "Late",
            onTime: "Returned on time",
            returnedLate: "Returned late",
            publishers: "Publishers",
            books: "Books",
            renters: "Renters"
        },
        table: {
            tableTitle: "Renters report",
            renters: "Renters",
            rentsQuantity: "Rents quantity",
            rentsActive: "Rents active",
        }
    },


    tables: {
        noData: "No data available...",
        rowsPerPage: "Rows per page",
        of: "of",
        loading: "Loading..."
    },


    library: {
        headerTitle: "Library",
        table: {
            tableTitle: "Current Collection",
            name: "Name",
            author: "Author",
            launchDate: "Launch Date",
            totalQuantity: "Stock",
            totalInUse: "Rented",
            publisher: "Publisher",
            actions: "Actions"
        },
        createModal: {
            title: "Register Book",
            name: "Name",
            author: "Author",
            totalQuantity: "Stock",
            publisher: "Publisher",
            launchDate: "Launch date",
            registerButton: "Register",
            cancelButton: "Cancel"
        },
        editModal: {
            title: "Edit book",
            name: "Name",
            author: "Author",
            totalQuantity: "Stock",
            publisher: "Publisher",
            launchDate: "Launch date",
            registerButton: "Save",
            cancelButton: "Cancel",
        },
        errorInput: {
            name: "Name is required",
            author: "Author is required",
            totalQuantity: "Stock quantity is required",
            publisher: "Publisher is required",
            launchDate: "Launch date is required",
            invalidLaunchDate: "Launch date cannot be in the future"
        }
    },


    search: {
        searchBar: "Search",
        createButton: " + Create"
    },


    rents: {
        headerTitle: "Rents",
        table: {
            tableTitle: "Rental list",
            book: "Book",
            renter: "Renter",
            rentDate: "Rent date",
            deadLine: "Dead line",
            status: "Status",
            actions: "Actions"
        },
        createModal: {
            title: "Create rental",
            book: "Book",
            renter: "Renter",
            deadLine: "Dead line",
            registerButton: "Create",
            cancelButton: "Cancel"
        },
        editModal: {
            title: "Edit rental",
            book: "Book",
            renter: "Renter",
            deadLine: "Dead line",
            registerButton: "Save",
            cancelButton: "Cancel",
            returnModal: {
                yesButton: "Yes",
                noButton: "No",
                text: "Are you sure you want to return this book?",
            }
        },
        status: {
            RENTED: "Rented",
            IN_TIME: "Returned on time",
            LATE: "Late",
            DELIVERED_WITH_DELAY: "Delivered with delay"
        },
        errorInput: {
            book: "Book is required",
            renter: "Renter is required",
            deadLine: "Dead line is required",
            invalidDeadLine: "Dead line must be a future date",
            tooFarDeadLine: "The maximum deadline is 30 days."
        }
    },


    users: {
        headerTitle: "Users",
        table: {
            tableTitle: "User List",
            name: "Name*",
            email: "Email*",
            role: "Access Level*",
            actions: "Actions"
        },
        createModal: {
            title: "Create new user",
            name: "Name",
            email: "Email",
            password: "Password",
            admin: "Administrator",
            user: "User",
            registerButton: "Register",
            cancelButton: "Cancel"
        },
        editModal: {
            title: "Edit user",
            name: "Name*",
            email: "Email*",
            password: "Password*",
            admin: "Administrator",
            user: "User",
            registerButton: "Save",
            cancelButton: "Cancel",
            confirmModal: {
                yesButton: "Yes",
                noButton: "No",
                text: "Are you sure you want to perform the edit?"
            }
        },
        viewModal: {
            title: "User details",
            id: "ID",
            name: "Name",
            email: "Email",
            password: "Password",
            role: "Access Level",
            cancelButton: "Done"
        },
        errorInput: {
            name: "Name is required",
            email: "Email is required",
            password: "Password is required",
            weakPassword: "Password must be at least 8 characters",
            invalidEmail: "Invalid email",
            invalidRole: "Access level is required"
        }
    },


    excludeModal: {
        text: "Are you sure you want to delete this?",
        yesButton: "Yes",
        noButton: "No"
    },


    confirmModal: {
        yesButton: "Yes",
        noButton: "No",
        text: "Are you sure you want to edit this?",
    },


    renters: {
        headerTitle: "Renters",
        table: {
            tableTitle: "Renters List",
            name: "Name*",
            email: "Email*",
            telephone: "Telephone*",
            address: "Address*",
            cpf: "CPF",
            actions: "Actions"
        },
        createModal: {
            title: "Register new renter",
            name: "Name*",
            email: "Email*",
            telephone: "Telephone*",
            cpf: "CPF*",
            address: "Address*",
            registerButton: "Register",
            cancelButton: "Cancel"
        },
        editModal: {
            title: "Edit renter",
            name: "Name*",
            email: "Email*",
            telephone: "Telephone*",
            cpf: "CPF*",
            address: "Address*",
            registerButton: "Save",
            cancelButton: "Cancel",
        },
        viewModal: {
            title: "Renter details",
            id: "ID",
            name: "Name",
            email: "Email",
            telephone: "Telephone",
            cpf: "CPF",
            address: "Address",
            cancelButton: "Close"
        },
        errorInput: {
            name: "Name is required",
            email: "Email is required",
            telephone: "Telephone is required",
            cpf: "CPF is required",
            address: "Address is required",
            invalidEmail: "Invalid email",
            invalidTelephone: "Invalid telephone",
            invalidCpf: "Invalid CPF"
        }
    },


    publishers: {
        headerTitle: "Publishers",
        table: {
            tableTitle: "Publishers List",
            name: "Name",
            email: "Email",
            telephone: "Telephone",
            site: "Site",
            actions: "Actions"
        },
        createModal: {
            title: "Register new publisher",
            name: "Name*",
            email: "Email*",
            telephone: "Telephone*",
            site: "Site",
            registerButton: "Register",
            cancelButton: "Cancel"
        },
        editModal: {
            title: "Edit publisher",
            name: "Name*",
            email: "Email*",
            telephone: "Telephone*",
            site: "Site",
            registerButton: "Save",
            cancelButton: "Cancel",
        },
        errorInput: {
            name: "Name is required",
            email: "Email is required",
            telephone: "Telephone is required",
            invalidEmail: "Invalid email",
            invalidTelephone: "Invalid telephone",
            invalidSite: "Invalid site"
        }
    },
    errorDuplicate: "This field already exists. Please use a different value.",
    roleUser: "User",
    roleAdmin: "Administrator",
    avatarButton: "Set avatar",

    toasts: {
        success: {
            postSuccess: "Registration completed successfully!",
            deleteSuccess: "Deletion completed successfully!",
            putSuccess: "Update completed successfully!",
            finishRent: "Return completed successfully!",
        },
        error: {
            getError: "Error fetching data!",

            deleteErrorPublishers: "Error during deletion! Check for linked books.",
            deleteErrorRenters: "Error during deletion! Check if this tenant has active rentals.",
            deleteError: "Error during deletion!",

            deleteErrorOwnUser: "You cannot delete your own user!",

            postError: "Error during registration!",
            putError: "Error during update!",

            postErrorRent: "Error! Check if the renter has any overdue items!",

            postErrorCpf: "Error during registration! Check if the CPF is valid.",
            putErrorCpf: "Error during update! Check if the CPF is valid.",
            errorFinishRent: "Error when completing the return.",

            deleteErrorBook: "Error deleting! Please check if this book has active rentals."
        },
    },

    monthLabel: "Months:"

}