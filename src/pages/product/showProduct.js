//manager/src/pages/product/showProduct.js

import React from 'react'
import {connect} from 'react-redux'
import { convertToNumber, cvtNumToUserPref, cvtToLocale } from '../../utils/help_function'
import { getItem, resetState, updateItem, createState, removeImageFromArray } from '../../redux/library/actions'
import { withStyles, Typography, Grid, TextField} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseOutlined'
import {currency} from '../../utils/static_data'
import ApxBackBtn from '../../components/common/backBtn'
import ApxButton from '../../components/common/button'
import Spinner from '../../components/common/spinner'
import ApxPaper from '../../components/common/paper'
import ApxAlert from '../../components/common/alert'
import EditSelect from '../../lib/editSelect';

class ShowProduct extends React.Component {

  componentDidMount(){
      var id = this.props.match.params.id;
      this.props.getItem("PRODUCT", id)
  }

  componentWillUnmount(){
    this.props.resetState("PRODUCT")
  }

  render() {

    const {classes, product, isFetching, locale, isError, message, categories, isUpdating} = this.props
    if( isFetching ){
      return <Spinner/>
    }

    if( product === null  ){
      return <ApxAlert message="error_404" />
    }
  
      return (
        <ApxPaper>
          <ApxBackBtn/>
          {isError ? <ApxAlert message={message} /> : null }
          <Typography variant="h1">{ product.name}</Typography><br />
            <Grid container spacing={24}>
                <Grid item xs={12} sm={7} md={7}>
                      <div className={classes.mainImgWrap}>
                        <img src={ `${product.img[0] ? product.img[0].full_path : 'http://localhost:8080/img/default_logo.png'}`} className={classes.img} width="auto" alt={product.name} />
                      </div>

                    <div className={classes.thumbnailWrap} >
                    {
                      product.img.map((x, index) => {
                          return <div key={index} className={ classes.thumbnail }>
                                    <CloseIcon  onClick={() => { this.props.removeImageFromArray("PRODUCT", `remove${x.path}/${x._id}/${product._id}`) }}/>
                                    <img src={x.full_path} className={classes.img} width="100" alt={x.org_name} />
                                </div>
                      })
                    }
                    </div>
                </Grid>
                <Grid item  xs={12} sm={5} md={5}>
                <TextField variant="outlined" 
                                label={locale.form.field.name} 
                                fullWidth
                                className={classes.margin} 
                                margin="dense" 
                                value={ product.name} 
                                onChange={ (e) => {this.props.createState("PRODUCT", "name",  e.target.value)} }/>
                <div className={classes.margin} >
                    <EditSelect  
                        arrayField={categories || []}
                        field="category"
                        handleAction={ (e) => {this.props.createState("PRODUCT", "category",  e.target.value)} }
                        locale={locale}
                        showEdit={true}
                        variant="outlined"
                        label={locale.form.field.category }
                        value={  product.category && product.category[localStorage.getItem("locale")] }
                    />
                    </div>
                    <div className={classes.margin} >
                      <EditSelect  
                        arrayField={currency || []}
                        field="currency"
                        handleAction={ (e) => {this.props.createState("PRODUCT", "currency",  e.target.value)} }
                        locale={locale}
                        showEdit={true}
                        variant="outlined"
                        label={locale.form.field.currency }
                        value={  product.currency && product.currency[localStorage.getItem("locale")] }
                    />
                    </div>
                    

                    <TextField  variant="outlined" 
                                label={locale.form.field.buying_price +' ('+ product.currency.value +')' } 
                                fullWidth
                                className={classes.margin} margin="dense" 
                                value={ cvtToLocale(product.buying_price) } 
                                onChange={ (e) => {this.props.createState("PRODUCT", "buying_price",  e.target.value)} }
                                />   
                    <TextField variant="outlined" 
                                label={locale.form.field.selling_price +' ('+ product.currency.value +')' } 
                                fullWidth
                                className={classes.margin} 
                                margin="dense" 
                                value={ cvtToLocale(product.price)} 
                                onChange={ (e) => {this.props.createState("PRODUCT", "price",  e.target.value)} }
                                />
                    <TextField variant="outlined" 
                                label={locale.form.field.marg +' ('+ product.currency.value +')' } 
                                fullWidth
                                className={classes.margin} 
                                margin="dense" 
                                disabled
                                value={ cvtNumToUserPref(convertToNumber(product.price) - convertToNumber(product.buying_price)) } 
                                onChange={ (e) => {this.props.createState("PRODUCT", "marg",  e.target.value)} }
                      />
                    <TextField  variant="outlined" 
                                label={locale.form.field.stock } 
                                fullWidth
                                type="number"
                                className={classes.margin} 
                                margin="dense" 
                                value={ product.stock } 
                                onChange={ (e) => {this.props.createState("PRODUCT", "stock",  e.target.value)} }
                                />   
                </Grid>
            </Grid>

            <TextField variant="outlined" 
                      label={locale.form.field.description } 
                      fullWidth
                      multiline
                      rows={6}
                      className={classes.margin} 
                      margin="normal"
                      value={ product.description } 
                      onChange={ (e) => {this.props.createState("PRODUCT", "description",  e.target.value)} }
            />
          <div className={classes.btnWrap}>
            <ApxButton 
              color="secondary"
              variant="contained"
              disabled={ isUpdating }
              title={ isUpdating ? locale.button.loading :  locale.button.update}
              action={ () => { this.props.updateItem("PRODUCT", `update`) } }
            />
          </div>
            

        </ApxPaper>
      )
    }
}


const styles = theme => ({
  mainImgWrap: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: 'rgb(238,238,238)'
  },
  img: {
    maxWidth: '100%',
    height: '100%',
    maxHeight: '400px',
    display:'block',
    margin:'auto'
  },
  thumbnailWrap: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgb(238,238,238)',
    textAlign: 'center',
    overflowY: 'hidden'
  },
  thumbnail: {
    display:'inline-block',
    position: 'relative',
    backgroundColor: 'red',
    maxHeight: 100,
    margin: '0px 5px 0px 5px',
  },
  span: {
    textAlign: 'center',
    float: 'right'
  },
  margin: {
    marginBottom: 12
  },

  btnWrap: {
    float: 'right'
  }
})

const mapStateToProps = (state) => {
  return {
      locale: state.locale.locale,
      isFetching: state.library.product.isFetching,
      isUpdating: state.library.product.isUpdating,
      isError: state.library.product.isError,
      message: state.library.product.message,
      product: state.library.product.item,
      categories: state.account.company.item ?  state.account.company.item.category_name : []
      
  }
}

const StyledShowProduct = withStyles(styles)(ShowProduct)

export default connect(mapStateToProps, { getItem , resetState, updateItem, createState, removeImageFromArray })(StyledShowProduct);


