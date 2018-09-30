//manager/src/utils/locales/index.js



const Locale = {
    fr: 
        {
            lang: "fr",
            home:{
                name: "Accueil",
                url: "accueil"
            },
            contact:{
                name: "contacts",
                url: "contact"
            },
            service_provider:{
                name: "Prestataire",
                url: "contact"
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
                add_contact: "Ajouter un contact",
                add_product: "Ajouter un produit",
                add_service: "Ajouter un service",
                add_expense: "Ajouter une depense",
                add_provider: "Ajouter un prestataire",
                return_list: "Retour à la liste",
                save: "Enregistrer",
                edit: 'Editer',
                update: "Mettre à jour",
                upload: "téléverser"
            },
            page: {
                contact: {
                    table: ['Société', 'Téléphone', 'Email']
                }
            },
            form: {
                title: {
                    add_contact: "Enregistrer un nouveau contact",
                    add_product: "Enregistrer un nouveau produit",
                    add_service: "Enregistrer un service",
                    add_expense: "Enregistrer une depense",
                    add_provider: "Enregistrer un prestataire",
                    label_contact: "Coordonnée contact",
                    label_company: "Informations compagnie",
                    label_product: "Informations produit",
                    label_service: "Informations service",
                    label_expense: "Informations depense",
                    label_provider: "Informations prestataire",
                    label_assets: "Photo / Documents",                    
                },
                field: {
                    firstname: "Prénom",
                    lastname: "Nom",
                    company_name: "Nom de société",
                    phone_code: 'Code pays',
                    phone: "Téléphone",
                    email: "Couriel",
                    company: "Société",
                    register: "Siret",
                    vat: 'TVA',
                    _street: 'Adresse',
                    _zip: "Code postal",
                    _city: 'Ville',
                    _country: 'Pays',
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
            contact:{
                name: "Customers",
                url: "contact"
            },
            service_provider:{
                name: "Service provider",
                url: "contact"
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
                add_contact: "Add customer",
                add_product: "Add product",
                add_service: "Add service",
                add_expense: "Add expense",
                add_provider: "Add provider",
                return_list: "Back to list",
                save: "Save",
                edit: 'Edit',
                update: "Update",
                upload: "Upload"
            },
            page: {
                contact: {
                    table: ['Société', 'Téléphone', 'Email']
                }
            },
            form: {
                title: {
                    add_contact: "Add a new customer",
                    add_product: "Add a new produit",
                    add_service: "Add service",
                    add_expense: "Add expense",
                    add_provider: "Add provider",
                    label_contact: "Customer profile",
                    label_company: "Company profile",
                    label_assets: "Photo / Documents",
                    label_product: "Product details",
                    label_service: "Service details",
                    label_expense: "Expense detail",
                    label_provider: "Service provider detail",
                },
                field: {
                    firstname: "Firstname",
                    lastname: "Lastname",
                    company_name: "Company name",
                    phone_code: 'Country code',
                    phone: "Phone",
                    email: "Email",
                    company: "Company",
                    register: "Register number",
                    vat: 'TVA',
                    _address: 'Street',
                    _zip: 'Zip',
                    _city: 'City',
                    _country: 'Country',
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