// fr

const fr = {

    lang: "fr",
    company_name: `<strong style="color:#0c3c5e">Nomad</strong><span style="color:#01898c;font-weight: 400">Ledger</span>`,
    home: {
        name: "Tableau de bord",
        url: "/dashboard",
        h1: ""
    },
    contact: {
        name: "Contacts",
        url: "/contact",
        h1: ""
    },
    invoice: {
        name: "Factures",
        url: "/invoice",
        btn_create: "Creer une facture",
        h1: ""
    },
    quote: {
        name: "Devis",
        url: "/quote",
        btn_create: "Creer un devis",
        h1: ""
    },
    refund: {
        name: "Avoirs",
        url: "/refund",
        h1: ""
    },
    product: {
        name: "Produits",
        url: "/product",
        h1: ""
    },
    service: {
        name: "Services",
        url: "/service",
        h1: ""
    },
    expense: {
        name: "Dépenses",
        url: "/expense",
        h1: ""
    },
    task: {
        name: "Tâches",
        url: "/task",
        h1: ""
    },
    marketing: {
        name: "Marketing",
        h1: "Marketing",
        url: "/marketing",
        h3: "Accéder à "
    },
    coworking: {
        name: "Coworking",
        h1: "Coworking",
        url: "/coworking",
        h3: "Accéder à ",
        create_h1: "Partager un coworking space",
        create_subtitle: "En ajoutant des photos, vous confirmez que vous avez l'autorité légale pour partager les images et que vous reconnaissez que NomadLedger se réserve le droit de partager les images.",
        create_h2_form: "Informations général de l'espace de travail",
        create_h2_img: "Ajouter des images d'illustartion",
        create_h2_cmt: "Mettre un commentaire",
        create_h2_tags: "Tags",
        create_caption_tags: "Utilisez le tiret bas (_) pour un tag a multiple mots et tapez 'espace' pour valider",
        edit_h1: ""
    },
    archive: {
        name: "Archive",
        url: "/archive",
        h1: ""
    },
    template: {
        name: "Template",
        url: "/template",
        h1: "Utiliser nos exemples de documents",
        subtitle: `Vous pouvez nous envoyer vos exemples de contrat à
          l'adresse <a class="link" href="mailto:contact@nomadledger.com">contact@nomadledger.com</a>. Après validation de notre équipe, ils seront disponibles pour toute la communauté <strong>NomadLegder</strong>.`,
        rule: `Les documents sont fournis "en l’etat", sans aucune garantie, expresse ou implicite, y compris, mais sans s'y limiter,
         les garanties de qualité marchande, aptitude à un usage particulier et à l’absence de violation. En aucun cas, le les auteurs
         ou les titulaires de copyright sont responsables de toute réclamation, de dommages ou d'autres responsabilité,
         qu'il soit dans une action de contrat, de tort ou autrement, résultant de, hors ou en lien avec le documents ou l’utilisation
         ou d’autres transactions dans le documents.`
    },
    dashboard: {
        empty_stat: `Il semble que tu n'es pas encore de données.<br />Essaye de créer ta première facture !`,
        empty_quote: `Ou ton premier devis ?`
    },
    subheading: {
        info_profile: "Informations profil",
        param_company: "Configurer mon App",
        info_comp: "Informations complémentaires",
        contact_group: "Mes groupes de contacts",
        my_categories: "Mes catégories",
        my_vat: "Mes TVA",
        items: "Sélectionner un service ou produit",
        load_more_product: "Voir plus de produits",
        previous_task: "Taches précédente",
        add_contact: "Enregistrer un nouveau contact",
        add_product: "Enregistrer un nouveau produit",
        add_service: "Enregistrer un service",
        add_expense: "Enregistrer une dépense",
        add_task: "Ajouter une tâche",
        add_quote: "Créer un devis",
        add_invoice: "Créer une facture",
        add_refund: "Créer un avoir",
        edit_quote: "Editer le devis",
        edit_invoice: "Editer la facture",
        edit_refund: "Editer l'avoir",
        edit_tag: "Editer mon étiquette",
        label_contact: "Coordonnée contact",
        label_company: "Informations entreprise",
        label_product: "Informations produit",
        label_service: "Informations service",
        label_expense: "Informations dépense",
        label_task: "Informations tâche",
        label_provider: "Informations prestataire",
        label_assets: "Photo(s)",
        label_currency_fav: "Votre devise",
        label_comp_info: "Informations compagnie",
        label_comp_bank: "Informations bancaire",
        label_contact_info: "Informations contact",
        label_comp_address: "Adresse entreprise",
        label_annual_turnover: "Chiffre d'affaire annuel",
        label_revenue: "Recettes",
        label_daily_task: "Tâche(s) du ",
        label_yearly_stat: "Rapport annuelle",
        label_forgot_pwd: "Nous enverrons un lien de récupération à",
        link_forgot_pwd: "Mot de passe oublié ?",
        label_reset_pwd: "Modifier votre mot de passe",
        label_login: "Connectez-vous à",
        label_status: "Sélectionner le statut du document *",
        label_graph_expense: "Dépenses par catégorie",
        label_not_task_found: "Aucune tâche pour aujourd'hui",
        label_contact_us: "Demande de contact",
        label_confirm_email: "Demande d'un nouveau courriel de confirmation",
        label_forgot_pwd_body1: "Mot de passe oublié ?",
        label_terms: "Ajouter des conditions de payment etc...",
        label_comp_member: "Votre abonnement",
        label_reply_quote: "Envoyez-nous vos commentaires",
        label_client_feedback: "Commentaire du client",
        event_history: "Historique des evenements",
        placeholder_search_leads: "Recherche par secteur (ex: designer)",
        change_pw: "Modifier son mot de passe",
        change_pw_para: "Un lien vous sera envoyé, veuillez suivre les instructions."

    },
    wording: {
        exportcsv: "Export au format csv",
        locale: "Choisissez la langue du documents",
        create: "Créer",
        save: "Enregistrer",
        edit: 'Editer',
        update: "Mettre à jour",
        updating: "Mise à jour...",
        progress: "En cours...",
        upload: "Uploader",
        loading: "Chargement...",
        send: "Envoyer",
        sent: "Envoyé",
        delete: "Supprimer",
        reply: "Repondre",
        contact_us: "Contactez-nous",
        confirm_payment: "Confirmer le paiement",
        payment_progress: "Paiement en cours...",
        others: "Autres",
        label_tax: "Année fiscale",
        start: "Début",
        end: "Fin",
        password: 'Mot de passe',
        password_confirm: 'Confirmer mon mot de passe',
        firstname: "Prénom",
        lastname: "Nom",
        company_register: "Siret Nº",
        company_register_city: "RCS",
        company_vat: "TVA",
        company_name: "Nom de société",
        company_line_code: "Code téléphone",
        company_line: "Ligne standard",
        company_type: "Type de société",
        phone_code: 'Code téléphone',
        line_code: 'Code téléphone',
        land_line: "Ligne fixe",
        email: "Courriel",
        company: "Société",
        vat: 'TVA',
        vat_terms_fr: "Règle TVA (fr)",
        vat_terms_en: "Règle TVA (en)",
        rate: "Taux",
        capital: "Capital",
        addresses_street: "Adresse",
        addresses_zip: "Code postal",
        addresses_city: "Ville",
        addresses_country: "Pays",
        country: "Pays",
        num_format: "Format des chiffres",
        receipt_date: "Date du reçu",
        repay: "Rembourser",
        refunded: "Remboursé",
        transaction_number: "Référence du virement",
        archive: "Archiver",

        contact_group: "Groupe",
        contact_drop: "Client",
        marg: "Marge",

        service_type: "Type de service",
        follow_up_date: "Date de suivi",

        name: "Nom",
        category: "Catégorie",
        buying_price: "Prix d'achat",
        selling_price: "Prix de vente",
        price: "Prix",
        currency: "Devise",
        stock: "En stock",
        receipt: "Reçu",
        due_date: "Date d’échéance",
        subject: "Sujet",
        short_desc: "A faire...",

        notes: "Information interne",

        add_category: "Ajouter une Catégorie",
        add_group: "Ajouter un groupe",
        add_vat: "Taux TVA",

        fiscal_month: "Exercice fiscal",
        fiscal_day: "Jour fiscal",
        fiscal_date: "Exercice fiscal",
        fiscal_year: "Exercice fiscal",
        expired_at: "Valide jusqu'au",
        created_at: "Créé le",
        due_at: "Dû le",
        contact_id: "Société",
        search_service_product: "Rechercher un produit ou service",
        search_service: "Rechercher un service",
        search_product: "Rechercher un produit",
        search_contact: "Rechercher un contact",
        service: "Service",
        product: "Produit",
        contact: "Contact",
        expense: "Dépense",
        invoice: "Facture",
        quote: "Devis",
        refund: "Avoir",
        description: "Description",
        type_comment: "Taper votre commentaire",
        pricing: "Prix",

        service_name: "Nom du service",
        product_name: "Nom du produit",
        expense_name: "Nom de la dépense",
        pending_invoice: "Factures en attente",

        total: "Total",

        quantity: "Quantité",
        label_rows_per_page: "Colonnes par page:",
        full_name: "Nom complet",
        phone: "Téléphone",
        phoneNumber: "Téléphone (ex: +33...)",
        statistics: "Statistiques mensuelle",

        of: "à",
        bill_to: "Facturer à",
        on: "sur",
        group: "Groupe",
        date: "Date",
        ref: "Référence",
        incl: "inclus",
        subtotal: "Total HT",
        ht: "HT",
        total_ttc: "Total TTC",
        unit_price: "Prix unitaire",
        discount: "Remise",
        discount_unit: "Remise (prix unitaire)",
        remove: "Supprimer",
        approve: 'Approuver',
        draft: "Brouillon",
        pending: 'En attente',
        approved: 'Approuvé',
        rejected: "Rejeté",
        rejecte: "Rejeter",
        pay: "Payer",
        paid: "Payé",
        cancel: "Annuler",
        canceled: "Annulé",
        invoicer: "Facturateur",
        all: "Tous",
        reference: "Référence",
        client: "Client",

        status: "Statut",
        inv: "FACTURE",
        qto: "DEVIS",
        pya: "AVOIR",
        type: "Type",
        preview: "Aperçu",
        delete_img: "Supprimer l'image",
        register: "S'enregistrer",
        sign_up: "S'enregistrer",
        google_sign_up: "Pre-remplir avec Google",
        google_import: "Import Google contacts",
        login: "Se connecter",
        logout: "Déconnexion",
        reset_pwd: "Réinitialiser mon mot de passe",
        send_link: "Envoyer le lien de récupération",
        send_link_confirm: "Envoyer un lien de confirmation",
        return_list: "Retour à la liste",
        address: "Adresse",
        represented_by: "Représenté par",
        selected: "Sélectionné",
        markdown: "Simple éditeur de texte pour vos devis",
        save_password: "Changer mon mot de passe",
        send_pw_link: "Recevoir le lien",
        conversions: "Taux de conversion",
        last_modify: "Mis à jour le ",
        tag_name_en: "Nom de l'étiquette (Anglais)",
        tag_name_fr: "Nom de l'étiquette (Français)",
        tag_hex: "Code couleur HEX (ex: #ffffff)",
        auto_renewal: "Renouvellement automatique",
        login_email: "Courriel",
        login_password: "Mot de passe",
        filter_status: "Filtrer par statut",
        filter_contact: "Filtrer par contact",
        filter_date: "Filtrer par date",
        filter_category: "Filtrer par catégorie",
        filter_group: "Filtrer par groupe",
        export_csv: "Exporter au format Excel",
        filter_doc_type: "Filtrer par type de document",
        hint_refresh: "Remise à zéro",
        pick_date: "Cliquer sur une date pour filtrer vos recherches",
        month: "mois",
        card_lastname: "Nom sur la carte",
        card_firstname: "Prénom sur la carte",
        renewal: "Renouvellement (automatique)",
        yes: "Oui",
        no: "Non",
        or: "OU",
        designation: "Désignation",
        tandc: "Conditions générales",
        quote_link: "Voir le devis",
        duplicate: "Dupliquer",
        invoice_deposit: "Facture d'acompte",
        net_to_pay: "Net à payer TTC",
        balance_due: "Total HT restant dû",
        balance: "Solde",
        deposit: "Acompte (HT)",
        amount_paid: "Montant déja versé",
        bank_name: "Nom de la banque",
        bank_account_name: "Compte bénéficiare",
        iban: "IBAN",
        bic: "BIC",
        bank_detail: "Afficher mes coordonnées bancaires (sur PDF)",
        invoice_ref: "Référence facture",
        refresh: "Recharger",
        my_account: "Mon compte",
        my_setting: "Paramètres",
        weight: "Poids",
        size: "Taille",
        color: "Couleur",
        not_provided: "Non renseigné",
        leads: "prospects auto entrepreneurs en France",
        paid_member_btn: "Devenir membre",
        url: "Website url",
        fb_page: "Facebook page",
        tags: "Ajouter des mot clé (ex: calme, café, wifi)"

    },
    helperText: {
        select_phone_code: "Code téléphone",
        select_country_code: "Pays",
        select_service_type: "Type de service",
        search_coworking: "Rechercher par : nom, ville ou pays",
        select_num_format: "Format des chiffres",
        select_category: "Catégorie",
        select_contact: "Client",
        select_contact_group: "Groupe de contact",
        textarea_quote: "Taper une description de votre devis",
        textarea_terms: "Taper vos conditions générales / modalité de règlement",
        textarea_comment: "Taper un commentaire...",
        expend_contact_info: "Cliquer pour afficher/editer les informations du contact",
        infos_status: "<span style='color: red;font-weight: 700'>ATTENTION *</span> - Seule les statuts < Brouillion & En Attente > sont modifiable",
        type_message: "Taper votre message...",
        payment_terms: "Cet abonnement vous donne un accès total à la plateforme pendant 365 jours",
        add_tags: "Une fois l'élément créé, vous aurez la possibilité d'éditer en 2 langues FR - EN ",
        add_contact: "Ajouter un nouveau contact",
        trial_30: "7 jours d'essai gratuit",
        account_setting: " Vous pouvez ajouter initialiser vos paramètres, afin d'optimiser vos documents comptables et filtre de recherche",
        account_vat: "Lister vos taux de TVA, ils vous seront utile pour la redaction de vos documents comptables",
        account_group: "Créer vos propres groupes de contact afin de facilité, vos recherches dans la sections contacts",
        account_category: "Catégorisé vos produits/services/dépenses, vous pourrez également associé une couleur par catégorie et analysé votre tabelau de bord en en clein d'oeil.",
        action_table: "ATTENTION - Une fois le document envoyé, annulé ou payé, il ne sera plus modifiable.",
        action_table_refund: "ATTENTION - Une fois le document envoyé, annulé ou remboursé, il ne sera plus modifiable.",
        action_table_quote: "ATTENTION - Une fois le document approuvé ou annulé, il ne sera plus modifiable.",
        header_large: "entête large",
        header_medium: "entête moyenne",
        need_help: "Besoin d'aide ? Contacter nous directement <a href='mailto:support@nomadledger.com'>support@nomadledger.com</a>",
        member_end: "Votre abonnement actuel prend fin le",
        cannot_change_email: "L'adresse email n'est modifiable que sur demande.",
        import_contact: "Cette opération peut prendre quelques minutes, veuillez patientez merci...",
        edit_receiver_contact: "Editer les informations du destinataire",
        payment_terms_invoice: `En cas de retard de paiement, une pénalité égale à 3 fois le taux d'intérêt légal sera exigible (Décret 2009-138 du 9 février 2019). Pour les professionnels, une indemnité minimum forfaitaire de 40 euros pour frais de recouvrement sera exigible (Décret 2012-1115 du 9 octobre 2012).`


    },
    message: {
        success_create: "Félicitation !",
        success_update: "Mis à jour avec succès",
        success_uploaded: "Fichier(s) téléchargé(s) ",
        success_sent: "Email envoyé",
        success_delete: "Élément supprimé",
        success_updated_pw: "Votre mot de passe a été mis à jour",
        success_create_new_user: "Félicitation! Votre compte a bien été créé, veuillez vous rendre sur votre email et suivre les instructions",
        success_email_sent: "Message envoyé, nous vous contacterons dans les meilleurs délais",
        success_payment: "Paiement accepté, vous allez recevoir un reçu par courriel",
        success_send_email_confirm: "Un courriel de confirmation vous à été envoyé, veuillez suivre les instructions",
        success_sent_document: "Document envoyé au destinataire",
        success_reply: "Votre réponse a été enregistrée, nous reviendrons vers vous dans les meilleurs délais.",
        success_can_login: "Vous pouvez maintenant vous connecter a votre compte",

        error_no_token_found: "Erreur aucune cle de connexion trouvé",
        error_payment: "Erreur lors du paiement, veuillez recommencer ou contacter notre service support@nomadledger.com",
        error_payment_no_found: "Erreur paiement informations non trouvé, veuillez recommencer ou contacter notre service support@nomadledger.com",
        error_email_not_sent: "Erreur - message non envoyé, veuillez recommencer ou prendre contact avec notre support@nomadledger.com",
        error_create: "Erreur donnée non créé",
        error_update: "Erreur donnée non mise à jour",
        error_sent: "Email non envoyé",
        error_user_not_found: "Utilisateur non trouvé",
        error_wrong_password: "Mot de passe incorrect",
        error_500: "Erreur serveur, veuillez recommencer ou contacter notre service support@nomadledger.com",
        error_400: "Les champs marqués avec une * sont obligatoires",
        error_401: "Non autorisé",
        error_404: "Aucun élément trouvé, veuillez recommencer ou contacter notre service support@nomadledger.com",
        error_4044: "Fichier non trouvé, veuillez recommencer ou contacter notre service support@nomadledger.com",
        error_403_delete: "Cette donnée ne peux être supprimée. Cela signifie qu'elle est associée à un autre document.",
        error_403: "Error de connexion, veuillez recommencer ou contacter notre service support@nomadledger.com",
        error_membership_end: "Votre période d'essai vient de se terminer, vous pouvez renouveler votre abonnement ou nous faire une demande pour récupérer vos données",
        error_409: "Cette email existe déjà dans notre base de donnée",
        error_wrong_token: "Erreur d'authentification, veuillez recommencer ou contacter notre service support@nomadledger.com",
        error_session_token: "Session expiré, veuillez vous reconnecter",
        error_no_token: "Session expiré, veuillez vous reconnecter ou contacter notre service support@nomadledger.com",
        error_file_not_allowed: "Ce type de fichier n'est pas autorisé",
        error_file_found: "Aucun fichier trouver",
        error_pw_not_match: "Mot de passe non identique",
        error_pw_min_8: "Votre mot de passe doit faire au minimum 8 caractères",
        error_500_upload: "Erreur téléchargement du fichier, veuillez recommencer ou contacter support@nomadledger.com",
        error_agreed_terms: "Vous devez accepter les Conditions générales",
        error_date_expense: "La date doit être inférieur ou égale a la date du jour.",
        new_avalaible_update: "Une nouvelle version de NomadLedger est disponible, merci de rafraichir la page",


        // Bad value
        error_422: "Valeur champs incorrect ou manquant",
        error_422_missing_currency: "Le champs devise doit être renseigné",
        error_422_contact: "Erreur, veuillez recommencer ou contacter notre service support@nomadledger.com",
        error_422_price: "Les champs chiffres doivent correspondre au format intl '42.18' ou format français '36,85'",
        error_422_email_format: "Veuillez vérifier le format de votre courriel",
        error_422_lastname: "Le nom est obligatoire",
        error_422_email: "L’email est obligatoire",
        error_422_firstname: "Le prénom est obligatoire",
        error_422_company_name: "Le nom de société est obligatoire",
        error_422_password: "Le mot de passe est obligatoire",
        error_422_selling_price: "Le champs prix de vente est obligatoire",
        error_422_indice: "Taux de TVA doit être un chiffre (ex: 19,60 ou 19.60)",
        error_422_name: "Veuillez indiquer un nom",
        error_422_name_vat: "Veuillez indiquer un nom pour votre TVA",
        error_422_access_member: "Seule les membres NomadLedger ont accès à cette fonction.",
        error_422_cannot_be_edited: "Ne peut etre editer",
        error_422_cannot_be_send: "Ce document ne peut plus être envoyé",
        error_422_outstock: "Verifier les stocks disponible des produits",
        error_sign_up_google: "Inscription via Google n'a pas fonctionner, veuillez recommencer ou contacter notre service support@nomadledger.com",

        // Stripe err
        incomplete_zip: "Votre code postal est incomplet.",
        card_declined: "La carte a été decliné.",
        expired_card: "La carte est expiré. Verifier la date d'expiration.",
        incorrect_cvc: "Le code de securité est incorrect.",
        incorrect_number: "Le numéro de carte est incorrect. Verifier la carte ou utilisé une autre carte.",
        invalid_cvc: "Le code de securité est invalide. Verifier la carte ou utilisé une autre carte.",
        token_already_used: "Le token a déja été utilisé. Vous devez créer un nouveau token.",
        postal_code_invalid: "Le code postal est invalide.",

        warning_not_refresh: "Veuillez ne pas rafraichir la page pendant la procédure de paiement",
        first_co: "Préparer votre application ! Ajouter/Supprimer vos Catégories - TVA - Groupe de contact et valider les informations de votre société",
        alert_password_not_match: "Les mots de passe ne correspondent pas",
        email_confirmed: "Merci ! Votre courriel a bien été confirmé",
        email_not_confirm: "Votre courriel, n'a pas encore été confirmé. Si vous n'avez pas reçu votre courriel de confirmation vous pouvez faire une nouvelle demande",
        phone_required: "Mobile obligatoire",
        required: "Tous les champs marqués d'un * sont obligatoires",
        request_reset_pw: "Votre demande a bien été prise en compte. Veuillez consulter votre email et suivre les instructions",
        beta_1: "Beta 1 - Toutes les données enregistrées seront perdues",
        confirm_delete: "Voulez-vous vraiment supprimer cette élément ?",
        cookie_track: `En poursuivant votre navigation sur ce site, vous en acceptez les conditions générales d'utilisation, et notamment l'utilisation des cookies afin de réaliser des statistiques d'audiences, vous proposer des services éditoriaux, une offre publicitaire adaptée à vos centres d'intérêts et la possibilité de partager des contenus sur les réseaux sociaux.`,
        privateAccess: "Seuls les membres abonnés ont accès à la list complète.",
        status_devis: `
            <p class="hint">Il est important de bien comprendre chacun des statuts de vos devis.</p>
            <p class="hint">Ceci <span class="bullet"></span> indique q'une reponse a été reçu. </p>
            <ul class="hint">
                <li><strong>Brouillon</strong> : Peuvent être edité.</li>
                <li><strong>Envoyé</strong> : Peuvent être edité.</li>
                <li><strong>Approuvé</strong> : Un devis approuvé ne peut plus être edité. Il peut être annulé ou renvoyé.</li>
                <li><strong>Annulé</strong> : Aucune action possible</li>
            </ul>
            <p class="hint">Dès que vous créez une facture attacher au devis, celui-ci prendra le statut "approuvé" et ne sera donc plus modifiable.</p>
        `,
        status_invoice: `
            <p class="hint">Il est important de bien comprendre chacun des statuts de vos factures.</p>
            <ul class="hint">
                <li><strong>Brouillon</strong> : Peuvent être edité.</li>
                <li><strong>Envoyé</strong> : Une facture envoyé ne peut plus être edité.</li>
                <li><strong>Payé</strong> : Une facture payé ne peut plus être edité. Elle peut être annulé ou renvoyé.</li>
                <li><strong>Annulé</strong> : Aucune action possible</li>
            </ul>
        `,
        status_refund: `
            <p class="hint">Il est important de bien comprendre chacun des statuts de vos factures.</p>
            <ul class="hint">
                <li><strong>Brouillon</strong> : Peuvent être edité.</li>
                <li><strong>Envoyé</strong> : Un avoir envoyé ne peut plus être edité.</li>
                <li><strong>Remboursé</strong> : Un avoir remboursé ne peut plus être edité. Il peut être annulé ou renvoyé.</li>
                <li><strong>Annulé</strong> : Aucune action possible</li>
            </ul>
        `
    },
    days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    month: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
    week_long: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    week_short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    placeholder: 'JJ/MM/AAAA',
    home_page: {
        title_01: "Logiciel de facturation en ligne pour nomades numériques",
        paragraphe_01: ` est un logiciel en ligne facile à utiliser pour gérer vos factures et suivre vos tâches en quelques clics.`,
        paragraphe_02: `Nous sommes un groupe de nomades numériques travaillant dans le monde entier, et nous voulions 
        un moyen simple et sécurisé pour <strong>facturer nos clients </strong> internationaux.
        c'est ainsi que <strong style="color:#0c3c5e">Nomad</strong><span style="color:#01898c;font-weight: 400">Ledger</span> est né.<br /> 
        Notre logiciel vous permet de créer, d’envoyer ou d’imprimer
        facilement des documents professionnels accessibles depuis
        n’importe quel appareil, et de n’importe où.<br /> 
        Vous pouvez ainsi <strong>consacrer moins de temps à la facturation</strong>, et plus de temps au
        travail qui vous importe.`,
        agreed_terms: ` * En m'inscrivant, j'accepte les <a target="_blank" href="https://d2cxa8ns3xxkg9.cloudfront.net/static/termsandconditions_fr.pdf">Conditions générales</a>  et la  <a href="https://d2cxa8ns3xxkg9.cloudfront.net/static/privacypolicy_fr.pdf">Politique de protection de la vie privée</a>.`,
        footer_paragraphe: `Tous droits réservés.&nbsp;<a style="color: #8B8B8B; font-weight: 600" target="_blank" href="https://d2cxa8ns3xxkg9.cloudfront.net/static/termsandconditions_fr.pdf" rel="noopener noreferrer" target="_blank">Conditions Générales</a>,&nbsp;
        les fonctionnalités, l'assistance, la tarification et les options sont susceptibles d'être modifiées sans préavis.`,
        sign_in: "Se Connecter",
        try_it_free: "Essai gratuit",
        try_it: "L'essayer",
        blocDesc: {
            title: `QU'EST CE QU'ON FAIT POUR VOUS ?`,
            bloc_1_title: `Support de Devises Multiples`,
            bloc_1_para: `Il est important de jongler avec <strong>plusieurs devises</strong> lorsque vous
            travaillez à l’international.<br />
            <strong style="color:#0c3c5e">Nomad</strong><span style="color:#01898c;font-weight: 400">Ledger</span> enregistre toutes les devises que vous utilisez lors de
            la création, ou la mise à jour de documents, et ce,
            avec les tarifs en vigueur.`,
            bloc_2_title: `Edition de Factures et Devis`,
            bloc_2_para: `Pour un traitement <strong>efficace</strong>, configurer votre application en entrant vos services, produits, contacts et configurations. Vous pourrez ensuite <strong>créer vos factures et/ou devis</strong> en quelques clics seulement.`,
            bloc_3_title: `Gestionnaire de Taches intégré`,
            bloc_3_para: `Ne manquez jamais une tâche : Ajoutez-la simplement à notre <strong>gestionnaire de tâches</strong>, qui vous guidera tout au long de la journée et vous permettra de suivre la progression de chaque tâche.`,
        },
        form: {
            title: "7 jours d'essai gratuit",
            btn: "S'enregistrer"
        },
        questions: {
            title: "FAQ",
            q_1: "Pourquoi utiliser un logiciel de facturation en ligne ?",
            r_1: `Le <strong>logiciel de facturation</strong> vous apporte souplesse et efficacité. Gardez une trace de toutes vos activités, simplifiez vos audits annuels et exportez vos fichiers de comptabilité en un seul clic.`,
            q_2: "A qui s'adress ce logiciel ?",
            r_2: `Ce logiciel a été conçu pour <strong>la facturations des entrepreneurs, freelances et les petites ou moyennes entreprises</strong> qui ont besoin d’un programme facile à utiliser, et efficace.`,
            q_3: "Quels sont les avantages ?",
            r_3: `Notre logiciel sécurisera vos données, <strong>augmentera votre productivité de façon efficiente</strong>, et permettra de suivre vos finances.<br />De plus, il vous donnera un accès facile à vos informations, ou que vous vous trouviez, depuis n'importe quel appareil.`
        },
        offer: {
            title: "Notre offre",
            price: `Un seul prix<br /><strong style="line-height: 1.4">3,95 €</strong>`,
            price_sub: `par mois`,
            title_list: "Pas de frais cachés, juste un tarif mensuel fixe.",
            paragraphe: `Profitez d’un <strong>accès illimité</strong> à une solution à part entière pour gérer les documents professionnels de votre entreprise et plus encore, que vous travailliez seul ou au sein d’une startup. Notre logiciel offre tout ce dont vous avez besoin, du suivi de vos prospects à la <strong>gestion des factures</strong>. Commencez dès maintenant et développez votre entreprise.`,
            listItem: ["Edition de documents", "Creation de PDF", "Export format Excel", "Gérer vos contacts", "Gérer vos services/produits", "Task manager", "Calcule automatique des TVA", "Importer vos contacts Google", "Suivi de votre chiffre d’affaire", "Gérer vos dépenses", "Accéder à plus de 29 000 prospects (France)"],
            btn: "Créer un compte"
        },
        partners: {
            title: "Partenaires & Clients"
        },
        contact: {
            contact_us: "CONTACTEZ NOUS",
            follow_us: "SUIVEZ NOUS"
        }
    }
};

export { fr }



