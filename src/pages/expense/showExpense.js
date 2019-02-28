//manager/src/pages/expense/showExpense.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import UploadImg from '../../lib/uploadImg'
import { getItem, createState, updateItem, resetState, uploadFileToServer } from '../../redux/library/actions'
import { withStyles, TextField, Grid, Button, InputAdornment} from '@material-ui/core';
import ApxAlert from '../../components/common/alert'
import Spinner from '../../components/common/spinner'
import ApxPaper from '../../components/common/paper'
import ApxBackBtn from '../../components/common/backBtn'
import EditSelect from '../../lib/editSelect'
import {currency} from '../../utils/static_data'
import DatePickers from '../../lib/dayPicker'

class ShowExpense extends Component {

    state = {
      reducer: "EXPENSE"
    }

    componentDidMount(){
      var id = this.props.match.params.id;
      this.props.getItem(this.state.reducer, id)
    }

    componentWillUnmount(){
      this.props.resetState(this.state.reducer)
    }



    render() {
      const {classes, expense, isFetching, locale, isError, message, category, isUpdating, progress} = this.props
      const {reducer} = this.state


      if( isFetching ){
        return <Spinner/>
      }
      if( expense === null ){
        return <ApxAlert message="error_404" />
      }

      return (
        <ApxPaper>
          <ApxBackBtn/>
            
            <UploadImg 
                field="receipt"
                _handleUploadFile={ this.props.uploadFileToServer }
                reducer={this.state.reducer}
                progress={progress}
                idModel={expense._id}
                oldFile={expense.receipt.path}
                isUploading={ false }
                image={ <img src={`${ expense.receipt.full_path || 'http://localhost:8080/img/default_logo.png' }`} alt="logo" width="100%" height={null} />}
              />
            {isError ? <ApxAlert message={message} /> : null }
            <TextField 
                    id="name"
                    variant="filled" 
                    type="text"
                    margin="dense"
                    label={locale.form.field.name}
                    value={expense.name}
                    fullWidth
                    onChange={ (e) => { this.props.createState(reducer, "name", e.target.value) } }
                  />
            <Grid container spacing={24}>

              <Grid item xs={12} md={6}>
                 
                  <TextField
                      label={locale.form.field.receipt_date}
                      id="receipt_date"
                      disabled
                      margin="dense"
                      style={{width: '100%'}}
                      value={expense.receipt_date.label} 
                      variant="filled"
                      InputProps={{
                          startAdornment: <InputAdornment position="start">
                              <DatePickers 
                                      handleDate={ (e) => { this.props.createState(reducer, "receipt_date", e.target.value) }}
                                      field="receipt_date"
                                  /> 
                          </InputAdornment>,
                      }}
                  />
                  <br />
                 
                  <EditSelect 
                    showEdit={true}
                    variant="filled" 
                    arrayField={category}
                    field="category"
                    value={expense.category[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState(reducer, "category", e.target.value) } }
                    locale={locale}
                  />
              </Grid>

              <Grid item xs={12} md={6}>
                  <TextField 
                    id="price"
                    variant="filled" 
                    type="number"
                    margin="dense"
                    fullWidth
                    label={locale.form.field.price}
                    value={expense.price}
                    onChange={ (e) => { this.props.createState(reducer, "price", e.target.value) } }
                  />
                  <EditSelect 
                    showEdit={true}
                    variant="filled" 
                    arrayField={currency}
                    field="currency"
                    value={expense.currency[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState(reducer, "currency", e.target.value) } }
                    locale={locale}
                  />


              </Grid>
            </Grid>
            <TextField variant="filled"
                label={locale.form.field.description } 
                fullWidth
                multiline
                rows={6}
                className={classes.margin} 
                margin="normal"
                value={ expense.description } 
                onChange={ (e) => {this.props.createState(reducer, "description",  e.target.value)} }
            />
            <br />
            <Button 
                variant="contained" 
                color="secondary" 
                disabled={ isUpdating }
                className={ classes.btnSave } 
                onClick={ () => { this.props.updateItem(reducer, `update`)} }>
                { !isUpdating ?  locale.button.update : locale.button.loading }</Button>
        </ApxPaper>
      )
    }
}

const styles = theme => ({
    paper: {
      padding: 24,
      overflow: 'hidden'
    },
    btnSave: {
      float: 'right'
    }
})

const mapStateToProps = (state) => {
  return {
      isFetching: state.library.expense.isFetching,
      isUpdating: state.library.expense.isUpdating,
      progress: state.library.expense.progress,
      isError: state.library.expense.isError,
      message: state.library.expense.message,
      expense: state.library.expense.item,
      locale: state.locale.locale,
      category: state.account.company.item ?  state.account.company.item.category_name : []

  }
}

const StyledShowExpense = withStyles(styles)(ShowExpense)

export default connect(mapStateToProps, {  getItem, createState, updateItem, resetState, uploadFileToServer })(StyledShowExpense);