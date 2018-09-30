//manager/src/pages/expense/showExpense.js

import React from 'react'

const ShowExpense = (props) => {

  console.log(props)
    return (
      <div>
        test
          { props.expense.expense_name}
      </div>
    )
}


export default ShowExpense