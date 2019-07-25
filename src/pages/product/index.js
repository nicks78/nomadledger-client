//manager/src/pages/product/index.js

import React, { Component } from 'react'
import { createItem, getItemList, getItem, createState, resetState , deleteElement, duplicateItem} from '../../redux/library/actions'
import {connect} from 'react-redux'
import { withStyles, Grid, Typography, Hidden} from '@material-ui/core';
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
    },
    title: {
      marginTop: 24,
      marginBottom: 24
    },
})



class Product extends Component {


    state = {
        reducer: 'PRODUCT',
        limit: 8,
        skip: 0,
        height: window.innerHeight,
        receivedAt: null,
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
      if(this.state.receivedAt !== nextProps.receivedAt ){
        this.setState({
          listProducts: this.removeDuplicate(nextProps.listProducts),
          receivedAt: nextProps.receivedAt
        })
        }
    }

    removeDuplicate = (items) => {
        
        const uniqueAddresses = Array.from(new Set(items.map(a => a._id)))
            .map(id => {
            return items.find(a => a._id === id)
        })
        return uniqueAddresses
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
        this.props.getItemList(this.state.reducer, `list?limit=${this.state.limit}&skip=${this.state.skip + 8}`);
        this.setState({ skip: this.state.skip + 8 });
    }

    handleDelete = (productId) => {
        var bool = window.confirm(this.props.locale.message.confirm_delete);
        if(bool){
            this.props.deleteElement(this.state.reducer, `delete/${productId}`)
        }
    }

    handleDuplicateItem = (product) => {
        this.setState({ receivedAt: null })
      this.props.duplicateItem(this.state.reducer, product)
    }

    render() {

    const { isFetching, locale, newProduct, createState, createItem, isCreating, category, classes, currency } = this.props
    const {listProducts} = this.state
console.log(listProducts)
    return (
        <div style={styles.container}>
            <Hidden smUp><Typography variant="h1" align="center" className={classes.title}>{locale.product.name}</Typography></Hidden>
            <AddProduct
                category={category}
                locale={ locale }
                currency={currency}
                newData={newProduct}
                createItemState={ createState }
                createItem={ createItem }
                isCreating={ isCreating  }/>

            <Grid container spacing={24}>
            {   listProducts.length > 0 && 
                listProducts.map((product, index) => {
                    return <Grid item xs={12} sm={6} md={3}  key={index}>
                                <ProductCard
                                    product={product}
                                    locale={locale}
                                    onDeleteProduct={ this.handleDelete }
                                    duplicateItem={ this.handleDuplicateItem }
                                    />
                            </Grid>
                })

            }
            </Grid>
            {
                isFetching ?
                <Spinner />
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

export default connect(mapStateToProps, { createItem, getItemList, getItem, createState, resetState, deleteElement, duplicateItem  })(StyledProduct);
