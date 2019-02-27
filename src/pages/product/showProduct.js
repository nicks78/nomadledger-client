//manager/src/pages/product/showProduct.js

import React from 'react'
import {connect} from 'react-redux'
import {API_ENDPOINT} from '../../redux/constant'
import { getItem, resetState, updateItem } from '../../redux/library/actions'
import { withStyles, Typography, Grid, TextField} from '@material-ui/core';
import {ExpandLessOutlined, ExpandMoreOutlined} from '@material-ui/icons'
import {ApxAlert, Spinner, ApxPaper, ApxBackBtn} from '../../components/common'
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

    const {classes, product, isFetching, locale, isError, message, categories} = this.props
    if( isFetching ){
      return <Spinner/>
    }
    if( !product ){
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
                        <img src={ `${API_ENDPOINT}image/view${product.img[0] && product.img[0].path}`} className={classes.img} width="auto" alt="plp" />
                      </div>

                    <div className={classes.thumbnailWrap} >
                    {
                      product.img.map((x, index) => {
                          return <div key={index} className={ classes.thumbnail }>
                                    <img src={ `${API_ENDPOINT}image/view${x.path}`} className={classes.img} width="100" alt="img" />
                                </div>
                      })
                    }
                    </div>
                </Grid>
                <Grid item  xs={12} sm={5} md={5}>
                <EditSelect  
                        arrayField={categories}
                        field="category"
                        handleAction={ this.props.updateItem("PRODUCT", "") }
                        locale={locale}
                        showEdit={true}
                        variant="outlined"
                        label={locale.form.field.category }
                        value={  product.category && product.category[localStorage.getItem("locale")] }
                    />
                    <TextField variant="outlined" 
                                label={locale.form.field.name} 
                                fullWidth
                                className={classes.margin} 
                                margin="dense" 
                                value={ product.name} 
                                onChange={ () => {this.props.updateItem("PRODUCT", "")} } />
                    <TextField  variant="outlined" 
                                label={locale.form.field.buying_price +' ('+ product.currency.value +')' } 
                                fullWidth
                                className={classes.margin} margin="dense" 
                                value={ product.buying_price} 
                                onChange={ () => {this.props.updateItem("PRODUCT", "")} } 
                                />   
                    <TextField variant="outlined" 
                                label={locale.form.field.selling_price +' ('+ product.currency.value +')' } 
                                fullWidth
                                className={classes.margin} 
                                margin="dense" 
                                value={ product.price} 
                                onChange={ () => {this.props.updateItem("PRODUCT", "")} } 
                                />
                    <TextField variant="outlined" 
                                label={locale.form.field.marg +' ('+ product.currency.value +')' } 
                                fullWidth
                                className={classes.margin} 
                                margin="dense" 
                                disabled
                                value={ product.price - product.buying_price } 
                                onChange={ () => {this.props.updateItem("PRODUCT", "")} } 
                      />

                    <div className={classes.stockWrap}>
                          <p className={classes.span}>
                            <ExpandLessOutlined onClick={ () => { this.props.updateItem("PRODUCT", `remove/add/stock/up`)} } /><br />
                            <span>{ product.stock}</span><br />
                            <ExpandMoreOutlined onClick={ () => { this.props.updateItem("PRODUCT", `remove/add/stock/down`)} }/>
                            </p>  
                            

                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={24}>
                <Grid item xs={12} sm={7} md={7}>
                      <TextField variant="outlined" 
                                label={locale.form.field.description } 
                                fullWidth
                                multiline
                                rows={6}
                                className={classes.margin} 
                                margin="normal"
                                value={ product.description } 
                                onChange={ () => {this.props.updateItem()} } 
                      />
                </Grid>
            </Grid>
            
            
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
    maxHeight: '100%',
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

  stockWrap: {

  }
})

const mapStateToProps = (state) => {
  return {
      locale: state.locale.locale,
      isFetching: state.library.product.isFetching,
      isError: state.library.product.isError,
      message: state.library.product.message,
      product: state.library.product.item,
      categories: state.account.company.item ?  state.account.company.item.category_name : []
      
  }
}

const StyledShowProduct = withStyles(styles)(ShowProduct)

export default connect(mapStateToProps, { getItem , resetState, updateItem })(StyledShowProduct);


