//manager/src/pages/product/showProduct.js

import React from 'react'
import {connect} from 'react-redux'
import { cvtNumToUserPref, cvtToLocale } from '../../utils/help_function'
import { getItem, resetState, updateItem, createState, removeImageFromArray, uploadProductFileToServer } from '../../redux/library/actions'
import { withStyles, Typography, Grid, TextField, IconButton} from '@material-ui/core';
import ApxBackBtn from '../../components/common/backBtn'
import Spinner from '../../components/common/spinner'
import ApxPaper from '../../components/common/paper'
import ApxAlert from '../../components/common/alert'
import EditSelect from '../../lib/editSelect';
import CameraAltIcon from '@material-ui/icons/CameraAltOutlined'
import EditIcon from '@material-ui/icons/EditOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import CarouselProduct from './carouselProduct'



class ShowProduct extends React.Component {

    state = {
      reducer: "PRODUCT",
      showEdit: false
    }

  componentDidMount(){
      var id = this.props.match.params.id;
      this.props.getItem(this.state.reducer, id)
  }

  componentWillUnmount(){
    this.props.resetState(this.state.reducer)
  }

  handleEdit = () => {
    if(this.state.showEdit){
      this.props.updateItem(this.state.reducer, `update`)
    }
    this.setState({showEdit: !this.state.showEdit});
  }

