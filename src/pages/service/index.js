//manager/src/pages/service/index.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createItem, getItemList, getItem, createState, getTotal , resetState} from '../../redux/library/actions'
import {connect} from 'react-redux'
import { TableCell, TableRow, Table, TableHead, TableBody, withStyles, Tooltip, Paper} from '@material-ui/core';
import ApxAlert from '../../components/common/alert'
import ApxTableToolBar from '../../components/common/tableToolBar'
import AddService from './addService'
import {cvtNumToUserPref} from '../../utils/help_function'
import Pagination from '../../lib/pagination'

// STYLES
const styles = theme =>  ({
    tableHead: {
        backgroundColor: "rgb(238,238,238)"
    },
    customWidth: {
        maxWidth: 300,
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

class Service extends Component {


    state = {
        reducer: 'SERVICE',
        rowCount: 0,
        keyLocation: '',
    }

    componentDidMount(){
            this.props.getTotal(this.state.reducer)
            this.props.getItemList(this.state.reducer, "list?limit=5&skip=0");
    }

    componentWillUnmount(){
        this.props.resetState("SERVICE")
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.key !== this.state.keyLocation){
            this.setState({ showContact: false, keyLocation: nextProps.location.key })
        }
      }

    render() {
    
    const {isFetching, listServices, isError,  locale, message, newService, createItem, createState, isCreating, progress, category, classes, currency} = this.props
    const {reducer } = this.state

    return (
        <div className={ classes.container }>
        
            <AddService 
                locale={ locale } 
                newData={newService} 
                progress={progress}
                currency={currency}
                createServiceState={  createState } 
                createService={ createItem  } 
                isCreating={isCreating} 
                category={category}
            />
            { isError ? <ApxAlert message={message} /> : null }
            <Paper className={classes.paper}>
                
                <ApxTableToolBar
                        numSelected={0}
                        title={locale.table.title_service}
                        selected={locale.page.selected}
                    />
                    <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>{locale.table.service_name}</TableCell>
                            <TableCell align="right">{locale.table.price}</TableCell>
                            <TableCell>{locale.table.category}</TableCell>
                            <TableCell>{locale.table.description}</TableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                            {   !isFetching ?
                                listServices.map(( service, index) => {
                                    return  <TableRow key={index}>
                                                <TableCell><Link to={ `/${reducer.toLowerCase()}/view/${service._id.toLowerCase()}`}><span  className="link">{service.name}</span></Link></TableCell>
                                                <TableCell align="right">{cvtNumToUserPref(service.price)}</TableCell>
                                                <TableCell>{service.category[localStorage.getItem('locale')]}</TableCell> 
                                                <Tooltip className={classes.customWidth} title={service.description}><TableCell>{service.description.slice(0,5)}...</TableCell></Tooltip>
                                            </TableRow>
                                })
                                : null
                            }
                        </TableBody>
                    </Table>
                    <Pagination
                        total={this.props.total}
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        label={locale.table.label_rows_per_page}
                        status=""
                        reducer={reducer}
                        label2={locale.table.of}
                        onGetItemList={ this.props.getItemList }
                    />        
            </Paper>
        </div>
    )
  }
}




const mapStateToProps = (state) => {
    return {
        isFetching: state.library.service.isFetching,
        isCreating: state.library.service.isCreating,
        isError: state.library.service.isError,
        message: state.library.service.message,
        listServices: state.library.service.list,
        receivedAt: state.library.service.receivedAt,
        locale: state.locale.locale,
        progress: state.library.service.progress,
        service: state.library.service.item,
        newService: state.library.service.tmp_state,
        total: state.library.service.total,
        rowsPerPageOptions: state.library.service.rowsPerPageOptions,
        category: state.account.company.item ?  state.account.company.item.category_name : [],
        currency: state.helper.items.currency,

    }
}


const StyledService = withStyles(styles)(Service)

export default connect(mapStateToProps, { createItem, getItemList, getItem, createState, getTotal, resetState  })(StyledService);