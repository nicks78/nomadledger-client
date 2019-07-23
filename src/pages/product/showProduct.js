//manager/src/pages/product/showProduct.js

import React from 'react'
import {connect} from 'react-redux'
import {setNotification} from '../../redux/notification/actions'
import { getItem, resetState, updateItem, createState, removeImageFromArray, uploadProductFileToServer } from '../../redux/library/actions'
import { withStyles, Typography, Grid, TextField, IconButton, Button } from '@material-ui/core';
import ApxBackBtn from '../../components/common/backBtn'
import Spinner from '../../components/common/spinner'
import ApxPaper from '../../components/common/paper'
import ApxAlert from '../../components/common/alert'
import EditSelect from '../../lib/editSelect';
import CameraAltIcon from '@material-ui/icons/CameraAltOutlined'
import CarouselProduct from './carouselProduct'
import LinearProgress from '@material-ui/core/LinearProgress'
import {resizeFile} from '../../utils/resizeFile'



class ShowProduct extends React.Component {

    state = {
      reducer: "PRODUCT",
      width: window.innerWidth
    }

  componentDidMount(){
      var id = this.props.match.params.id;
      this.props.getItem(this.state.reducer, id);
      window.addEventListener("resize",  this.catchWidth )
  }

  catchWidth = () => {
    this.setState({ width: window.innerWidth })
  }

  componentWillUnmount(){
    this.props.resetState(this.state.reducer)
  }

  handleImageUpload = (file) => {
    if(!file){return;}
    resizeFile( file, this.callBackUpload )
  }

  callBackUpload = (file) => {
    this.props.uploadProductFileToServer("PRODUCT", file)
  }

  render() {

    const {classes, product, isFetching, locale, categories, currency, isUploading, progress, isUpdating} = this.props;
    const {reducer} = this.state;

    if( isFetching ){
      return <Spinner/>
    }

    if( product === null  ){
      return <ApxAlert message="error_404" />
    }

      return (
        <ApxPaper styled={{padding: window.innerWidth <= 500 ? 12 : 24}}>

          <ApxBackBtn/>
          <Typography variant="h1" align="center">{product.name}</Typography>
          <br />
          <Grid container>
              <Grid item xs={12} className={classes.thumbnail}>

                    <div className={classes.mainImgWrap}>
                        <CarouselProduct
                          images={product.img}
                          removeImageFromArray={this.props.removeImageFromArray}
                          reducer={reducer}
                          locale={locale}
                          productId={product._id}
                        />

                        <div className={classes.button}>
                            <input
                                accept="image/*"
                                disabled={ product.img.length >= 3 || isUploading? true : false }
                                className={classes.input}
                                id="upload"
                                name="img"
                                onChange={ (e) => { this.handleImageUpload(e.target.files[0]) } }
                                type="file"
                            />
                            <label htmlFor="upload">
                              <IconButton component="p" color="primary" disabled={product.img.length >= 3 || isUploading ? true : false }>
                                <CameraAltIcon />
                              </IconButton>
                            </label>
                            { isUploading ? <LinearProgress color="secondary" variant="determinate" value={ progress  } /> : null }
                        </div>
                    </div>

              </Grid>

          </Grid>
<br /><br /><br />
            <Grid container spacing={8}>
                      <Grid item xs={12} sm={4} md={4}>
                        <TextField variant="outlined"
                          label={locale.wording.name}
                          fullWidth
                          margin="dense"
                          required
                          style={{ marginBottom: 15, marginTop: 0, fontWeight: 300 }}
                          value={ product.name}
                          onChange={ (e) => {this.props.createState(reducer, "name",  e.target.value)} }
                        />
                        <EditSelect
                            arrayField={currency || []}
                            field="currency"
                            handleAction={ (e) => {this.props.createState(reducer, "currency",  e.target.value)} }
                            locale={locale}
                            required={true}
                            showEdit={true}
                            variant="outlined"
                            margin={1}
                            label={locale.wording.currency }
                            value={  product.currency && product.currency[localStorage.getItem("locale")] }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <EditSelect
                            arrayField={categories || []}
                            field="category"
                            handleAction={ (e) => {this.props.createState(reducer, "category",  e.target.value)} }
                            locale={locale}
                            showEdit={true}
                            required={true}
                            variant="outlined"
                            label={locale.wording.category }
                            value={  product.category && product.category[localStorage.getItem("locale")] }
                        />
                        <TextField  variant="outlined"
                            label={locale.wording.buying_price +' ('+ product.currency.value +')' }
                            fullWidth
                            required
                            style={{  marginTop: -4, fontWeight: 300 }}
                            margin="dense"
                            type="number"
                            value={product.buying_price || 0 }
                            onChange={ (e) => { this.props.createState(reducer, "buying_price", e.target.value) }}
                            />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <TextField  variant="outlined"
                          label={locale.wording.stock }
                          fullWidth
                          type="number"
                          margin="dense"
                          style={{ marginBottom: 15, marginTop: 0, fontWeight: 300 }}
                          value={ product.stock }
                          onChange={ (e) => {this.props.createState(reducer, "stock",  e.target.value)} }
                        />

                      <TextField variant="outlined"
                            label={locale.wording.selling_price +' ('+ product.currency.value +')' }
                            fullWidth
                            type="number"
                            required
                            style={{  marginTop: 0, fontWeight: 300 }}
                            margin="dense"
                            value={ product.selling_price || 0 }
                            onChange={ (e) => { this.props.createState(reducer, "selling_price", e.target.value) }}
                            />
                      </Grid>

                      <Grid item xs={12}>
                              <TextField variant="outlined"
                                label={locale.wording.description }
                                fullWidth
                                multiline
                                style={{ fontWeight: 300 }}
                                rows={6}
                                margin="normal"
                                value={ product.description }
                                onChange={ (e) => {this.props.createState(reducer, "description",  e.target.value)} }
                      />
                      </Grid>
            </Grid>
            <br />
              <Button
                  variant="contained"
                  color="primary"
                  disabled={ isUpdating }
                  className={ classes.btn }
                  onClick={ () => { this.props.updateItem(this.state.reducer, `update`) } }>
                  { !isUpdating ?  locale.wording.update : locale.wording.loading }
              </Button><br />

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
    borderRadius: 4,
    [theme.breakpoints.down('sm')]: {
      height: 200
    }
  },
  input: {
    display: "none"
  },
  span: {
    float: "right",
    textTransform: "capitalize",
    marginBottom: 5,
    clear: 'right'
  },
  body1: {
    marginBottom: 5,
  },
  textField: {
    marginTop: 15
  },
  priceMarge: {
    padding: 12,
    color: "white",
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 4
  },
  btn: {
    float: 'right',
    backgroundColor: theme.palette.yellow.dark,
    minWidth: 120
  }
})

const mapStateToProps = (state) => {

  return {
      locale: state.locale.locale,
      isFetching: state.library.product.isFetching,
      isUpdating: state.library.product.isUpdating,
      isUploading: state.library.product.isUploading,
      progress: state.library.product.progress,
      product: state.library.product.item,
      categories: state.account.company.item ? state.account.company.item.category_name : [],
      currency: state.helper.items.currency


  }
}

const StyledShowProduct = withStyles(styles)(ShowProduct)

export default connect(mapStateToProps, { getItem , resetState, updateItem, createState, removeImageFromArray, uploadProductFileToServer, setNotification })(StyledShowProduct);
