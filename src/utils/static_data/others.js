
const status =  [
    { en: 'Draft', fr: 'Brouillon', color: 'blue', code: '0' },
    { en: 'Pending', fr: 'En attente',  color: 'orange', code: '1'  },
    { en: 'Approved', fr: 'Approuvé',  color: 'green', code:  '2'},
    { en: 'Rejected', fr: 'Rejeté',  color: 'red', code: '3'},
]

const statusInv =  [
    { en: 'Draft', fr: 'Brouillon', color: 'blue', code: '0' },
    { en: 'Pending', fr: 'En attente',  color: 'orange', code: '1'  },
    { en: 'Paid', fr: 'Payée',  color: 'green', code: '4'},
    { en: 'Dispute', fr: 'Litige',  color: 'red', code: '5'},
]

const filter = [
    { en: 'Draft', fr: 'Brouillon', color: 'blue', code: '0' },
    { en: 'Pending', fr: 'En attente',  color: 'orange', code: '1'  },
    { en: 'Approved', fr: 'Approuvé',  color: 'green', code:  '2'},
    { en: 'Rejected', fr: 'Rejeté',  color: 'red', code: '3'},
    { en: 'Paid', fr: 'Payée',  color: 'green', code: '4'},
    { en: 'Dispute', fr: 'Litige',  color: 'red', code: '5'},
    { en: 'All', fr: 'Tous',  color: 'grey', code: '10'},
    
]

export { status, statusInv, filter };