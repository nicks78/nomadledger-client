//manager/src/pages/Contact/index.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Table, TableHead, TableBody, Paper, TableCell, TableRow, withStyles} from '@material-ui/core';
import {connect} from 'react-redux'
import { createItem, getItemList, getItem, createState, getTotal} from '../../redux/actions'
import { ApxAlert, ApxTableToolBar} from '../../components/common'
import AddContact from './addContact'
import Pagination from '../../lib/pagination'

const styles =  theme => ({
    container: {
    },
    tableHead: {
        backgroundColor: "rgb(238,238,238)"
    },
    paper: {
        position: 'relative',
        padding: 0,
        overflow: "hidden",
        [theme.breakpoints.down('sm')]: {
            boxShadow: 'none',
            borderRadius: 0
        },
    }
})




class Contact extends Component {


    state = {
        reducer: 'CONTACT',
        selected: [],
        keyLocation: '',
        group: ''
    }

    componentDidMount(){
        if( this.props.receivedAt === null  ){
            this.props.getTotal(this.state.reducer)
            this.props.getItemList(this.state.reducer, `?limit=5&skip=0`)
        }
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.key !== this.state.keyLocation){
            this.setState({ showContact: false, keyLocation: nextProps.location.key })
        }
    }

    componentWillUnmount() {
        // this.props.resetItem()
    }

    onSelectAllClick = (event) => {
        if (event.target.checked) {
            this.setState({ selected: this.props.listContacts.map(n => n._id) });
            return;
        }
        this.setState({ selected: [] });
    }


    onSelectedField = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {

            newSelected = newSelected.concat(selected, id);

        } else if (selectedIndex === 0) {

            newSelected = newSelected.concat(selected.slice(1));

        } else if (selectedIndex === selected.length - 1) {

            newSelected = newSelected.concat(selected.slice(0, -1));

        } else if (selectedIndex > 0) {

            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );

        }
    
        this.setState({ selected: newSelected });
    }

    handleFilterRequest = (value) => {
        this.setState({ group: value.code })
        this.props.getTotal(this.state.reducer, `?group=${value.code}`)
        this.props.getItemList(this.state.reducer, `?limit=5&skip=0&group=${value.code}`)
    }


    isSelected = id =>  this.state.selected.indexOf(id) !== -1;

    render() {
    
    const {listContacts, isFetching, isError, locale, createItem, createState, newContact, isCreating, progress, message, classes, contactGroup, rowsPerPageOptions, total} = this.props
    const { selected, rowCount, reducer } = this.state


    return (
        <div className={classes.container}>
            <AddContact progress={progress} contactGroup={contactGroup} locale={ locale } createContact={ createItem } createContactState={  createState } newData={newContact} isCreating={ isCreating  }/>
                
                { isError ?  <ApxAlert message={message} reducer={ this.state.reducer }/> : null }
                <Paper className={classes.paper}>
                    <ApxTableToolBar
                        numSelected={selected.length}
                        title={locale.table.title_contact}
                        selected={locale.table.selected}
                        menus={ contactGroup  }
                        locale={locale}
                        onChangeQuery={ this.handleFilterRequest }
                    />
                    <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            {/* <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selected.length > 0 && selected.length < rowCount}
                                checked={selected.length === this.props.listContacts.length}
                                onChange={this.onSelectAllClick}
                                />
                            </TableCell> */}
                            <TableCell>{ locale.table.company }</TableCell>
                            <TableCell>{ locale.table.group }</TableCell>
                            <TableCell>{locale.table.full_name}</TableCell>
                            <TableCell>{locale.table.phone}</TableCell>
                            <TableCell>{locale.table.email}</TableCell>
                            
                        </TableRow>
                        </TableHead>

                        <TableBody>
                            {   !isFetching ?
                                listContacts.map(( contact, index) => {
                                    const isSelected = this.isSelected(contact._id);
                                    return  <TableRow key={index} selected={isSelected}>
                                                {/* <TableCell padding="checkbox" onClick={ event => { this.onSelectedField(event, contact._id) } } >
                                                    <Checkbox checked={isSelected} />
                                                </TableCell> */}
                                                
                                                <TableCell><Link to={`/${reducer.toLowerCase()}/view/${contact._id.toLowerCase()}`}><span  className="link">{contact.company_name}</span></Link></TableCell>
                                                <TableCell>{contact.contact_group[localStorage.getItem('locale') || 'fr']}</TableCell>
                                                <TableCell>{ contact.firstname } {contact.lastname}</TableCell>
                                                <TableCell><a href={`tel:${contact.phone_code.value}${contact.phone.replace('0', '')}`}><span  className="link">({contact.phone_code.value}) {contact.phone.replace('0', '')}</span></a></TableCell>
                                                <TableCell><a href={`mailto:${contact.email}`}><span className="link">{contact.email}</span></a></TableCell>
                                                
                                            </TableRow>
                                })
                                : null
                            }
                            
                        </TableBody>
                    </Table>
                    <Pagination
                        total={total}
                        rowsPerPageOptions={rowsPerPageOptions}
                        label={locale.table.label_rows_per_page}
                        label2={locale.table.of}
                        reducer={reducer}
                        status={this.state.group}
                        onGetItemList={ this.props.getItemList }
                    />
                
                  
            </Paper>    
        </div>
    )
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
        progress: state.library.contact.progress,
        message: state.library.contact.message,
        total: state.library.contact.total,
        rowsPerPageOptions: state.library.contact.rowsPerPageOptions,
        contactGroup: state.account.company.item ?  state.account.company.item.contact_group : []
    }
}

const StyledContact = withStyles(styles)(Contact)

export default connect(mapStateToProps, { createItem, getItemList, getItem, createState, getTotal })(StyledContact);