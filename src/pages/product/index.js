//manager/src/pages/product/index.js

import React, { Component } from 'react'
import {getProducts, createProductState, getProduct } from './actions'
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
        keyLocation: ''
    }

    componentDidMount(){
        if( this.props.receivedAt === null )
            this.props.getProducts();
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
            this.props.getProduct(id);
        }
    }

    returnToList = () => {
        this.setState({ showProduct: false })
    }

    render() {
    
    const {listProducts, isFetching, isError,  locale, product, newProduct } = this.props
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
            <TableCell>{row.name}</TableCell>
            <TableCell numeric>{row.description.slice(0, 20)}</TableCell>
            <TableCell>{row.price}</TableCell>
          </TableRow>
        );
      })

    return (
        <div style={styles.container}>
            {
                showProduct ? 
                    <IconButton onClick={ this.returnToList }><ArrowBackIcon/></IconButton>
                : <AddProduct locale={ locale } initData="" newData={newProduct} createItemState={ this.props.createProductState } createItem={ () => {alert('new product')} }/>
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
        isFetching: state.product.isFetching,
        isError: state.product.isError,
        listProducts: state.product.listProducts,
        receivedAt: state.product.receivedAt,
        locale: state.locale.locale,
        newProduct: state.product.newProduct,
        product: state.product.product
    }
}


export default connect(mapStateToProps, { getProducts, createProductState, getProduct })(Product);