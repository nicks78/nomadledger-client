//manager/src/pages/Contact/index.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createItem, getItemList, getItem, createState } from '../../redux/high-order-component'
import { Spinner, ApxAlert} from '../../components/common'
import AddContact from './addContact'
// import IconButton from '@material-ui/core/IconButton';
// import ArrowBackIcon from '@material-ui/icons/ArrowBackOutlined'
import Table from '../../components/lib/table'


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
    
    const {listContacts, isFetching, isError, locale, createItem, createState, newContact, isCreating, progress} = this.props
    
    if(isFetching){
        return <Spinner />
    }
   
    if(isError){
        return <ApxAlert message="Erreur message" reducer={ this.state.reducer }/>
    }

    const tableIndex = [
        {
            label: locale.form.field.company,
            field: 'company',
            type: 'text',
            numeric: false
        },
        {
            label: locale.form.field.firstname +'/'+ locale.form.field.lastname,
            field: 'firstname',
            type: 'text',
            numeric: false
        },
        {
            label: locale.form.field.email,
            field: 'email',
            type: 'text',
            numeric: false
        },
        {
            label: locale.form.field.phone,
            field: 'phone',
            type: 'number',
            numeric: true
        },
        
    ]



    return (
        <div style={styles.container}>
            <AddContact progress={progress} locale={ locale } createContact={ createItem } createContactState={  createState } newData={newContact} isCreating={ isCreating  }/>     
            <Table 
                listData={listContacts} 
                tableIndex={tableIndex} 
                isFetching={isFetching} 
                reducer={this.state.reducer}/>    
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
        isFetching: state.library.contact.isFetching,
        isCreating: state.library.contact.isCreating,
        isError: state.library.contact.isError,
        listContacts: state.library.contact.list,
        receivedAt: state.library.contact.receivedAt,
        locale: state.locale.locale,
        newContact: state.library.contact.tmp_state,
        progress: state.library.contact.progress
    }
}


export default connect(mapStateToProps, { createItem, getItemList, getItem, createState })(Contact);