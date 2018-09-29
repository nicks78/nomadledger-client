//manager/src/pages/product/index.js

import React, { Component } from 'react'
import { getProviders, createProviderState, getProvider } from './actions'
import {connect} from 'react-redux'
import {ApxTable, Spinner, ApxAlert} from '../../components/common'
import ShowProvider from './showProvider'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBackOutlined'
import AddProvider from './addProvider'

class Provider extends Component {


    state = {
        showProvider: false,
        keyLocation: ''
    }

    componentDidMount(){
        if( this.props.receivedAt === null )
            this.props.getProviders();
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.key !== this.state.keyLocation){
            this.setState({ showProvider: false, keyLocation: nextProps.location.key })
        }
    }

    renderSingleProvider = (id) => {
        var {provider }= this.props
        this.setState({ showProvider: true })
        if( provider && provider._id === id ){
            return;
        }else{
            this.props.getProvider(id);
        }
    }

    returnToList = () => {
        this.setState({ showProvider: false })
    }

    render() {
    
    const {listProviders, isFetching, isError,  locale, provider, newProvider } = this.props
    const { showProvider } = this.state

    if(isFetching){
        return <Spinner />
    }
    if(isError){
        return <ApxAlert message="Erreur message" />
    }

    var tableRow = 
        listProviders.map((row, index) => {
        return (
          <TableRow key={index}>
            <TableCell onClick={ () => { this.renderSingleProvider(row._id) } }><span  style={ styles.link }>{row.firstname}</span></TableCell>
          </TableRow>
        );
      })

    return (
        <div style={styles.container}>
            {
                showProvider ? 
                    <IconButton onClick={ this.returnToList }><ArrowBackIcon/></IconButton>
                : <AddProvider locale={ locale } initData="" newData={newProvider} createItemState={ this.props.createProviderState } createItem={ () => {alert('new provider')} }/>
            }
            {
                showProvider ?
                    <ShowProvider provider={ provider } />
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
        isFetching: state.provider.isFetching,
        isError: state.provider.isError,
        listProviders: state.provider.listProviders,
        receivedAt: state.provider.receivedAt,
        locale: state.locale.locale,
        newProvider: state.provider.newProvider,
        provider: state.provider.provider
    }
}


export default connect(mapStateToProps, { getProviders, createProviderState, getProvider })(Provider);