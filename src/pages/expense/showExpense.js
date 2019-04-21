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
                _handleUploadFile={ (e) => { this.props.uploadFileToServer(reducer, expense._id,  e.target.files[0], expense.receipt ) }}
                reducer={this.state.reducer}
                progress={progress}
                isUploading={isUploading}
                idModel={expense._id}
                oldFile={expense.receipt.path}
                image={ <img src={`${ expense.receipt.full_path || DEFAULT_IMG }`} alt="logo" height="150" style={{ maxHeight: 250 }} />}
              />

            <TextField
                    id="name"
                    variant="filled"
                    type="text"
                    margin="dense"
                    required
                    label={locale.wording.name}
                    value={expense.name}
                    fullWidth
                    onChange={ (e) => { this.props.createState(reducer, "name", e.target.value) } }
                  />
            <Grid container spacing={24}>

              <Grid item xs={12} md={6}>

                  <TextField
                      label={locale.wording.receipt_date}
                      id="receipt_date"
                      disabled
                      required
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
                    arrayField={currency}
                    required={true}
                    field="currency"
                    value={expense.currency[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState(reducer, "currency", e.target.value) } }
                    locale={locale}
                  />
                  <TextField
                    id="price"
                    variant="filled"
                    margin="dense"
                    fullWidth
                    required
                    label={locale.wording.price}
                    value={expense.price}
                    onChange={ (e) => { this.props.createState(reducer, "price", e.target.value) } }
                  />
              </Grid>

              <Grid item xs={12} md={6}>
                 <EditSelect
                    showEdit={true}
                    variant="filled"
                    arrayField={category}
                    field="category"
                    required={true}
                    value={expense.category[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState(reducer, "category", e.target.value) } }
                    locale={locale}
                  />
                  <EditSelect
                    showEdit={true}
                    variant="filled"
                    arrayField={vat}
                    required={true}
                    field="vat"
                    value={expense.vat[localStorage.getItem('locale')]}
                    handleAction={ (e) => { this.props.createState(reducer, "vat", e.target.value) } }
                    locale={locale}
                  />

                  <TextField
                    id="quantity"
                    variant="filled"
                    margin="dense"
                    fullWidth
                    required
                    label={locale.wording.quantity}
                    value={expense.quantity}
                    onChange={ (e) => { this.props.createState(reducer, "quantity", e.target.value) } }
                  />

              </Grid>
            </Grid>
            <TextField variant="filled"
                label={locale.wording.description }
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
    }
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
