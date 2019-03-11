//manager/src/pages/client/showContact.js

import React  from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core';
import { DEFAULT_IMG} from '../../../redux/constant'
import ApxBackBtn from '../../../components/common/backBtn'
import Spinner from '../../../components/common/spinner'
import ApxAlert from '../../../components/common/alert'
import UploadImg from '../../../lib/uploadImg'
import Paper from '@material-ui/core/Paper'
import { getItem, resetState, createState, uploadFileToServer } from '../../../redux/library/actions'
import { getBookTotal } from '../../../redux/book/actions'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ContactInfo from './contactInfo'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import SwipeableViews from 'react-swipeable-views'
import StatContact from './stat'
import { TableQuote, TablePayback, TableInvoice } from '../../bookkeeping/common/table'


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
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&$tabSelected': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      
    },
    '&:focus': {
      color: theme.palette.primary.main,
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
      reducer: 'CONTACT'
    }

    componentDidMount(){
        var id = this.props.match.params.id;
        this.props.getItem(this.state.reducer, id);
        this.props.getBookTotal("QUOTE", `total/${id}`);
        this.props.getBookTotal("INVOICE", `total/${id}`);
        this.props.getBookTotal("PAYBACK", `total/${id}`);
    }

    componentWillUnmount(){
        this.props.resetState();
    }

    handleChange = (event, value) => {
      this.setState({ value });
    }

    render(){
      const { contact, 
              isFetching, 
              isError, 
              locale, 
              progress, 
              isUploading, 
              classes, 
              message, 
              total_quote , 
              total_invoice, 
              currency,
              total_payback} = this.props
 
      if(isFetching){
        return <Spinner />
      }
      if( contact === null){
        return <ApxAlert message="error_404" />
      }
      if(isError){
        return <ApxAlert message={message} reducer={ this.state.reducer }/>
      }

      return (
        <Paper className={ classes.root }>
        <ApxBackBtn/>
        <Grid container spacing={8}>

            <Grid item xs={12} md={3}>
                <UploadImg 
                    field="logo_contact"
                    _handleUploadFile={ (e) => { this.props.uploadFileToServer("CONTACT", contact._id, e.target.files[0], contact.logo_contact )} }
                    progress={progress}
                    isUploading={isUploading}
                    image={<img src={`${ contact.logo_contact.full_path || DEFAULT_IMG }`} alt={contact.logo_contact.org_name} width="100%" height={null} />}
                  />

              <Divider />
              
              <ContactInfo  locale={locale} contact={ contact } createState={this.props.createState} id={contact._id}/>
              
            </Grid>
            <Grid item xs={12} md={9}>
            
            <div className={ classes.contactWrapper}>
                <StatContact 
                  total_quote={total_quote}
                  total_invoice={total_invoice}
                  total_payback={total_payback}
                  currency={currency}
                  locale={locale}
                />
            </div>
            <div style={{ marginLeft: 16}}>
            <AppBar position="static" style={{backgroundColor: '#fff', color: '#000'}}>
              <Tabs value={this.state.value} 
                    onChange={this.handleChange}
                    classes={classes.tabsRoot}
                    variant="fullWidth"
                    >
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={locale.quote.name} />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={locale.invoice.name} />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={locale.payback.name} />
              </Tabs>
            </AppBar>
              <SwipeableViews
                
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer><TableQuote reducer="QUOTE" contactId={this.props.match.params.id}/></TabContainer>
                <TabContainer><TableInvoice reducer="INVOICE" contactId={this.props.match.params.id}/></TabContainer>
                <TabContainer><TablePayback reducer="PAYBACK" contactId={this.props.match.params.id}/></TabContainer>
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
      message: state.library.contact.message,
      receivedAt: state.library.contact.receivedAt,
      locale: state.locale.locale,
      contact: state.library.contact.item,
      newContact: state.library.contact.tmp_state,
      progress: state.library.contact.progress,
      isUploading: state.library.contact.isUploading,
      total_quote: state.book.quote.total,
      total_invoice: state.book.invoice.total,
      total_payback: state.book.payback.total,
      currency: state.account.company.item.currency.value || "EUR"
  }
}

const StyledShowContact = withStyles(styles)(ShowContact)

export default connect( mapStateToProps, { getItem, resetState, createState , uploadFileToServer, getBookTotal})(StyledShowContact);