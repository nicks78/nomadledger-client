//manager/src/pages/product/index.js

import React, { Component } from 'react'
import { createItem, getItemList, getItem, createState, resetState , deleteElement} from '../../redux/library/actions'
import {connect} from 'react-redux'
import { withStyles, Grid, Button} from '@material-ui/core';
import Spinner from '../../components/common/spinner'
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
        reducer: 'PRODUCT',
        limit: 8,
        skip: 0,
        height: window.innerHeight,
        receivedAt: "",
        listProducts: []
    }

    componentDidMount(){
        this.props.getItemList(this.state.reducer, `list?limit=${this.state.limit}&skip=0`);
        // Set scroll event
        var el = document.getElementById("scrollable");
        el.addEventListener("scroll", this.handleScroll )
    }

    componentWillUnmount(){
        this.props.resetState(this.state.reducer);
        var el = document.getElementById("scrollable");
        el.removeEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps){
      if(this.state.receivedAt !== nextProps.receivedAt )
        this.setState({
          listProducts: [...this.state.listProducts, ...nextProps.listProducts],
          receivedAt: nextProps.receivedAt
        })
    }

    handleScroll = (event) => {
      var el = document.getElementById('scrollable');

      const offsetHeight = el.offsetHeight;
      const scrollHeight = el.scrollHeight;
      const scrollTop = el.scrollTop;
      const toBottom = offsetHeight + scrollTop

      if( toBottom  >=  scrollHeight ) {
        if( !this.props.isFetching && this.state.listProducts.length < this.props.total){
            this.hanldeLoadMore()
        }
      }
    }

    hanldeLoadMore = () => {
        this.props.getItemList(this.state.reducer, `list?limit=${this.skip.limit}&skip=${this.state.skip}`);
        this.setState({ skip: this.state.skip + 8 });
    }

    handleDelete = (productId) => {
        var bool = window.confirm(this.props.locale.message.confirm_delete);
        if(bool){
            this.props.deleteElement(this.state.reducer, `delete/${productId}`)
        }
    }

    render() {

    const {listProducts, isFetching,total,  locale, newProduct, createState, createItem, isCreating, category, classes, currency } = this.props

    if( isFetching ){
        return <Spinner />
    }



    return (
        <div style={styles.container}>

            <AddProduct
                category={category}
                locale={ locale }
                currency={currency}
                newData={newProduct}
                createItemState={ createState }
                createItem={ createItem }
                isCreating={ isCreating  }/>

            <Grid container spacing={24}>
            {
                listProducts.map((product, index) => {
                    return <Grid item xs={12} sm={6} md={3}  key={index}>
                                <ProductCard  product={product} locale={locale} onDeleteProduct={ this.handleDelete }/>
                            </Grid>
                })

            }
            </Grid>
            {
                total > 10 ?
                <div className={ classes.loadMore }>
                    <Button variant="outlined" color="secondary" className={classes.button} onClick={ this.hanldeLoadMore }>
                        {locale.wording.load_more_product}
                    </Button>
                </div>
                : null
            }


        </div>
    )
  }
}




const mapStateToProps = (state) => {
    return {
        isFetching: state.library.product.isFetching,
        isCreating: state.library.product.isCreating,
        listProducts: state.library.product.list,
        receivedAt: state.library.product.receivedAt,
        locale: state.locale.locale,
        newProduct: state.library.product.tmp_state,
        product: state.library.product.item,
        category: state.account.company.item && state.account.company.item.category_name,
        total: state.library.product.total,
        currency: state.helper.items.currency,

    }
}

const StyledProduct = withStyles(styles)(Product)

export default connect(mapStateToProps, { createItem, getItemList, getItem, createState, resetState, deleteElement  })(StyledProduct);
