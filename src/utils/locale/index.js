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
                    label_client: "Coordonnée client",
                    label_company: "Informations compagnie",
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
                    add_client: "Register new customer",
                    label_client: "Customer profile",
                    label_company: "Company profile",
                    label_assets: "Photo / Documents"
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
                    country: 'Country'
                },
                helperText: {
                    phone_code: "Please select country code"
                }
            }
        },
}

export default Locale;