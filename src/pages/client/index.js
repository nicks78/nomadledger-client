//manager/src/pages/client/index.js

import React, { Component } from 'react'
import {getClients, getClient, createClient, createClientState} from './actions'
import {connect} from 'react-redux'
import {ApxTable, Spinner, ApxAlert} from '../../components/common'
import AddClient from './addClient'
import ShowClient from './showClient'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBackOutlined'

class Client extends Component {


    state = {
        showClient: false,
        keyLocation: ''
    }

    componentDidMount(){
        if( this.props.receivedAt === null )
            this.props.getClients();
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.key !== this.state.keyLocation){
            this.setState({ showClient: false, keyLocation: nextProps.location.key })
        }
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

    returnToList = () => {
        this.setState({ showClient: false })
    }

    render() {
    
    const {listClients, isFetching, isError, client, locale, createClient, createClientState, newClient} = this.props
    const { showClient } = this.state

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
            <TableCell onClick={ () => { this.renderSingleClient(row._id) } }><span  style={ styles.link }>{row.company.name}</span></TableCell>
            <TableCell>{row.firstname}&nbsp;{row.lastname}</TableCell>
            <TableCell numeric>{row.phone}</TableCell>
            <TableCell>{row.email}</TableCell>
          </TableRow>
        );
      })

    return (
        <div style={styles.container}>

            {
                showClient ? 
                    <IconButton onClick={ this.returnToList }><ArrowBackIcon/></IconButton>
                : <AddClient locale={ locale } createClient={ createClient } createClientState={ createClientState } newData={newClient} />
            }
            {
                showClient ?
                    <ShowClient client={ client } />
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
        isFetching: state.client.isFetching,
        isError: state.client.isError,
        listClients: state.client.listClients,
        receivedAt: state.client.receivedAt,
        locale: state.locale.locale,
        client: state.client.client,
        newClient: state.client.newClient
    }
}


export default connect(mapStateToProps, { getClients, getClient, createClient, createClientState })(Client);