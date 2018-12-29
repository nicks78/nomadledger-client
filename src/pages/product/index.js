//manager/src/pages/product/index.js

import React, { Component } from 'react'
import { createItem, getItemList, getItem, createState, getTotal } from '../../redux/actions'
import {connect} from 'react-redux'
import { withStyles, Grid, Button} from '@material-ui/core';
import { Spinner, ApxAlert} from '../../components/common'
import AddProduct from './addProduct'
import ProductCard from './productCard'

const styles = theme =>  ({
    container: {
    },
    link: {
        color: '#ef6c00',
        cursor: 'pointer'
    },
    sidebar: {
        height: '100vh',
        boxShadow: '2px 0 10px -5px black',
        zIndex: 3
    },
    content: {
        backgroundColor: 'rgb(240, 240, 240)',
        zIndex: 1,
    },
    loadMore: {
        marginTop: 24,
        marginBottom: 24
    },
    button: {
        width: '100%'
    }
})



class Product extends Component {


    state = {
        showProduct: false,
        reducer: 'PRODUCT',
        limit: 6,
        keyLocation: ''
    }

    componentDidMount(){
        if( this.props.receivedAt === null ){
            this.props.getTotal(this.state.reducer)
            this.props.getItemList(this.state.reducer, `?limit=${this.state.limit}&skip=0`);
        }
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.key !== this.state.keyLocation){
            this.setState({ showProduct: false, keyLocation: nextProps.location.key })
        }
    }

    hanldeLoadMore = () => {
        this.props.getItemList(this.state.reducer, `?limit=${this.state.limit + 6 }&skip=0`);
        this.setState({ limit: this.state.limit + 6 });
    }

    render() {
    
    const {listProducts, isFetching, isError,  locale, newProduct, createState, createItem, isCreating, category, classes } = this.props

    if( isFetching ){
        return <Spinner />
    }
    if( isError ){
        return <ApxAlert message="Erreur message" />
    }


    
    return (
        <div style={styles.container}>

            <AddProduct category={category}locale={ locale } initData="" newData={newProduct} createItemState={ createState } createItem={ createItem } isCreating={ isCreating  }/>
            
            <Grid container spacing={24}>
            {
                listProducts.map((product, index) => {
                    return <Grid item xs={12} sm={6} md={3}  key={index}>
                                <ProductCard  product={product} />
                            </Grid>
                })
                
            }
            </Grid>
            
            <div className={ classes.loadMore }>
                <Button variant="outlined" color="secondary" className={classes.button} onClick={ this.hanldeLoadMore }>
                    {locale.page.product.load_more_product}
                </Button>
            </div>
            
        </div>
    )
  }
}




const mapStateToProps = (state) => {
    return {
        isFetching: state.library.product.isFetching,
        isError: state.library.product.isError,
        isCreating: state.library.product.isCreating,
        listProducts: state.library.product.list,
        receivedAt: state.library.product.receivedAt,
        locale: state.locale.locale,
        newProduct: state.library.product.tmp_state,
        product: state.library.product.item,
        category: state.account.company.item && state.account.company.item.category_name,
        total: state.library.product.total
    }
}

const StyledProduct = withStyles(styles)(Product)

export default connect(mapStateToProps, { createItem, getItemList, getItem, createState, getTotal  })(StyledProduct);