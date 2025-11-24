

export default {
    login: {
        bookRental: "Alquiler de libros",
        welcome: 'Bienvenido de nuevo',
        title: 'Acceso',
        email: 'Correo electrónico',
        password: 'Contraseña',
        button: 'Entrada',
        forgotPassword: '¿Olvidaste tu contraseña?',
        hints: {
            email: "Correo electrónico del usuario",
            password: "Contraseña del usuario",
            errorEmail: "Por favor ingrese su correo electrónico",
            errorPassword: "Por favor ingrese su contraseña",
            alert: "Algo salió mal..."
        }
    },

    forgotPassword: {
        bookRental: 'Alquiler de libros',
        forgotPasswordTitle: '¿Olvidaste tu contraseña?',
        title: "Recuperar contraseña",
        email: "Correo electrónico",
        button: "Continuar",
        buttonBack: "Volver",
        recoverPassword: {
            title: "Restablecer contraseña",
            newPassword: "Nueva contraseña",
            errorNewPassword: "Error al restablecer la contraseña",
            successNewPassword: "¡Contraseña restablecida con éxito!",
            errorToSendEmail: "Error al enviar el correo electrónico de recuperación",
            errorHintPassword: "La contraseña debe tener al menos 8 caracteres"
        }
    },

    sideBar: {
        dashboard: "Panel de Control",
        library: "Biblioteca",
        rents: "Alquileres",
        users: "Usuarios",
        renters: "Arrendatarios",
        publishers: "Editoriales",
        logout: "Cerrar sesión",
        header: "Alquiler de libros"
    },

    dashboard: {
        headerTitle: "Panel de Control",
        rentsChart: "Datos de alquiler por mes",
        top3Chart: "Top 3 libros más alquilados",
        publishersBooksRenters: "Editoriales, libros y arrendatarios registrados",
        numberOfUsers: "Número de usuarios:",
        numberOfAdmins: "Número de administradores:",
        chart: {
            rented: "Alquilados",
            late: "Atrasados",
            onTime: "Devuelto a tiempo",
            returnedLate: "Devuelto con demora",
            publishers: "Editoriales",
            books: "Libros",
            renters: "Arrendatarios",
            registrations: "Registros"
        },
        table: {
            tableTitle: "Informe de arrendatarios",
            renters: "Arrendatarios",
            rentsQuantity: "Cantidad de alquileres",
            rentsActive: "Alquileres activos",
        }
    },

    tables: {
        noData: "Sin registros disponibles...",
        rowsPerPage: "filas por página",
        of: "de",
        loading: "Cargando..."
    },

    library: {
        headerTitle: "Biblioteca",
        table: {
            tableTitle: "Colección actual",
            name: "Nombre",
            author: "Autor",
            launchDate: "lanzamiento",
            totalQuantity: "Inventario",
            totalInUse: "Alquilados",
            publisher: "Editorial",
            actions: "Acciones"
        },
        createModal: {
            title: "Registrar Libro",
            name: "Nombre",
            author: "Autor",
            totalQuantity: "Inventário",
            publisher: "Editorial",
            launchDate: "Lanzamiento",
            registerButton: "Registrar",
            cancelButton: "Cancelar"
        },
        editModal: {
            title: "Editar libro",
            name: "Nombre",
            author: "Autor",
            totalQuantity: "Inventario",
            publisher: "Editorial",
            launchDate: "Lanzamiento",
            registerButton: "Guardar",
            cancelButton: "Cancelar",
        },
        errorInput: {
            name: "El nombre es obligatorio",
            author: "El autor es obligatorio",
            totalQuantity: "La cantidad en stock es obligatoria",
            publisher: "La editorial es obligatoria",
            launchDate: "La fecha de lanzamiento es obligatoria",
            invalidLaunchDate: "La fecha de lanzamiento no puede ser futura"
        }
    },

    search: {
        searchBar: "Buscar",
        createButton: " + Crear"
    },

    rents: {
        headerTitle: "Alquileres",
        table: {
            tableTitle: "Lista de alquileres",
            book: "Libro",
            renter: "Arrendatario",
            rentDate: "Fecha de alquiler",
            deadLine: "Fecha de devolución",
            status: "Estado",
            actions: "Acciones"
        },
        createModal: {
            title: "Crear alquiler",
            book: "Libro",
            renter: "Arrendatario",
            deadLine: "Fecha de devolución",
            registerButton: "Crear",
            cancelButton: "Cancelar"
        },
        editModal: {
            title: "Editar alquiler",
            book: "Libro",
            renter: "Arrendatario",
            deadLine: "Fecha de devolución",
            registerButton: "Guardar",
            cancelButton: "Cancelar",
            returnModal: {
                yesButton: "Sí",
                noButton: "No",
                text: "¿Estás seguro de que deseas realizar la devolución?",
            }
        },
        status: {
            RENTED: "Alquilado",
            IN_TIME: "Devuelto a tiempo",
            LATE: "Atrasado",
            DELIVERED_WITH_DELAY: "Devuelto con demora"
        },
        errorInput: {
            book: "El libro es obligatorio",
            renter: "El arrendatario es obligatorio",
            deadLine: "La fecha de devolución es obligatoria",
            invalidDeadLine: "La fecha de devolución debe ser futura",
            tooFarDeadLine: "La fecha máxima de devolución es 30 días"
        }
    },
    users: {
        headerTitle: "Usuarios",
        table: {
            tableTitle: "Relación de Usuarios",
            name: "Nombre*",
            email: "Correo electrónico*",
            role: "Nivel de acceso*",
            actions: "Acciones"
        },
        createModal: {
            title: "Registrar nuevo usuario",
            name: "Nombre*",
            email: "Correo electrónico*",
            password: "Contraseña*",
            admin: "Administrador",
            user: "Usuario",
            registerButton: "Registrar",
            cancelButton: "Cancelar"
        },
        editModal: {
            title: "Editar usuario",
            name: "Nombre*",
            email: "Correo electrónico*",
            password: "Contraseña*",
            admin: "Administrador",
            user: "Usuario",
            registerButton: "Guardar",
            cancelButton: "Cancelar",
            confirmModal: {
                yesButton: "Sí",
                noButton: "No",
                text: "¿Está seguro de que desea realizar la edición?",
            }
        },
        viewModal: {
            title: "Detalles del usuario",
            id: "ID",
            name: "Nombre",
            email: "Correo electrónico",
            password: "Contraseña",
            role: "Nivel de acceso",
            cancelButton: "Hecho"
        },
        errorInput: {
            name: "El nombre es obligatorio",
            email: "El correo electrónico es obligatorio",
            password: "La contraseña es obligatoria",
            weakPassword: "La contraseña debe tener al menos 8 caracteres",
            invalidEmail: "Correo electrónico inválido",
            invalidRole: "El nivel de acceso es obligatorio"
        }
    },
    excludeModal: {
        text: "¿Está seguro de que desea eliminar esto?",
        yesButton: "Sí",
        noButton: "No"
    },
    confirmModal: {
        yesButton: "Sí",
        noButton: "No",
        text: "¿Está seguro de que desea editar esto?",
    },


    renters: {
        headerTitle: "Arrendatarios",
        table: {
            tableTitle: "Lista de arrendatarios",
            name: "Nombre*",
            email: "Correo electrónico*",
            telephone: "Teléfono*",
            address: "Dirección*",
            cpf: "CPF*",
            actions: "Acciones"
        },
        createModal: {
            title: "Registrar nuevo arrendatario",
            name: "Nombre*",
            email: "Correo electrónico*",
            telephone: "Teléfono*",
            cpf: "CPF*",
            address: "Dirección*",
            registerButton: "Registrar",
            cancelButton: "Cancelar"
        },
        editModal: {
            title: "Editar arrendatario",
            name: "Nombre*",
            email: "Correo electrónico*",
            telephone: "Teléfono*",
            cpf: "CPF*",
            address: "Dirección*",
            registerButton: "Guardar",
            cancelButton: "Cancelar",
        },
        viewModal: {
            title: "Detalles del arrendatario",
            id: "ID",
            name: "Nombre",
            email: "Correo electrónico",
            telephone: "Teléfono",
            cpf: "CPF",
            address: "Dirección",
            cancelButton: "Hecho"
        },
        errorInput: {
            name: "El nombre es obligatorio",
            email: "El correo electrónico es obligatorio",
            telephone: "El teléfono es obligatorio",
            cpf: "El CPF es obligatorio",
            address: "La dirección es obligatoria",
            invalidEmail: "Correo electrónico inválido",
            invalidTelephone: "Teléfono inválido",
            invalidCpf: "CPF inválido"
        },
    },


    publishers: {
        headerTitle: "Editoriales",
        table: {
            tableTitle: "Lista de editoriales",
            name: "Nombre*",
            email: "Correo electrónico*",
            telephone: "Teléfono*",
            site: "Sitio web",
            actions: "Acciones"
        },
        createModal: {
            title: "Registrar nuevo editorial",
            name: "Nombre*",
            email: "Correo electrónico*",
            telephone: "Teléfono*",
            site: "Sitio web",
            registerButton: "Registrar",
            cancelButton: "Cancelar"
        },
        editModal: {
            title: "Editar editorial",
            name: "Nombre*",
            email: "Correo electrónico*",
            telephone: "Teléfono*",
            site: "Sitio web",
            registerButton: "Actualizar",
            cancelButton: "Cancelar",
        },
        errorInput: {
            name: "El nombre es obligatorio",
            email: "El correo electrónico es obligatorio",
            telephone: "El teléfono es obligatorio",
            invalidEmail: "Correo electrónico inválido",
            invalidTelephone: "Teléfono inválido",
            invalidSite: "Sitio web inválido"
        }
    },
    errorDuplicate: "Este campo ya existe. Por favor, utilice un valor diferente.",
    roleUser: "Usuario",
    roleAdmin: "Administrador",
    avatarButton: "Establecer avatar",
    errorTooLarge: "El campo debe tener entre 3 y 50 caracteres",

    toasts: {
        success: {
            postSuccess: "¡Registro realizado con éxito!",
            deleteSuccess: "¡Eliminación realizada con éxito!",
            putSuccess: "¡Actualización realizada con éxito!",
            finishRent: "¡Devolución realizada con éxito!",
        },
        error: {
            getError: "¡Error al obtener los datos!",

            deleteErrorPublishers: "¡Error durante la eliminación! Verifique si no hay libros vinculados.",
            deleteError: "¡Error durante la eliminación!",

            deleteErrorOwnUser: "¡No puedes eliminar el usuario que está en uso!",

            deleteErrorRenters: "¡Error durante la eliminación! Verifique si este arrendatario tiene alquileres activos.",

            postError: "¡Error durante el registro!",
            putError: "¡Error durante la actualización!",

            postErrorRent: "¡Error! Verifica si el inquilino tiene retrasos.",

            postErrorCpf: "¡Error durante el registro! Verifique si el CPF es válido.",
            putErrorCpf: "¡Error durante la actualización! Verifique si el CPF es válido.",
            errorFinishRent: "Error al realizar la devolución.",

            deleteErrorBook: "¡Error al eliminar! Verifique si este libro tiene alquileres activos."
        },
    },

    monthLabel: "Meses:"
}