  render() {

    const {classes, product, isFetching, locale, categories, currency} = this.props;
    const {reducer, showEdit} = this.state;

    if( isFetching ){
      return <Spinner/>
    }

    if( product === null  ){
      return <ApxAlert message="error_404" />
    }

      return (
        <ApxPaper>

          <ApxBackBtn/>
          <Grid container>
              <Grid item xs={12} sm={9} md={9} className={classes.thumbnail}>

                    <div className={classes.mainImgWrap}>
                        <CarouselProduct
                          images={product.img}
                          removeImageFromArray={this.props.removeImageFromArray}
                          reducer={reducer}
                          productId={product._id}
                        />

                        <div className={classes.button}>
                            <input
                                accept="all"
                                disabled={ product.img.length >= 3 ? true : false }
                                className={classes.input}
                                id="upload"
                                name="img"
                                onChange={ (e) => { e.target.files.length > 0 && this.props.uploadProductFileToServer("PRODUCT", e.target.files[0]) } }
                                type="file"
                            />
                            <label htmlFor="upload">
                              <IconButton component="p" color="primary" disabled={product.img.length >= 3 ? true : false }>
                                <CameraAltIcon />
                              </IconButton>
                            </label>
                        </div>
                    </div>

              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <IconButton style={{float: 'right', marginTop: -10}} color="primary" onClick={ this.handleEdit }>
                  { !showEdit ? <EditIcon />
                    : <CheckIcon style={{ color: 'green' }} /> }
                </IconButton><br />
                  <Typography variant="h1">{ product.name}

                  </Typography><br />
                  <Typography variant="h3">{ locale.wording.marg}
                      <span style={{ float: 'right' }}>
                        {cvtNumToUserPref( product.selling_price - product.buying_price)}&nbsp;
                        { product.currency.value }
                      </span>
                  </Typography>
                  <br />
                  <Typography variant="subtitle1">{ locale.wording.buying_price}
                      <span style={{ float: 'right' }}>
                        {cvtNumToUserPref(product.buying_price)}&nbsp;
                        { product.currency.value }
                      </span>
                  </Typography>
                  <Typography variant="subtitle1">{ locale.wording.selling_price}
                      <span style={{ float: 'right' }}>
                        {cvtNumToUserPref(product.selling_price)}&nbsp;
                        { product.currency.value }
                      </span>
                  </Typography>
                  <Typography variant="subtitle1">{ locale.wording.stock}
                      <span style={{ float: 'right' }}>
                        {product.stock}
                      </span>
                  </Typography>
                  <Typography variant="subtitle1">{ locale.wording.category}
                      <span style={{ float: 'right' }}>
                        {product.category[localStorage.getItem("locale")]}
                      </span>
                  </Typography>

              </Grid>
          </Grid>
          <br />
          <br />
          {
            showEdit ?
            <div>

            <Grid container spacing={8}>
                      <Grid item xs={12} sm={4} md={4}>
                      <TextField variant="filled"
                          label={locale.wording.name}
                          fullWidth
                          className={classes.margin}
                          margin="dense"
                          required
                          value={ product.name}
                          onChange={ (e) => {this.props.createState(reducer, "name",  e.target.value)} }/>
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <EditSelect
                            arrayField={categories || []}
                            field="category"
                            handleAction={ (e) => {this.props.createState(reducer, "category",  e.target.value)} }
                            locale={locale}
                            showEdit={true}
                            required={true}
                            variant="filled"
                            label={locale.wording.category }
                            value={  product.category && product.category[localStorage.getItem("locale")] }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                      <EditSelect
                          arrayField={currency || []}
                          field="currency"
                          handleAction={ (e) => {this.props.createState(reducer, "currency",  e.target.value)} }
                          locale={locale}
                          required={true}
                          showEdit={true}
                          variant="filled"
                          label={locale.wording.currency }
                          value={  product.currency && product.currency[localStorage.getItem("locale")] }
                      />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>

                            <TextField  variant="filled"
                                label={locale.wording.buying_price +' ('+ product.currency.value +')' }
                                fullWidth
                                required
                                className={classes.margin} margin="dense"
                                value={ cvtToLocale(product.buying_price) }
                                onChange={ (e) => {this.props.createState(reducer, "buying_price",  e.target.value)} }
                                />
                      </Grid>

                      <Grid item xs={12} sm={4} md={4}>
                      <TextField variant="filled"
                            label={locale.wording.selling_price +' ('+ product.currency.value +')' }
                            fullWidth
                            required
                            className={classes.margin}
                            margin="dense"
                            value={ cvtToLocale(product.selling_price)}
                            onChange={ (e) => {this.props.createState(reducer, "price",  e.target.value)} }
                            />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <TextField  variant="filled"
                          label={locale.wording.stock }
                          fullWidth
                          type="number"
                          className={classes.margin}
                          margin="dense"
                          value={ product.stock }
                          onChange={ (e) => {this.props.createState(reducer, "stock",  e.target.value)} }
                                  />
                      </Grid>
                      <Grid item xs={12}>
                              <TextField variant="filled"
                                label={locale.wording.description }
                                fullWidth
                                multiline
                                rows={6}
                                className={classes.margin}
                                margin="normal"
                                value={ product.description }
                                onChange={ (e) => {this.props.createState(reducer, "description",  e.target.value)} }
                      />
                      </Grid>
            </Grid>
            </div>
            : null
          }
          <br />
          <div>
            <Typography variant="caption">
              { locale.wording.description} :
            </Typography>
            <Typography variant="body2">{product.description}</Typography>
          </div>

        </ApxPaper>
      )
    }
}


const styles = theme => ({
  mainImgWrap: {
    textAlign: "center",
    position: 'relative',
    height: 300,
    padding: 12,
    // backgroundColor: theme.palette.lightSecondary,
    borderRadius: 4,
    [theme.breakpoints.down('sm')]: {
      height: 200
    }
  },
  input: {
    display: "none"
  }
})

const mapStateToProps = (state) => {
  return {
      locale: state.locale.locale,
      isFetching: state.library.product.isFetching,
      isUpdating: state.library.product.isUpdating,
      product: state.library.product.item,
      categories: state.account.company.item ? state.account.company.item.category_name : [],
      currency: state.helper.items.currency


  }
}

const StyledShowProduct = withStyles(styles)(ShowProduct)

export default connect(mapStateToProps, { getItem , resetState, updateItem, createState, removeImageFromArray, uploadProductFileToServer })(StyledShowProduct);
