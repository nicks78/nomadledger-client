//manager/src/pages/service/index.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createItem, getItemList, getItem, createState , resetState, deleteElement} from '../../redux/library/actions'
import {connect} from 'react-redux'
import { TableCell, TableRow, Table, TableHead, TableBody, IconButton} from '@material-ui/core';
import ApxTableToolBar from '../../components/common/tableToolBar'
import Tooltips from '../../components/common/tooltips'
import AddService from './addService'
import {cvtNumToUserPref} from '../../utils/help_function'
import Pagination from '../../lib/pagination'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import MobileView from './mobileView'
import EditIcon from '@material-ui/icons/EditOutlined'
import ApxPaper from '../../components/common/paper'


class Service extends Component {


    state = {
        reducer: 'SERVICE',
        rowCount: 0,
        category: '',
        listServices: [],
        width: window.innerWidth,
        receivedAt: ""
    }

    componentDidMount(){
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

    refresh = () => {
      this.setState({category: ""})
      this.props.getItemList(this.state.reducer, `list?limit=10&skip=0`);
    }

    getWindowWidth = () => {
      this.setState({width: window.innerWidth})
    }

    handleFilterRequest = (value) => {
        this.setState({category: value._id});
        this.props.getItemList(this.state.reducer, `list?limit=10&skip=0&category=${value._id}`);
    }

    render() {

    const {isFetching,  locale, newService, createItem, createState, isCreating, progress, category, currency, service_type, total} = this.props
    const {reducer, listServices, width } = this.state;
    const isMobile = width <= 500;


    return (
        <div>

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
            <ApxPaper>

                    <ApxTableToolBar
                        numSelected={0}
                        menus={[...category, {fr: "Tous", en: "All", _id: "none"}]}
                        title={isFetching ? locale.wording.loading : locale.wording.service}
                        selected={locale.wording.selected}
                        onChangeQuery={ this.handleFilterRequest }
                        locale={locale}
                        hideDateFilter={true}
                        refresh={this.refresh}
                        tooltipTitle={locale.wording.filter_category}
                    />
                  <div className="table-wrapper">
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{locale.wording.service_name}</TableCell>
                            <TableCell align="right">{locale.wording.price}</TableCell>
                            <TableCell align="right">{locale.wording.type}</TableCell>
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
                                                <TableCell className="tableNumber" align="right">{cvtNumToUserPref(service.price)} {service.currency.value}</TableCell>
                                                <TableCell align="right">{ service.service_type[localStorage.getItem('locale')] }</TableCell>
                                                <TableCell style={{textTransform: 'capitalize'}}>{service.category[localStorage.getItem('locale')]}</TableCell>
                                                <Tooltips title={service.description} ><TableCell>{service.description.slice(0,5)}...</TableCell></Tooltips>

                                                  <TableCell  align="center"  style={{display: "flex", justifyContent: "center"}}>
                                                    <Tooltips title={locale.wording.edit}><IconButton component={Link} to={`/${reducer.toLowerCase()}/view/${service._id.toLowerCase()}`} style={{ minWidth: 5 }} color="primary"><EditIcon style={{fontSize: 18}} /></IconButton></Tooltips>
                                                    <Tooltips title={locale.wording.delete}><IconButton onClick={() => { this.props.deleteElement( reducer, `delete/${service._id}`) } } style={{ minWidth: 5 }}><DeleteIcon style={{color: 'red', fontSize: 18}}  /></IconButton></Tooltips>
                                                  </TableCell>
                                            </TableRow>
                                })
                                : null
                            }
                        </TableBody>
                    </Table>
                    </div>
                    <Pagination
                        total={this.props.total || 0 }
                        rowsPerPageOptions={this.props.rowsPerPageOptions || []}
                        label={locale.wording.label_rows_per_page}
                        value={this.state.category}
                        filterName="category"
                        reducer={reducer}
                        label2={locale.wording.of}
                        onGetItemList={ this.props.getItemList }
                    />
            </ApxPaper>
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


export default connect(mapStateToProps, { createItem, getItemList, getItem, createState, resetState, deleteElement })(Service);
