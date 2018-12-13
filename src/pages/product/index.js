//manager/src/pages/product/index.js

import React, { Component } from 'react'
import { createItem, getItemList, getItem, createState } from '../../redux/actions'
import {connect} from 'react-redux'
import {ApxTable, Spinner, ApxAlert} from '../../components/common'
import ShowProduct from './showProduct'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBackOutlined'
import AddProduct from './addProduct'

class Product extends Component {


    state = {
        showProduct: false,
        reducer: 'PRODUCT',
        keyLocation: ''
    }

    componentDidMount(){
        if( this.props.receivedAt === null )
            this.props.getItemList(this.state.reducer);
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.key !== this.state.keyLocation){
            this.setState({ showProduct: false, keyLocation: nextProps.location.key })
        }
    }

    renderSingleProduct = (id) => {
        var {product }= this.props
        this.setState({ showProduct: true })
        if( product && product._id === id ){
            return;
        }else{
            this.props.getItem(this.state.reducer, id);
        }
    }

    returnToList = () => {
        this.setState({ showProduct: false })
    }

    render() {
    
    const {listProducts, isFetching, isError,  locale, product, newProduct, createState, createItem, isCreating, category } = this.props
    const { showProduct } = this.state

    if(isFetching){
        return <Spinner />
    }
    if(isError){
        return <ApxAlert message="Erreur message" />
    }

    var tableRow = 
        listProducts.map((row, index) => {
        return (
          <TableRow key={index}>
            <TableCell onClick={ () => { this.renderSingleProduct(row._id) } }><span  style={ styles.link }>{row.ref}</span></TableCell>
            <TableCell>{row.product_name}</TableCell>
            <TableCell numeric>{row.description}</TableCell>
            <TableCell>{row.price}</TableCell>
          </TableRow>
        );
      })

    return (
        <div style={styles.container}>
            {
                showProduct ? 
                    <IconButton onClick={ this.returnToList }><ArrowBackIcon/></IconButton>
                : <AddProduct category={category}locale={ locale } initData="" newData={newProduct} createItemState={ createState } createItem={ createItem } isCreating={ isCreating  }/>
            }
            {
                showProduct ?
                    <ShowProduct product={ product } />
                : <ApxTable isFetching={isFetching} tableRow={ tableRow }/>
            }          
            
        </div>
    )
  }
}


const styles =  {
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
        category: state.account.company.item && state.account.company.item.category_name
    }
}


export default connect(mapStateToProps, { createItem, getItemList, getItem, createState  })(Product);