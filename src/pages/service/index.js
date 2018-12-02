//manager/src/pages/service/index.js

import React, { Component } from 'react'
import { createItem, getItemList, getItem, createState } from '../../redux/actions'
import {connect} from 'react-redux'
import {ApxTable, Spinner, ApxAlert} from '../../components/common'
import ShowService from './showService'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBackOutlined'
import AddService from './addService'

class Service extends Component {


    state = {
        showService: false,
        reducer: 'SERVICE',
        keyLocation: ''
    }

    componentDidMount(){
        if( this.props.receivedAt === null )
            this.props.getItemList(this.state.reducer);
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.key !== this.state.keyLocation){
            this.setState({ showService: false, keyLocation: nextProps.location.key })
        }
    }

    renderSingleService = (id) => {
        var {service }= this.props
        this.setState({ showService: true })
        if( service && service._id === id ){
            return;
        }else{
            this.props.getItem(this.state.reducer, id);
        }
    }

    returnToList = () => {
        this.setState({ showService: false })
    }

    render() {
    
    const {listServices, isFetching, isError,  locale, service, newService, createItem, createState, isCreating , progress} = this.props
    const { showService } = this.state


    if(isFetching){
        return <Spinner />
    }
    if(isError){
        return <ApxAlert message="Erreur message" />
    }

    var tableRow = 
        listServices.map((row, index) => {
        return (
          <TableRow key={index}>
            <TableCell onClick={ () => { this.renderSingleService(row._id) } }><span  style={ styles.link }>{row.service_name}</span></TableCell>
          </TableRow>
        );
      })

    return (
        <div style={styles.container}>
            {
                showService ? 
                    <IconButton onClick={ this.returnToList }><ArrowBackIcon/></IconButton>
                : <AddService 
                        locale={ locale } 
                        initData="" 
                        newData={newService} 
                        progress={progress}
                        createServiceState={  createState } 
                        createService={ createItem  } 
                        isCreating={isCreating} 
                    />
            }
            {
                showService ?
                    <ShowService service={ service } />
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
        isFetching: state.library.service.isFetching,
        isCreating: state.library.service.isCreating,
        isError: state.library.service.isError,
        listServices: state.library.service.list,
        receivedAt: state.library.service.receivedAt,
        locale: state.locale.locale,
        progress: state.library.service.progress,
        service: state.library.service.item,
        newService: state.library.service.tmp_state
    }
}


export default connect(mapStateToProps, { createItem, getItemList, getItem, createState  })(Service);