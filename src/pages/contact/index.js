//manager/src/pages/Contact/index.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createItem, getItemList, getItem, createState } from '../../redux/high-order-component'
import {ApxTable, Spinner, ApxAlert} from '../../components/common'
import AddContact from './addContact'
import ShowContact from './showContact'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBackOutlined'



class Contact extends Component {


    state = {
        showContact: false,
        reducer: 'CONTACT',
        keyLocation: ''
    }

    componentDidMount(){
        
        if( this.props.receivedAt === null  )
            this.props.getItemList(this.state.reducer)
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.key !== this.state.keyLocation){
            this.setState({ showContact: false, keyLocation: nextProps.location.key })
        }
    }

    renderSingleContact = (id) => {
        var {contact }= this.props
        this.setState({ showContact: true })
        if( contact && contact._id === id ){
            return;
        }else{
            this.props.getItem(this.state.reducer, id);
        }
    }

    returnToList = () => {
        this.setState({ showContact: false })
    }

    render() {
    
    const {listContacts, isFetching, isError, contact, locale, createItem, createState, newContact, isCreating} = this.props
    const { showContact } = this.state

    if(isFetching){
        return <Spinner />
    }
    if(isError){
        return <ApxAlert message="Erreur message" reducer={ this.state.reducer }/>
    }

    var tableRow = 
        listContacts.map((row, index) => {
        return (
          <TableRow key={index}>
            <TableCell onClick={ () => { this.renderSingleContact(row._id) } }><span  style={ styles.link }>{row.company}</span></TableCell>
            <TableCell>{row.firstname}&nbsp;{row.lastname}</TableCell>
            <TableCell numeric>{row.createAt}</TableCell>
            <TableCell>{row.email}</TableCell>
          </TableRow>
        );
      })

    return (
        <div style={styles.container}>

            {
                showContact ? 
                    <IconButton onClick={ this.returnToList }><ArrowBackIcon/></IconButton>
                : <AddContact locale={ locale } createContact={ createItem } createContactState={  createState } newData={newContact} isCreating={ isCreating  }/>
            }
            {
                showContact ?
                    <ShowContact contact={ contact } />
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
    console.log('STATE', state.library)
    return {
        isFetching: state.library.contact.isFetching,
        isCreating: state.library.contact.isCreating,
        isError: state.library.contact.isError,
        listContacts: state.library.contact.list,
        receivedAt: state.library.contact.receivedAt,
        locale: state.locale.locale,
        contact: state.library.contact.item,
        newContact: state.library.contact.tmp_state
    }
}


export default connect(mapStateToProps, { createItem, getItemList, getItem, createState })(Contact);