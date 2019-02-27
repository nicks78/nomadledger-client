//manager/src/pages/product/showProduct.js

import React from 'react'
import {connect} from 'react-redux'
import {API_ENDPOINT} from '../../redux/constant'
import { getItem, resetState } from '../../redux/library/actions'
import { withStyles, Typography, Grid} from '@material-ui/core';

import {ApxAlert, Spinner, ApxPaper, ApxBackBtn} from '../../components/common'


class ShowProduct extends React.Component {

  componentDidMount(){
      var id = this.props.match.params.id;
      this.props.getItem("PRODUCT", id)
  }

  render() {

    const {classes, product, isFetching, locale, isError, message} = this.props
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
                <Grid item  xs={12} sm={5} md={5} style={{ paddingLeft: 24}}>
                    <Typography variant="h1">{ product.name}</Typography><br />
                    <Typography variant="h3">{locale.form.field.selling_price} :<span className={classes.span}>{ product.price} {product.currency.value}</span></Typography><br />
                    <Typography variant="h3">{locale.form.field.buying_price} : <span className={classes.span}>{ product.buying_price} {product.currency.value}</span></Typography><br />
                    <Typography variant="h3">{locale.form.field.category} : <span className={classes.span}>{ product.category[localStorage.getItem('locale')]}</span></Typography><br />
                    <Typography variant="h3">{locale.form.field.stock} : <span className={classes.span}>{ product.stock}</span></Typography><br />
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={24}>
                <Grid item xs={12} sm={7} md={7}>
                  <Typography variant="body1">{ product.description}</Typography>
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
    float: 'right'
  }
})

const mapStateToProps = (state) => {
  return {
      locale: state.locale.locale,
      isFetching: state.library.product.isFetching,
      isError: state.library.product.isError,
      message: state.library.product.message,
      product: state.library.product.item
      
  }
}

const StyledShowProduct = withStyles(styles)(ShowProduct)

export default connect(mapStateToProps, { getItem , resetState })(StyledShowProduct);


