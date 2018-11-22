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
                name: "Contacts",
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
                register: "S'enregistrer",
                login: "Se connecter",
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
            text: {
                address: "Adresse",
                company: "Société",
                represented_by: "Représente par"
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
                    password: 'Mot de passe',
                    firstname: "Prénom",
                    lastname: "Nom",
                    company_register: "Siret",
                    company_vat: "TVA",
                    company_name: "Nom de société",
                    company_line_code: "Code pays",
                    company_line: "Ligne standard",
                    phone_code: 'Code pays',
                    phone: "Téléphone",
                    email: "Couriel",
                    company: "Société",
                    register: "Siret",
                    vat: 'TVA',
                    addresses_street: "Adresse", 
                    addresses_zip: "Code postal", 
                    addresses_city: "Ville", 
                    addresses_country: "Pays", 

                    product_name: "Nom du produit",


                    service_name: "Nom du service",
                    service_description: "Déscription",
                    service_price: "Prix",
                    service_note: "Information interne",

                    expense_name: "Nom de la depense",
                    description: "Description",
                    price: "Prix"
                    
                },
                helperText: {
                    select_phone_code: "Sélectionner le code pays",
                    select_country_code: "Sélectionner pays"
                }
            },
            message: {
                success_create: "Felicitation",
                success_update: "Mise à jour avec succes",

                error_create: "Error create",
                error_update: "Error update",
                error_sent: "Email non envoyer",
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
                register: "Sign Up",
                login: 'Sign In',
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
            text: {
                address: "Address",
                represented_by: "Represented by"
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
                    password: 'Password',
                    firstname: "Firstname",
                    lastname: "Lastname",
                    company_name: "Company name",
                    company_register: "Register number",
                    company_vat: "VAT",
                    company_line_code: "Country code",
                    company_line: "Land line",
                    addresses_street: "Address", 
                    addresses_zip: "Zip", 
                    addresses_city: "City", 
                    addresses_country: "Country", 
                    phone_code: 'Country code',
                    phone: "Phone",
                    email: "Email",
                    company: "Company",
                    register: "Register number",
                    vat: 'VAT',
                    product_name: "Product name",
                    service_name: "Service name",
                    service_description: "Description",
                    service_price: "Price",
                    service_note: "Sales informations",


                    expense_name: "Expense name",
                    description: "Description",
                    price: "Price"
                },
                helperText: {
                    select_phone_code: "Please select country code",
                    select_country_code: "Please select a country"
                }
            },
            message: {
                success_create: "Congratulation",
                success_update: "Updated !",
                
                error_create: "Error ",
                error_update: "Error update",
                error_sent: "Email has not neen sent",
            }
        },
}

export default Locale;