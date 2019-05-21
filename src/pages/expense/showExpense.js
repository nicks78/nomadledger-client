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
import DatePickers from '../../lib/dayPicker'
import { DEFAULT_IMG } from '../../redux/constant';
import {checkNumFormatRegex, cvtToLocale} from '../../utils/help_function'
import {resizeFile} from '../../utils/resizeFile'


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

    handleImageUpload = (file) => {
      if(!file){return;}
      resizeFile( file, this.callBackUpload )
    }

    callBackUpload = (file) => {
      var expense = this.props.expense
      this.props.uploadFileToServer(this.state.reducer, expense._id, file, expense.receipt)
    }




    render() {
      const {classes, expense, isFetching, locale, category, isUpdating, progress, currency, vat, isUploading} = this.props
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
            <br />

              <UploadImg
                field="receipt"
                _handleUploadFile={ (e) => { this.handleImageUpload( e.target.files[0] ) }}
                reducer={this.state.reducer}
                progress={progress}
                isUploading={isUploading}
                idModel={expense._id}
                oldFile={expense.receipt.path}
                image={ <img src={`${ expense.receipt.full_path || DEFAULT_IMG }`} alt="logo" height="150" style={{ maxHeight: 250 }} />}
              />




              <Grid container spacing={8}>
                  <Grid item xs={12}>
                    <TextField
                        id="name"
                        variant="outlined"
                        className={classes.textField}
                        type="text"
                        margin="dense"
                        required
                        label={locale.wording.name}
                        value={expense.name}
                        fullWidth
                        onChange={ (e) => { this.props.createState(reducer, "name", e.target.value) } }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                        label={locale.wording.receipt_date}
                        id="receipt_date"
                        disabled
                        className={classes.textField}
                        required
                        margin="dense"
                        style={{width: '100%'}}
                        value={expense.receipt_date.label}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <DatePickers
                                        handleDate={ (e) => { this.props.createState(reducer, "receipt_date", e.target.value) }}
                                        field="receipt_date"
                                    />
                            </InputAdornment>,
                        }}
                    />
                  <div style={{marginTop: 15}}><EditSelect
                      showEdit={true}
                      variant="outlined"
                      arrayField={currency}
                      required={true}
                      field="currency"
                      value={expense.currency[localStorage.getItem('locale')]}
                      handleAction={ (e) => { this.props.createState(reducer, "currency", e.target.value) } }
                      locale={locale}
                    /></div>
                    <TextField
                      id="price"
                      variant="outlined"
                      margin="dense"
                      className={classes.textField}
                      fullWidth
                      required
                      label={locale.wording.price}
                      value={ cvtToLocale(expense.price)}
                      onChange={ (e) => {
                          if(checkNumFormatRegex(e.target.value) === false){
                             alert(locale.message.error_422_price)
                          }else{
                            this.props.createState(reducer, "price", e.target.value)
                          }
                        }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <EditSelect
                       showEdit={true}
                       variant="outlined"
                       arrayField={category}
                       field="category"
                       required={true}
                       value={expense.category[localStorage.getItem('locale')]}
                       handleAction={ (e) => { this.props.createState(reducer, "category", e.target.value) } }
                       locale={locale}
                     />
                     <EditSelect
                       showEdit={true}
                       variant="outlined"
                       arrayField={vat}
                       required={true}
                       field="vat"
                       value={expense.vat[localStorage.getItem('locale')]}
                       handleAction={ (e) => { this.props.createState(reducer, "vat", e.target.value) } }
                       locale={locale}
                     />

                     <TextField
                       id="quantity"
                       variant="outlined"
                       className={classes.textField}
                       margin="dense"
                       fullWidth
                       required
                       label={locale.wording.quantity}
                       value={expense.quantity}
                       onChange={ (e) => { this.props.createState(reducer, "quantity", e.target.value) } }
                     />
                  </Grid>
              </Grid>
              <br />
              <TextField variant="outlined"
                  label={locale.wording.description }
                  fullWidth
                  multiline
                  rows={6}
                  className={classes.textField}
                  margin="normal"
                  value={ expense.description }
                  onChange={ (e) => {this.props.createState(reducer, "description",  e.target.value)} }
              />

              <br /><br />
              <Button
                  variant="contained"
                  color="primary"
                  disabled={ isUpdating }
                  className={ classes.btnSave }
                  onClick={ () => { this.props.updateItem(reducer, `update`)} }>
                  { !isUpdating ?  locale.wording.update : locale.wording.loading }</Button>




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
    },
    textField: {
        fontWeight: 300,
        marginTop: 0,
        "& span": {
          color: `${theme.palette.secondary.main} !important`
        }
    },
})

const mapStateToProps = (state) => {
  return {
      isFetching: state.library.expense.isFetching,
      isUpdating: state.library.expense.isUpdating,
      isUploading: state.library.expense.isUploading,
      progress: state.library.expense.progress,
      expense: state.library.expense.item,
      locale: state.locale.locale,
      category: state.account.company.item ?  state.account.company.item.category_name : [],
      currency: state.helper.items.currency,
      vat: state.account.company.item ? state.account.company.item.vat : []

  }
}

const StyledShowExpense = withStyles(styles)(ShowExpense)

export default connect(mapStateToProps, {  getItem, createState, updateItem, resetState, uploadFileToServer })(StyledShowExpense);
