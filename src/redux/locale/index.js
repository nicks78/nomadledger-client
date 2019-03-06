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
            bookkeeping: {
                name: "Compta",
                url: "compta"
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
            archive:{
                name: "Archive",
                url: "archive"
            },
            button: {
                add_contact: "Ajouter un contact",
                add_product: "Ajouter un produit",
                add_service: "Ajouter un service",
                add_expense: "Ajouter une depense",
                add_provider: "Ajouter un prestataire",
                add_task: "Ajouter une tache",
                register: "S'enregistrer",
                login: "Se connecter",
                return_list: "Retour à la liste",
                save: "Enregistrer",
                edit: 'Editer',
                update: "Mettre à jour",
                updating: "En cours...",
                upload: "téléverser",
                add_quote: "Créer un devis",
                add_invoice: "Créer une facture",
                add_payback: "Créer un avoir",
                loading: "Chargement...",
                continue_edit: "En cours..."
            },
            page: {
                contact: {
                    table: ['Société', 'Téléphone', 'Email']
                },
                header_01: "Information profil",
                header_02: "Paramètres société",
                
                service: "Vos services",
                product: {
                    load_more_product: "Voir plus de produit"
                },
                quote: {
                    items: "Selectionner un service/produit",
                    info_comp: "Informations complementaires"
                },
                account: {
                    title_1: "Configuré mon App",
                    title_2: "Mes groupes de contacts",
                    title_3: "Mes catégories",
                    title_4: "Mes TVA"
                },
            },
            text: {
                address: "Adresse",
                company: "Société",
                represented_by: "Représente par",
                selected: "sélectionner",
                markdown: "Simple editeur de text pour vos devis"
            },
            form: {
                title: {
                    add_contact: "Enregistrer un nouveau contact",
                    add_product: "Enregistrer un nouveau produit",
                    add_service: "Enregistrer un service",
                    add_expense: "Enregistrer une depense",
                    add_task: "Ajouter une tache",
                    add_provider: "Enregistrer un prestataire",
                    new_quote: "Créer Nouveau Devis",
                    new_invoice: "Créer Nouvelle Facture",
                    new_payback: "Créer Nouvelle Avoir",
                    edit_quote: "Editer Devis",
                    edit_invoice: "Editer Facture",
                    edit_payback: "Editer Avoir",
                    label_contact: "Coordonnée contact",
                    label_company: "Informations compagnie",
                    label_product: "Informations produit",
                    label_service: "Informations service",
                    label_expense: "Informations depense",
                    label_task: "Informations task",
                    label_provider: "Informations prestataire",
                    label_assets: "Photo / Documents",  
                    label_currency_fav: "Votre devise",
                    label_comp_info: "Compagnie information",
                    label_contact_info: "Contact information",
                    label_comp_address: "Compagnie adresse", 
                    label_other: "Autres",
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
                    line_code: 'Code pays',
                    land_line: "Ligne fixe",
                    email: "Couriel",
                    company: "Société",
                    register: "Siret",
                    vat: 'TVA',
                    addresses_street: "Adresse", 
                    addresses_zip: "Code postal", 
                    addresses_city: "Ville", 
                    addresses_country: "Pays", 
                    num_format: "Format des chiffres",
                    receipt_date: "Date du reçu",

                    contact_group: "Groupe",
                    contact_drop: "Client",
                    marg: "Marge",

                    name: "Nom",
                    description: "Déscription",
                    category: "Catégorie",
                    buying_price: "Prix d'achat",
                    selling_price: "Prix de vente",
                    price: "Prix",
                    currency: "Devise",
                    stock: "En stock",
                    receipt: "Reçu",
                    due_date: "Date due",
                    subject: "Sujet",
                    status: "Statut",
                    short_desc: "A faire...",

                    notes: "Information interne",

                    add_category: "Ajouter une Categorie",
                    add_group: "Ajouter un group",
                    add_vat: "Taux TVA",

                    expired_at: "Valide jusqu'au",
                    created_at: "Créer le",
                    due_at: "Dû le",
                    contact_id: "Société",

                    textarea_quote: "Taper une déscription de votre devis",
                    search_service: "Rechercher un service",
                    search_product: "Rechercher un produit",
                    search_contact: "Rechercher un contact",
                    
                },
                helperText: {
                    select_phone_code: "Sélectionner le code pays",
                    select_country_code: "Sélectionner pays",
                    select_service_type: "Sélectionner le type de service",
                    select_num_format: "Selectionner format des chiffres",
                    select_category: "Sélectionner une catégorie",
                    select_contact: "Sélectionner un client",
                    select_contact_group: "Sélectionner un group"
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
                error_400: "Champs marqué avec une * sont obligatoire",
                error_404: "Not found",
                error_422: "Doit être un chiffre (49.48 or 49,48)",
                error_422_email_format: "Mauvais format d'email",
                error_membership_end: "Périod d'essai est finis",
                error_409: "Email déja existant",
                error_wrong_token: "error wrong token",
                error_no_token: "error no token",
                error_file_not_allowed: "File type not allowed",

                alert_password_not_match: "Mots de passe ne correspondent pas",
                phone_required: "Mobile obligatoire",
            },
            table: {
                title_service: "Service",
                title_contact: "Contact",
                title_expense: "Depense",
                title_invoice: "Facture",
                title_quote: "Devis",
                title_payback: "Avoir",
                price: "Prix",
                description: "Déscription",
                category: "Catégorie",
                service_name: "Nom du service",
                product_name: "Nom du produit",
                service: "SERVICE",
                product: "PRODUIT",
                total: "Total",
                vat: "TVA",
                quantity: "Quantité",
                label_rows_per_page: "Colonnes par page:",
                full_name: "Nom complet",
                phone: "Téléphone",
                email: "Couriel",
                company: "Société",
                of: "à",
                selected: "sélectionner",
                group: "Groupe",
                receipt: "Reçu",
                expense_name: "Nom",
                date: "Date",
                name: "Nom",
                ref: "Référence",
                incl: "inclus",
                subtotal :  "Total HT",
                total_ttc: "Total TTC",
                unit_price: "Prix unitaire",
                discount: "Remise",
                remove: "Supprimer",
                draft: "Brouillon",
                pending: 'En attente',
                approved: 'Approuvé',
                rejected: "Rejeté",
                paid: "Payée",
                all: "Tous",
                reference: "Référence",
                client: "Client",
                currency: "Devise",
                status: "Statut",
                inv: "FAC",
                qto: "DEV",
                pya: "AVO",
            },
            days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
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
            bookkeeping: {
                name: "Bookkeeping",
                url: "bookkeeping"
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
                name: "Quotes",
                url: "quotes"
            },
            payback:{
                name: "Payback",
                url: "payback"
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
            archive:{
                name: "Archive",
                url: "archive"
            },
            button: {
                add_contact: "Add customer",
                add_product: "Add product",
                add_service: "Add service",
                add_expense: "Add expense",
                add_provider: "Add provider",
                add_task: "Add task",
                register: "Sign Up",
                login: 'Sign In',
                return_list: "Back to list",
                save: "Save",
                edit: 'Edit',
                update: "Update",
                updating: "Updating...",
                upload: "Upload",
                add_quote: "Create quote",
                add_invoice: "Create invoice",
                add_payback: "Create payback",
                loading: "Loading...",
                continue_edit: "Continue editing..."
            },
            page: {
                contact: {
                    table: ['Société', 'Téléphone', 'Email']
                },
                header_01: "Information profile",
                header_02: "Company setting",
                service: "Your services",
                product: {
                    load_more_product: "Load more product"
                },
                quote: {
                    items: "Select a product or service",
                    info_comp: "Work description"
                },
                account: {
                    title_1: "Configure My App",
                    title_2: "My contact group",
                    title_3: "My categories",
                    title_4: "My VAT"
                },
            },
            text: {
                address: "Address",
                company: "Company",
                represented_by: "Represented by",
                selected: "selected",
                markdown: "Markdown editor"
            },
            form: {
                title: {
                    add_contact: "Add a new customer",
                    add_product: "Add a new produit",
                    add_service: "Add service",
                    add_expense: "Add expense",
                    add_task: "Add task",
                    add_provider: "Add provider",
                    new_quote: "Create New Quotation",
                    new_invoice: "Create New Invoice",
                    new_payback: "Create New Payback",
                    edit_quote: "Edit Quotation",
                    edit_invoice: "Edit invoice",
                    edit_payback: "Edit payback",
                    label_contact: "Customer profile",
                    label_company: "Company profile",
                    label_assets: "Photo / Documents",
                    label_product: "Product details",
                    label_service: "Service details",
                    label_expense: "Expense detail",
                    label_provider: "Service provider detail",
                    label_comp_info: "Compagnie information",
                    label_contact_info: "Contact information",
                    label_comp_address: "Compagnie adresse", 
                    label_currency_fav: "Favorite currency",
                    label_other: "Others",
                    label_tax: "Tax year",
                    label_start_tax: "Start",
                    label_end_tax: "End"
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
                    line_code: 'Country code',
                    land_line: "Land line",
                    phone: "Phone",
                    num_format: "Number format",
                    email: "Email",
                    company: "Company",
                    register: "Register number",
                    vat: 'VAT',
                    marg: "Marge",
                    
                    contact_group: "Group",
                    contact_drop: "Client",

                    name: "Product name",
                    description: "Description",
                    category: "Catégory",
                    price: "Price",
                    buying_price: "Buying price",
                    selling_price: "Selling price",
                    currency: "Currency",
                    stock: "In stock",
                    notes: "Sales informations",
                    receipt: "Receipt",
                    receipt_date: "Receipt date",

                    due_date: "Due date",
                    subject: "Subject",
                    short_desc: "To do...",
                    status: "Status",

                    add_category: "Add category",
                    add_group: "Add a group",
                    add_vat: "Value VAT",
                    name_vat: "VAT name",

                    expired_at: "Expired at",
                    created_at: "Create at",
                    due_at: "Due at",
                    contact_id: "Company",

                    textarea_quote: "Type a description of your work",
                    search_service: "Type to search a service",
                    search_product: "Type to search a produit",
                    search_contact: "Type to search a contact",
                },
                helperText: {
                    select_phone_code: "Please select country code",
                    select_country_code: "Please select a country",
                    select_service_type: "Select service type",
                    select_num_format: "Select num format",
                    select_category: "Select a category",
                    select_contact: "Select a client",
                    select_contact_group: "Select a group"
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
                error_400: "Fields marked with * are mandatory",
                error_404: "Not found",
                error_422: "Must be a number (49.48 or 49,48)",
                error_409: "Duplicate email",
                error_422_email_format: "Wrong email format",
                error_wrong_token: "error wrong token",
                error_no_token: "error no token",
                error_file_not_allowed: "File type not allowed",
                error_membership_end: "Trial period is over !",
                alert_password_not_match: "Password not match",
                phone_required: "Phone required",
            },
            table: {
                title_service: "Service",
                selected: "selected",
                title_contact: "Contact",
                title_expense: "Expense",
                title_invoice: "Invoice",
                title_quote: "Quote",
                title_payback: "Payback",
                price: "Price",
                description: "Description",
                category: "Category",
                service_name: "Service name",
                product_name: "Product name",
                service: "SERVICE",
                product: "PRODUCT",
                total: "Total",
                vat: "VAT",
                quantity: "Quantity",
                label_rows_per_page: "Rows per page:",
                full_name: "Full name",
                phone: "Phone",
                email: "Email",
                company: "Company",
                of: "of",
                group: "Group",
                receipt: "Receipt",
                date: "Date",
                expense_name: "Name",
                ref: "Reference",
                name: "Name",
                incl: "incl",
                subtotal:  "Subtotal",
                total_ttc: "Total incl VAT",
                unit_price: "Unit price",
                discount: "Discount",
                remove: "Remove",
                draft: "Draft",
                pending: 'Pending',
                approved: 'Approved',
                rejected: "Rejected",
                paid: "Paid",
                all: "All",
                reference: "Reference",
                client: "Client",
                currency: "Currency",
                status: "Status",
                inv: "INV",
                qto: "QTO",
                pya: "PAY",
            },
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months: [""]
        },
}

export default Locale;