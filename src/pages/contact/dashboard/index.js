//manager/src/pages/client/showContact.js

import React  from 'react'
import {connect} from 'react-redux'
import { Spinner, ApxAlert, ApxTable} from '../../../components/common'
import Paper from '@material-ui/core/Paper'
import { getItem, resetState, createState } from '../../../redux/high-order-component'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ContactInfo from './contactInfo'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import StatContact from './stat'
import Invoice from '../../invoice'

const styles = {
  root: {
      padding: '24px'
  }
}

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ paddingLeft: 0 }}>
      {children}
    </Typography>
  );
}

class ShowContact extends React.Component {

    state = {
      value: 0,
      reducer: 'CONTACT',
      showEdit: false
    }

    componentDidMount(){
        var id = this.props.match.params.id;
        this.props.getItem(this.props.location.state.reducer, id)
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillUnmount(){
        this.props.resetState();
    }

    handleChange = (event, value) => {
      this.setState({ value });
    }

    render(){
      const { contact, isFetching, isError, locale } = this.props
 

      if(isFetching || contact === null){
        return <Spinner />
      }
      if(isError){
        return <ApxAlert message="Erreur message" reducer={ this.state.reducer }/>
      }
      return (
        <Paper style={ styles.root }>
        <Grid container spacing={8}>

            <Grid item xs={12} md={3}>
                <div style={{ height: 150, width: 100, borderRadius: 100, margin: '0 auto' }}>
                    <img src={`http://localhost:8080/api/v1/image/view${contact.logo}`} alt="logo" width="100%" />
                </div>
              <Divider />
              
              <ContactInfo  locale={locale} contact={ contact } createState={this.props.createState} id={contact._id}/>
              
            </Grid>
            <Grid item xs={12} md={9}>
            <div>
            <div style={{height: 50, marginBottom: 24, marginLeft: 16 }}>
                <StatContact />
            </div>
            <div style={{ marginLeft: 16}}>
            <AppBar position="static" style={{backgroundColor: '#FF8119'}}>
              <Tabs value={this.state.value} 
                    onChange={this.handleChange}
                    fullWidth
                    >
                <Tab label={locale.invoice.name} />
                <Tab label={locale.quote.name} />
                <Tab label={locale.payback.name} />
              </Tabs>
            </AppBar>
              <SwipeableViews
                style={{backgroundColor: 'beige'}}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer><Invoice title={locale.invoice.name}/></TabContainer>
                <TabContainer><ApxTable title={locale.quote.name}/></TabContainer>
                <TabContainer><ApxTable title={locale.payback.name}/></TabContainer>
              </SwipeableViews>
              </div>
            </div>
            </Grid>
        </Grid>
              
              
        </Paper>
      )
    }
}

const mapStateToProps = (state) => {

  return {
      isFetching: state.library.contact.isFetching,
      isError: state.library.contact.isError,
      receivedAt: state.library.contact.receivedAt,
      locale: state.locale.locale,
      contact: state.library.contact.item,
      newContact: state.library.contact.tmp_state
  }
}

export default connect( mapStateToProps, { getItem, resetState, createState })(ShowContact);