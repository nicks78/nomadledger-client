//manager/src/pages/client/showContact.js

import React  from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core';
import {API_ENDPOINT} from '../../../utils/constant'
import { Spinner, ApxAlert, ApxTable} from '../../../components/common'
import UploadImg from '../../../lib/uploadImg'
import Paper from '@material-ui/core/Paper'
import { getItem, resetState, createState, uploadFileToServer } from '../../../redux/actions'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ContactInfo from './contactInfo'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import SwipeableViews from 'react-swipeable-views'
import StatContact from './stat'
import Invoice from '../../invoice'


const styles = theme => ({
  root: {
      padding: '24px'
  },
  contactWrapper: {
    marginBottom: 24, 
    marginLeft: 16 
  },
  tabRoot: {
    fontSize: '0.85rem',
    transition: 'all .2s ease',
    '&:hover': {
      color: '#008489',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#008489',
      fontWeight: theme.typography.fontWeightMedium,
      
    },
    '&:focus': {
      color: '#008489',
    },
  },
  tabSelected: {},
})

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
      const { contact, isFetching, isError, locale, progress, isCreating, classes } = this.props
 
      if(isFetching || contact === null){
        return <Spinner />
      }
      if(isError){
        return <ApxAlert message="Erreur message" reducer={ this.state.reducer }/>
      }
      return (
        <Paper className={ classes.root }>
        <Grid container spacing={8}>

            <Grid item xs={12} md={3}>
                <UploadImg 
                    field="logo"
                    _handleUploadFile={ this.props.uploadFileToServer }
                    reducer={this.state.reducer}
                    progress={progress}
                    idModel={this.props.match.params.id}
                    isUploading={isCreating}
                    image={<img src={`${API_ENDPOINT}image/view${ contact.logo || '/default/default_logo.png' }`} alt="logo" width="100%" height={null} />}
                  />

              <Divider />
              
              <ContactInfo  locale={locale} contact={ contact } createState={this.props.createState} id={contact._id}/>
              
            </Grid>
            <Grid item xs={12} md={9}>
            
            <div className={ classes.contactWrapper}>
                <StatContact />
            </div>
            <div style={{ marginLeft: 16}}>
            <AppBar position="static" style={{backgroundColor: '#fff', color: '#000'}}>
              <Tabs value={this.state.value} 
                    onChange={this.handleChange}
                    classes={classes.tabsRoot}
                    fullWidth
                    >
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={locale.invoice.name} />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={locale.quote.name} />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={locale.payback.name} />
              </Tabs>
            </AppBar>
              <SwipeableViews
                
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer><Invoice title={locale.invoice.name}/></TabContainer>
                <TabContainer><ApxTable title={locale.quote.name}/></TabContainer>
                <TabContainer><ApxTable title={locale.payback.name}/></TabContainer>
              </SwipeableViews>
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
      newContact: state.library.contact.tmp_state,
      progress: state.library.contact.progress,
      isCreating: state.library.contact.isCreating
  }
}

const IndexShowContact = withStyles(styles)(ShowContact)

export default connect( mapStateToProps, { getItem, resetState, createState , uploadFileToServer})(IndexShowContact);