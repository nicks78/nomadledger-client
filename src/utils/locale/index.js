//manager/src/utils/locales/index.js



const Locale = {
    fr: 
        {
            lang: "fr",
            home:{
                name: "Accueil",
                url: "accueil"
            },
            client:{
                name: "Clients",
                url: "client"
            },
            invoice:{
                name: "Factures",
                url: "factures"
            },
            quote:{
                name: "Devis",
                url: "factures"
            },
            payback:{
                name: "Avoirs",
                url: "factures"
            },
            product:{
                name: "Produits",
                url: "factures"
            },
            service:{
                name: "Services",
                url: "factures"
            },
            expense:{
                name: "Depense",
                url: "factures"
            },
            vat:{
                name: "tva",
                url: "factures"
            },
            button: {
                add_client: "Ajouter un client",
                add_product: "Ajouter un produit",
                add_service: "Ajouter un service",
                add_expense: "Ajouter une depense",
                return_list: "Retour à la liste",
                save: "Enregistrer",
                edit: 'Editer',
                update: "Mettre à jour",
                upload: "téléverser"
            },
            page: {
                client: {
                    table: ['Société', 'Téléphone', 'Email']
                }
            },
            form: {
                title: {
                    add_client: "Enregistrer un nouveau client",
                    add_product: "Enregistrer un nouveau produit",
                    add_service: "Enregistrer un service",
                    add_expense: "Enregistrer une depense",
                    label_client: "Coordonnée client",
                    label_company: "Informations compagnie",
                    label_product: "Informations produit",
                    label_service: "Informations service",
                    label_expense: "Informations depense",
                    label_assets: "Photo / Documents",                    
                },
                field: {
                    firstname: "Prénom",
                    lastname: "Nom",
                    phone_code: 'Code pays',
                    phone: "Téléphone",
                    email: "Couriel",
                    company: "Société",
                    register: "Siret",
                    vat: 'TVA',
                    address: 'Adresse',
                    zip: "Code postal",
                    city: 'Ville',
                    country: 'Pays',
                    product_name: "Nom du produit",
                    service_name: "Nom du service",
                    expense_name: "Nom de la depense",
                    description: "Description",
                    price: "Prix"
                    
                },
                helperText: {
                    phone_code: "Sélectionner le code pays"
                }
            }
        },
    en: 
        {
            lang: "en",
            home:{
                name: "Home",
                url: "home"
            },
            client:{
                name: "Customers",
                url: "client"
            },
            invoice:{
                name: "Invoices",
                url: "invoices"
            },
            quote:{
                name: "Quotation",
                url: "factures"
            },
            payback:{
                name: "Payback",
                url: "factures"
            },
            product:{
                name: "Products",
                url: "factures"
            },
            service:{
                name: "Services",
                url: "factures"
            },
            expense:{
                name: "Expenses",
                url: "factures"
            },
            vat:{
                name: "vat",
                url: "factures"
            },
            button: {
                add_client: "Add customer",
                add_product: "Add product",
                add_service: "Add service",
                return_list: "Back to list",
                save: "Save",
                edit: 'Edit',
                update: "Update",
                upload: "Upload"
            },
            page: {
                client: {
                    table: ['Société', 'Téléphone', 'Email']
                }
            },
            form: {
                title: {
                    add_client: "Add a new customer",
                    add_product: "Add a new produit",
                    add_service: "Add service",
                    add_expense: "Add expense",
                    label_client: "Customer profile",
                    label_company: "Company profile",
                    label_assets: "Photo / Documents",
                    label_product: "Product details",
                    label_service: "Service details",
                    label_expense: "Expense detail"
                },
                field: {
                    firstname: "Firstname",
                    lastname: "Lastname",
                    phone_code: 'Country code',
                    phone: "Phone",
                    email: "Email",
                    company: "Company",
                    register: "Register number",
                    vat: 'TVA',
                    address: 'Address',
                    zip: 'Zip',
                    city: 'City',
                    country: 'Country',
                    product_name: "Product name",
                    service_name: "Service name",
                    expense_name: "Expense name",
                    description: "Description",
                    price: "Price"
                },
                helperText: {
                    phone_code: "Please select country code"
                }
            }
        },
}

export default Locale;