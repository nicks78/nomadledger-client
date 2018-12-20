//manager/src/pages/service/index.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createItem, getItemList, getItem, createState, getTotal } from '../../redux/actions'
import {connect} from 'react-redux'
import { TableCell, TableRow, Paper, Table, TableHead, TableBody, withStyles, Tooltip} from '@material-ui/core';
import { ApxAlert, ApxTableToolBar} from '../../components/common'
import ShowService from './showService'
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
})

class Service extends Component {


    state = {
        showService: false,
        reducer: 'SERVICE',
        keyLocation: '',
        rowCount: 0,
    }

    componentDidMount(){
        if( this.props.receivedAt === null ){
            this.props.getTotal(this.state.reducer)
            this.props.getItemList(this.state.reducer, "?limit=5&skip=0");
        }
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.key !== this.state.keyLocation){
            this.setState({ showService: false, keyLocation: nextProps.location.key })
        }
    }

    render() {
    
    const {listServices, isError,  locale, service, newService, createItem, createState, isCreating , progress, category, classes} = this.props
    const { showService, reducer } = this.state
  

    if(isError){
        return <ApxAlert message="Erreur message" />
    }


    return (
        <div className={ classes.container }>
        
            <AddService 
                locale={ locale } 
                newData={newService} 
                progress={progress}
                createServiceState={  createState } 
                createService={ createItem  } 
                isCreating={isCreating} 
                category={category}
            />
            <Paper>
            {
                showService ?
                    <ShowService service={ service } />
                :   <div><ApxTableToolBar
                        numSelected={0}
                        title={locale.table.title_service}
                        selected={locale.page.selected}
                    />
                    <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>{locale.table.service_name}</TableCell>
                            <TableCell numeric>{locale.table.price}</TableCell>
                            <TableCell>{locale.table.category}</TableCell>
                            <TableCell>{locale.table.description}</TableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                listServices.map(( service, index) => {
                                    return  <TableRow key={index}>
                                                <TableCell><Link to={{ pathname: `/${reducer.toLowerCase()}/view/${service._id.toLowerCase()}`, state: { reducer: reducer } }}><span  className="link">{service.name}</span></Link></TableCell>
                                                <TableCell numeric>{cvtNumToUserPref(service.price)}</TableCell>
                                                <TableCell>{service.category[localStorage.getItem('locale')]}</TableCell> 
                                                <Tooltip className={classes.customWidth} title={service.description}><TableCell>{service.description.slice(0,5)}...</TableCell></Tooltip>
                                            </TableRow>
                                })
                            }
                            
                        </TableBody>
                    </Table>
                    <Pagination
                        total={this.props.total}
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        label={locale.table.label_rows_per_page}
                        reducer={reducer}
                        label2={locale.table.of}
                        onGetItemList={ this.props.getItemList }
                    />
                    </div>
            }          
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
        listServices: state.library.service.list,
        receivedAt: state.library.service.receivedAt,
        locale: state.locale.locale,
        progress: state.library.service.progress,
        service: state.library.service.item,
        newService: state.library.service.tmp_state,
        total: state.library.service.total,
        rowsPerPageOptions:state.library.service.rowsPerPageOptions,
        category: state.account.company.item ?  state.account.company.item.category_name : []
    }
}

const StyledService = withStyles(styles)(Service)

export default connect(mapStateToProps, { createItem, getItemList, getItem, createState, getTotal  })(StyledService);