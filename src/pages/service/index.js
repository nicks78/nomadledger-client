//manager/src/pages/service/index.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createItem, getItemList, getItem, createState, getTotal , resetState, deleteElement} from '../../redux/library/actions'
import {connect} from 'react-redux'
import { TableCell, TableRow, Table, TableHead, TableBody, withStyles, Tooltip, Paper} from '@material-ui/core';
import ApxTableToolBar from '../../components/common/tableToolBar'
import AddService from './addService'
import {cvtNumToUserPref} from '../../utils/help_function'
import Pagination from '../../lib/pagination'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import MobileView from './mobileView'

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
        category: 'none',
        listServices: [],
        width: window.innerWidth,
        receivedAt: ""
    }

    componentDidMount(){
            this.props.getTotal(this.state.reducer)
            this.props.getItemList(this.state.reducer, "list?limit=10&skip=0");
            window.addEventListener('resize', this.getWindowWidth);
    }

    componentWillReceiveProps(nextProps){
      if(this.state.receivedAt !== nextProps.receivedAt )
        this.setState({
          listServices: [...this.state.listServices, ...nextProps.listServices],
          receivedAt: nextProps.receivedAt
        })
    }

    componentWillUnmount(){
        this.props.resetState(this.state.reducer);
        window.removeEventListener('resize', this.getWindowWidth);
    }

    handleFilterRequest = (value) => {
        this.setState({category: value._id});
        this.props.getTotal(this.state.reducer, `?category=${value._id}`);
        this.props.getItemList(this.state.reducer, `list?limit=10&skip=0&category=${value._id}`);
    }

    render() {

    const {isFetching,  locale, newService, createItem, createState, isCreating, progress, category, classes, currency, service_type, total} = this.props
    const {reducer, listServices, width } = this.state;
    const isMobile = width <= 500;


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
                service_type={service_type}
            />
          { !isMobile ?
            <Paper className={classes.paper}>

                <ApxTableToolBar
                        numSelected={0}
                        menus={[...category, {fr: "Tous", en: "All", _id: "none"}]}
                        title={isFetching ? locale.wording.loading : locale.wording.service}
                        selected={locale.wording.selected}
                        onChangeQuery={ this.handleFilterRequest }
                    />
                    <div style={{overflowY: "auto"}}>
                    <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>{locale.wording.service_name}</TableCell>
                            <TableCell align="right">{locale.wording.price}</TableCell>
                            <TableCell align="right">{locale.wording.type}</TableCell>
                            <TableCell align="center">{locale.wording.currency}</TableCell>
                            <TableCell>{locale.wording.category}</TableCell>
                            <TableCell>{locale.wording.description}</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                            {   !isFetching ?
                                this.props.listServices.map(( service, index) => {
                                    return  <TableRow key={index}>
                                                <TableCell><Link to={ `/${reducer.toLowerCase()}/view/${service._id.toLowerCase()}`}><span style={{textTransform: "capitalize"}}  className="link">{service.name}</span></Link></TableCell>
                                                <TableCell align="right">{cvtNumToUserPref(service.price)}</TableCell>
                                                <TableCell align="right">{ service.service_type[localStorage.getItem('locale')] }</TableCell>
                                                <TableCell align="center">{service.currency.en}</TableCell>
                                                <TableCell style={{textTransform: 'capitalize'}}>{service.category[localStorage.getItem('locale')]}</TableCell>
                                                <Tooltip className={classes.customWidth} title={service.description}><TableCell>{service.description.slice(0,5)}...</TableCell></Tooltip>
                                                <TableCell align="center" onClick={() => { this.props.deleteElement( reducer, `delete/${service._id}`) } }><DeleteIcon style={{color: 'red', cursor: 'pointer', fontSize: 18}}  /></TableCell>
                                            </TableRow>
                                })
                                : null
                            }
                        </TableBody>
                    </Table>
                    </div>
                    <Pagination
                        total={this.props.total}
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        label={locale.wording.label_rows_per_page}
                        value={this.state.category}
                        filterName="category"
                        reducer={reducer}
                        label2={locale.wording.of}
                        onGetItemList={ this.props.getItemList }
                    />
            </Paper>
            : <MobileView
                  services={listServices}
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
        isFetching: state.library.service.isFetching,
        isCreating: state.library.service.isCreating,
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
        service_type: state.helper.items.service_type,

    }
}


const StyledService = withStyles(styles)(Service)

export default connect(mapStateToProps, { createItem, getItemList, getItem, createState, getTotal, resetState, deleteElement  })(StyledService);
