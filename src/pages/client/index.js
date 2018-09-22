//manager/src/pages/client/index.js

import React, { Component } from 'react'
import {getClients, getClient} from './actions'
import {connect} from 'react-redux'
import {ApxTable, Spinner, ApxAlert} from '../../components/common'
import AddClient from './addClient'
import ShowClient from './showClient'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';



class Client extends Component {


    state = {
        showClient: false,
    }

    componentDidMount(){
        if( this.props.receivedAt === null )
            this.props.getClients();
    }

    renderSingleClient = (id) => {
        var {client }= this.props
        this.setState({ showClient: true })
        if( client && client._id === id ){
            return;
        }else{
            this.props.getClient(id);
        }
    }

    render() {
    
    const {listClients, isFetching, isError, client} = this.props

    if(isFetching){
        return <Spinner />
    }
    if(isError){
        return <ApxAlert message="Erreur message" />
    }

    var tableRow = 
        listClients.map((row, index) => {
        return (
          <TableRow key={index}>
            <TableCell onClick={ () => { this.renderSingleClient(row._id) } }>{row.company.name}</TableCell>
            <TableCell>{row.firstname}&nbsp;{row.lastname}</TableCell>
            <TableCell numeric>{row.phone}</TableCell>
            <TableCell>{row.email}</TableCell>
          </TableRow>
        );
      })

    return (
        <div style={styles.container}>
            
            <AddClient locale={ this.props.locale } initData=""/>
            <br />
            {
                this.state.showClient ?
                    <ShowClient client={ client }/>
                : <ApxTable isFetching={isFetching} tableRow={ tableRow }/>
            }
            
            
        </div>
    )
  }
}


const styles = {
    container: {
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
        isFetching: state.client.isFetching,
        isError: state.client.isError,
        listClients: state.client.listClients,
        receivedAt: state.client.receivedAt,
        locale: state.locale.locale,
        client: state.client.client
    }
}


export default connect(mapStateToProps, {getClients, getClient})(Client);