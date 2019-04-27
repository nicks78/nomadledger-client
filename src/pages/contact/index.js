//manager/src/pages/Contact/index.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Table, TableHead, TableBody, Paper, TableCell, TableRow, withStyles, } from '@material-ui/core';
import {connect} from 'react-redux'
import {downloadFile} from '../../redux/download/actions'
import { createItem, getItemList, getItem, createState, getTotal, resetState, deleteElement} from '../../redux/library/actions'
import ApxTableToolBar from '../../components/common/tableToolBar'
import AddContact from './addContact'
import Pagination from '../../lib/pagination'
import MobileView from './mobileView'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'

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
        group: 'none',
        width: window.innerWidth,
        listContacts: [],
        receivedAt: ""
    }

    componentDidMount(){
        this.props.getTotal(this.state.reducer)
        this.props.getItemList(this.state.reducer, `list?limit=10&skip=0`);
        window.addEventListener('resize', this.getWindowWidth);
    }

    componentWillReceiveProps(nextProps){
      if(this.state.receivedAt !== nextProps.receivedAt )
        this.setState({
          listContacts: [...this.state.listContacts, ...nextProps.listContacts],
          receivedAt: nextProps.receivedAt
        })
    }

    componentWillUnmount() {
        this.props.resetState(this.state.reducer);
        window.removeEventListener('resize', this.getWindowWidth);
    }

    getWindowWidth = () => {
      this.setState({width: window.innerWidth})
    }

    handleFilterRequest = (value) => {
        this.setState({ group: value.code })
        this.props.getTotal(this.state.reducer, `?group=${value.code}`)
        this.props.getItemList(this.state.reducer, `list?limit=10&skip=0&group=${value.code}`)
    }


    render() {

    const { isFetching,  locale, createItem, createState, newContact, isCreating, progress, classes, contactGroup, rowsPerPageOptions, total, country, phone_code} = this.props
    const {reducer, width, listContacts } = this.state
    const isMobile = width <= 500;


    return (
        <div className={classes.container}>
                  <AddContact progress={progress}
                        country={country}
                        phone_code={phone_code}
                        contactGroup={contactGroup}
                        locale={ locale }
                        createContact={ createItem }
                        createContactState={  createState }
                        newData={newContact}
                        isCreating={ isCreating  }/>

              { !isMobile  ?
                <Paper className={classes.paper}>
                    <ApxTableToolBar
                        numSelected={0}
                        title={isFetching ? locale.wording.loading : locale.wording.contact}
                        selected={locale.wording.selected}
                        menus={ contactGroup && [...contactGroup, {fr: "Tous", en: "All", code: "none"}]   }
                        locale={locale}
                        onChangeQuery={ this.handleFilterRequest }
                        toExcel={true}
                        onDownload={ () => { this.props.downloadFile(reducer, `export/excel-file`) } }
                    />
                    <div style={{ overflowY: "auto" }}>
                    <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>{ locale.wording.company }</TableCell>
                            <TableCell>{ locale.wording.group }</TableCell>
                            <TableCell>{locale.wording.full_name}</TableCell>
                            <TableCell>{locale.wording.phone}</TableCell>
                            <TableCell>{locale.wording.email}</TableCell>
                            <TableCell>Actions</TableCell>

                        </TableRow>
                        </TableHead>

                        <TableBody>
                            {   !isFetching ?
                                this.props.listContacts.map(( contact, index) => {
                                    return  <TableRow key={index}>

                                                <TableCell><Link to={`/${reducer.toLowerCase()}/view/${contact._id.toLowerCase()}`}><span style={{textTransform: "capitalize"}}  className="link">{contact.company_name}</span></Link></TableCell>
                                                <TableCell style={{textTransform: "capitalize"}}>{contact.contact_group[localStorage.getItem('locale') || 'fr']}</TableCell>
                                                <TableCell style={{textTransform: "capitalize"}}>{ contact.firstname } {contact.lastname}</TableCell>
                                                <TableCell><a href={`tel:${contact.phone_code.value}${contact.phone.replace('0', '')}`}><span  className="link">({contact.phone_code.value}) {contact.phone.replace('0', '')}</span></a></TableCell>
                                                <TableCell><a href={`mailto:${contact.email}`}><span className="link">{contact.email}</span></a></TableCell>
                                                <TableCell align="center" onClick={() => { this.props.deleteElement( reducer, `delete/${contact._id}`) } }><DeleteIcon style={{color: 'red', cursor: 'pointer', fontSize: 18}}  /></TableCell>
                                            </TableRow>
                                })
                                : null
                            }

                        </TableBody>
                    </Table>
                    </div>
                    <Pagination
                        total={total}
                        rowsPerPageOptions={rowsPerPageOptions}
                        label={locale.wording.label_rows_per_page}
                        label2={locale.wording.of}
                        reducer={reducer}
                        value={this.state.group}
                        filterName="status"
                        onGetItemList={ this.props.getItemList }
                    />


            </Paper>

            : <MobileView
                  contacts={listContacts}
                  getMoreData={this.props.getItemList }
                  total={total}
                  isFetching={isFetching}
                  locale={locale}
                  reducer={reducer}/>

          }
        </div>
    )
  }
}

const mapStateToProps = (state) => {

    return {
        isFetching: state.library.contact.isFetching,
        isCreating: state.library.contact.isCreating,
        listContacts: state.library.contact.list,
        receivedAt: state.library.contact.receivedAt,
        locale: state.locale.locale,
        newContact: state.library.contact.tmp_state,
        progress: state.library.contact.progress,
        total: state.library.contact.total,
        rowsPerPageOptions: state.library.contact.rowsPerPageOptions,
        contactGroup: state.account.company.item ?  state.account.company.item.contact_group : [],
        phone_code: state.helper.items.phone_code,
        country: state.helper.items.country,
    }
}

const StyledContact = withStyles(styles)(Contact)

export default connect(mapStateToProps, { downloadFile, createItem, getItemList, getItem, createState, getTotal, resetState , deleteElement})(StyledContact);
