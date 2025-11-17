

export default {
    login: {
        bookRental: 'Locadora de Livros',
        welcome: 'Bem-vindo(a) de volta!',
        title: 'Login',
        email: 'Email',
        password: 'Senha',
        button: 'Entrar',
        forgotPassword: 'Esqueceu a senha?',
        hints: {
            email: "Email do usuário",
            password: "Senha do usuário",
            errorEmail: "Por favor insira seu email",
            errorPassword: "Por favor insira sua senha",
            alert: "Algo deu errado..."
        }
    },


    forgotPassword: {
        bookRental: 'Locadora de Livros',
        forgotPasswordTitle: 'Esqueceu a senha?',
        title: "Recuperar senha",
        email: "Email",
        button: "Continuar",
        buttonBack: "Voltar"
    },


    sideBar: {
        dashboard: "Dashboard",
        library: "Biblioteca",
        rents: "Aluguéis",
        users: "Usuários",
        renters: "Locatários",
        publishers: "Editoras",
        logout: "Sair",
        header: "Locadora de Livros"
    },


    dashboard: {
        headerTitle: "Dashboard",
        rentsChart: "Aluguéis (mensal)",
        top3Chart: "Top 3 livros mais alugados",
        publishersBooksRenters: "Editoras, livros e locatários cadastrados",
        numberOfUsers: "Número de usuários:",
        numberOfAdmins: "Número de administradores:",
        chart: {
            rented: "Alugados",
            late: "Atrasados",
            onTime: "Devolvidos no prazo",
            returnedLate: "Devolvidos com atraso",
            publishers: "Editoras",
            books: "Livros",
            renters: "Locatários"
        },
        table: {
            tableTitle: "Relatório de locatários",
            renters: "Locatários",
            rentsQuantity: "Total de aluguéis",
            rentsActive: "Aluguéis ativos",
        }
    },


    tables: {
        noData: "Sem registros disponíveis...",
        rowsPerPage: "Linhas por página",
        of: "de",
        loading: "Carregando..."
    },


    library: {
        headerTitle: "Biblioteca",
        table: {
            tableTitle: "Acervo atual",
            name: "Nome*",
            author: "Autor*",
            launchDate: "Data de lançamento*",
            totalQuantity: "Estoque*",
            totalInUse: "Alugados*",
            publisher: "Editora*",
            actions: "Ações"
        },
        createModal: {
            title: "Cadastrar Livro",
            name: "Nome*",
            author: "Autor*",
            totalQuantity: "Estoque*",
            publisher: "Editora*",
            launchDate: "Data de lançamento*",
            registerButton: "Cadastrar",
            cancelButton: "Cancelar"
        },
        editModal: {
            title: "Editar livro",
            name: "Nome",
            author: "Autor",
            totalQuantity: "Estoque",
            publisher: "Editora",
            launchDate: "Data de lançamento",
            registerButton: "Salvar",
            cancelButton: "Cancelar",
        },
        errorInput: {
            name: "O nome é obrigatório",
            author: "O autor é obrigatório",
            totalQuantity: "O estoque é obrigatório",
            publisher: "A editora é obrigatória",
            launchDate: "A data de lançamento é obrigatória",
            invalidLaunchDate: "A data de lançamento não pode ser futura"
        }
    },


    search: {
        searchBar: "Pesquisar",
        createButton: " + Criar"
    },


    rents: {
        headerTitle: "Aluguéis",
        table: {
            tableTitle: "Relação de aluguéis",
            book: "Livro*",
            renter: "Locatário*",
            rentDate: "Data de locação*",
            deadLine: "Data de devolução*",
            status: "Status*",
            actions: "Ações"
        },
        createModal: {
            title: "Cadastrar aluguel",
            book: "Livro*",
            renter: "Locatário*",
            deadLine: "Data de devolução*",
            registerButton: "Cadastrar",
            cancelButton: "Cancelar"
        },
        editModal: {
            title: "Editar aluguel",
            book: "Livro*",
            renter: "Locatário*",
            deadLine: "Data de devolução*",
            registerButton: "Atualizar",
            cancelButton: "Cancelar",
            returnModal: {
                yesButton: "Sim",
                noButton: "Não",
                text: "Você tem certeza de que deseja realizar a devolução? ",
            }
        },
        status: {
            RENTED: "Alugado",
            IN_TIME: "Devolvido no prazo",
            LATE: "Atrasado",
            DELIVERED_WITH_DELAY: "Devolvido com atraso"
        },
        errorInput: {
            book: "O livro é obrigatório",
            renter: "O locatário é obrigatório",
            deadLine: "A data de devolução é obrigatória",
            invalidDeadLine: "A data de devolução deve ser futura",
            tooFarDeadLine: "O prazo máximo é de 30 dias"
        }
    },


    users: {
        headerTitle: "Usuários",
        table: {
            tableTitle: "Relação de Usuários",
            name: "Nome*",
            email: "Email*",
            role: "Nível de acesso*",
            actions: "Ações"
        },
        createModal: {
            title: "Cadastrar novo usuário",
            name: "Nome*",
            email: "Email*",
            password: "Senha*",
            admin: "Administrador",
            user: "Usuário",
            registerButton: "Cadastrar",
            cancelButton: "Cancelar"
        },
        editModal: {
            title: "Editar usuário",
            name: "Nome*",
            email: "Email*",
            password: "Senha*",
            admin: "Administrador",
            user: "Usuário",
            registerButton: "Atualizar",
            cancelButton: "Cancelar"
        },
        viewModal: {
            title: "Detalhes do usuário",
            id: "ID",
            name: "Nome",
            email: "Email",
            password: "Senha",
            role: "Nível de acesso",
            cancelButton: "Fechar"
        },
        errorInput: {
            name: "O nome é obrigatório",
            email: "O email é obrigatório",
            password: "A senha é obrigatória",
            weakPassword: "A senha deve ter no mínimo 8 caracteres",
            invalidEmail: "Email inválido",
            invalidRole: "O nível de acesso é obrigatório"
        }
    },


    excludeModal: {
        text: "Você tem certeza de que deseja realizar a exclusão?",
        yesButton: "Sim",
        noButton: "Não"
    },


    confirmModal: {
        yesButton: "Sim",
        noButton: "Não",
        text: "Você tem certeza de que deseja realizar a edição?",
    },


    renters: {
        headerTitle: "Locatários",
        table: {
            tableTitle: "Relação de Locatários",
            name: "Nome*",
            email: "Email*",
            telephone: "Telefone*",
            address: "Endereço*",
            cpf: "CPF*",
            actions: "Ações"
        },
        createModal: {
            title: "Cadastrar novo locatário",
            name: "Nome*",
            email: "Email*",
            telephone: "Telefone*",
            cpf: "CPF*",
            address: "Endereço*",
            registerButton: "Cadastrar",
            cancelButton: "Cancelar"
        },
        editModal: {
            title: "Editar locatário",
            name: "Nome*",
            email: "Email*",
            telephone: "Telefone*",
            cpf: "CPF*",
            address: "Endereço*",
            registerButton: "Atualizar",
            cancelButton: "Cancelar",
        },
        viewModal: {
            title: "Detalhes do Locatário",
            id: "ID",
            name: "Nome",
            email: "Email",
            telephone: "Telefone",
            cpf: "CPF",
            address: "Endereço",
            cancelButton: "Fechar"
        },
        errorInput: {
            name: "O nome é obrigatório",
            email: "O email é obrigatório",
            telephone: "O telefone é obrigatório",
            cpf: "O CPF é obrigatório",
            invalidEmail: "Email inválido",
            invalidTelephone: "Telefone inválido",
            invalidCpf: "CPF inválido",
            address: "O endereço é obrigatório"
        }
    },

    publishers: {
        headerTitle: "Editoras",
        table: {
            tableTitle: "Relação de Editoras",
            name: "Nome",
            email: "Email",
            telephone: "Telefone",
            site: "Site",
            actions: "Ações"
        },
        createModal: {
            title: "Cadastrar nova editora",
            name: "Nome*",
            email: "Email*",
            telephone: "Telefone*",
            site: "Site",
            registerButton: "Cadastrar",
            cancelButton: "Cancelar"
        },
        editModal: {
            title: "Editar editora",
            name: "Nome*",
            email: "Email*",
            telephone: "Telefone*",
            site: "Site",
            registerButton: "Atualizar",
            cancelButton: "Cancelar",
        },
        errorInput: {
            name: "O nome é obrigatório",
            email: "O email é obrigatório",
            telephone: "O telefone é obrigatório",
            invalidEmail: "Email inválido",
            invalidTelephone: "Telefone inválido",
            invalidSite: "Site inválido"
        } 
    },
    errorDuplicate: "Este campo já existe. Por favor, utilize um valor diferente.",
    roleUser: "Usuário",
    roleAdmin: "Administrador",
    avatarButton: "Mudar Avatar",
    errorTooLarge: "O campo deve ter entre 3 e 60 caracteres",

    toasts: {
        success: {
            postSuccess: "Cadastro realizado com sucesso!",
            deleteSuccess: "Exclusão realizada com sucesso!",
            putSuccess: "Atualização realizada com sucesso!",
            finishRent: "Devolução realizada com sucesso!"
        },
        error: {
            getError: "Erro ao obter os dados!",

            deleteErrorPublishers: "Erro ao realizar exclusão! Verifique se não existem livros vinculados.",

            deleteErrorOwnUser: "Você não pode excluir a si mesmo!",

            deleteErrorRenters: "Erro ao realizar exclusão! Verifique se este locatário possui aluguéis ativos.",
            deleteError: "Erro ao realizar exclusão!",
            putError: "Erro ao realizar atualização!",
            postError: "Erro ao realizar cadastro!",

            postErrorRent: "Erro! Verifique se o locatário não possui atrasos!",
            
            postErrorCpf: "Erro ao realizar cadastro! Verifique se o CPF é válido.",
            putErrorCpf: "Erro ao realizar atualização! Verifique se o CPF é válido.",

            errorFinishRent: "Erro ao realizar a devolução.",

            deleteErrorBook: "Erro ao deletar! Verifique se este livro não possui aluguéis ativos."
        }
        
    },
    monthLabel: "Meses:"
}