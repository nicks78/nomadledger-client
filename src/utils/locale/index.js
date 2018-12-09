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
                name: "Tva",
                url: "factures"
            },
            task:{
                name: "Tache",
                url: "tache"
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
                },
                header_01: "Information profil",
                header_02: "Paramètres société"
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
                    label_tax: "Année fiscale",
                    label_start_tax: "Debut",
                    label_end_tax: "Fin",              
                },
                field: {
                    password: 'Mot de passe',
                    password_confirm: 'Confirme mot de passe',
                    firstname: "Prénom",
                    lastname: "Nom",
                    company_register: "Siret",
                    company_vat: "TVA",
                    company_name: "Nom de société",
                    company_line_code: "Code pays",
                    company_line: "Ligne standard",
                    company_type: "Type de société",  
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
                    num_format: "Format des chiffres",

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
                    select_country_code: "Sélectionner pays",
                    select_service_type: "Sélectionner le type de service",
                    select_num_format: "Selectionner format des chiffres"
                }
            },
            message: {
                success_create: "Felicitation !",
                success_update: "Mise à jour avec succes",
                success_sent: "Email envoye",

                error_create: "Error create",
                error_update: "Error update",
                error_sent: "Email non envoyer",
                error_user_not_found: "user_not_found",
                error_wrong_password: "Mot de passe incorrect",
                error_500: "mauvaise requete",
                error_400: "error 400",
                error_wrong_token: "error wrong token",
                error_no_token: "error no token",

                alert_password_not_match: "Mots de passe ne correspondent pas"
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
                name: "Vat",
                url: "factures"
            },
            task:{
                name: "Task",
                url: "tache"
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
                },
                header_01: "Information profile",
                header_02: "Company setting"
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
                    label_tax: "Tax year",
                    label_start_tax: "Start",
                    label_end_tax: "End",
                },
                field: {
                    password: 'Password',
                    password_confirm: 'Confirm password',
                    firstname: "Firstname",
                    lastname: "Lastname",
                    company_name: "Company name",
                    company_register: "Register number",
                    company_vat: "VAT",
                    company_line_code: "Country code",
                    company_line: "Land line",
                    company_type: "Company type", 
                    addresses_street: "Address", 
                    addresses_zip: "Zip", 
                    addresses_city: "City", 
                    addresses_country: "Country", 
                    phone_code: 'Country code',
                    phone: "Phone",
                    num_format: "Number format",
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
                    select_country_code: "Please select a country",
                    select_service_type: "Select service type",
                    select_num_format: "Select num format"
                }
            },
            message: {
                success_create: "Congratulation",
                success_update: "Updated !",
                success_sent: "Email envoye",
                
                error_create: "Error ",
                error_update: "Error update",
                error_sent: "Email has not neen sent",
                error_user_not_found: "User not found",
                error_wrong_password: "Wrong password",
                error_500: "bad request",
                error_400: "error 400",
                error_wrong_token: "error wrong token",
                error_no_token: "error no token",

                alert_password_not_match: "Password not match"
            }
        },
}

export default Locale;