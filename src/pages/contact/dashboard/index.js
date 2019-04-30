//manager/src/pages/client/showContact.js

import React  from 'react'
import {connect} from 'react-redux'
import { withStyles, Hidden } from '@material-ui/core';
import { DEFAULT_IMG} from '../../../redux/constant'
import ApxBackBtn from '../../../components/common/backBtn'
import Spinner from '../../../components/common/spinner'
import ApxAlert from '../../../components/common/alert'
import UploadImg from '../../../lib/uploadImg'
import Paper from '@material-ui/core/Paper'
import { getItem, createState, uploadFileToServer } from '../../../redux/library/actions'
import { getBookTotal, resetState } from '../../../redux/book/actions'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ContactInfo from './contactInfo'
import AppBar from '@material-ui/core/AppBar'
import SwipeableViews from 'react-swipeable-views'
import StatContact from './stat'
import { TableQuote, TableRefund, TableInvoice } from '../../bookkeeping/common/table'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
      padding: 24,
      [theme.breakpoints.down('sm')]: {
        padding: "24px 12px 24px 12px"
      }
  },
  statWrapper: {
    marginBottom: 24,
    // marginLeft: 16 ,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 24
    }
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
  tabWrapper: {
    // marginLeft: 16,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  expandPanel: {
    boxShadow: "none !important",
    border: "none",
  },
  expandDetail: {
    display: "block",
  },
  lightTooltip: {
    color: 'white',
    fontWeight: 600,
    maxWidth: 500,
    textAlign: 'center',
    padding: '5px 5px 5px 5px',
    fontSize: 14,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,1)',
}
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
        this.props.getBookTotal("QUOTE", `total/${id}?status=6`);
        this.props.getBookTotal("INVOICE", `total/${id}?status=7`);
        this.props.getBookTotal("REFUND", `total/${id}?status=8`);
    }

    componentWillUnmount(){
        this.props.resetState("QUOTE");
        this.props.resetState("INVOICE");
        this.props.resetState("REFUND");
    }

    handleChange = (event, value) => {
      this.setState({ value });
    }

    render(){
      const { contact,
              isFetching,
              locale,
              progress,
              isUploading,
              classes,
              total_quote ,
              total_invoice,
              currency,
              total_refund} = this.props

      if(isFetching){
        return <Spinner />
      }
      if( contact === null){
        return <ApxAlert message="error_404" />
      }

      return (
        <Paper className={ classes.root }>
        <ApxBackBtn/>
        <Typography variant="h1" align="center">{ contact.company_name }</Typography>

        <Grid container spacing={8}>
          <Grid item xs={12} md={12}>
          <ExpansionPanel className={classes.expandPanel}>

         <ExpansionPanelSummary expandIcon={<Tooltip classes={{ tooltip: classes.lightTooltip }} title={ locale.helperText.expend_contact_info }><IconButton><ExpandMoreIcon /></IconButton></Tooltip>} className={classes.expandSummary}>

           <br />
         </ExpansionPanelSummary>
       <ExpansionPanelDetails className={classes.expandDetail}>

             <div style={{textAlign:'center'}}>
               <UploadImg
                 field="logo_contact"
                 _handleUploadFile={ (e) => { this.props.uploadFileToServer("CONTACT", contact._id, e.target.files[0], contact.logo_contact )} }
                 progress={progress}
                 isUploading={isUploading}
                 image={<img src={`${ contact.logo_contact.full_path || DEFAULT_IMG }`} alt={contact.logo_contact.org_name}

                 style={{ maxWidth: '100%', maxHeight: '100px'}} />}
               />
             </div>

           <ContactInfo  locale={locale} contact={ contact } createState={this.props.createState} id={contact._id}/>


       </ExpansionPanelDetails>
     </ExpansionPanel>
</Grid>

            <Grid item xs={12} md={12}>

            <div className={ classes.statWrapper}>
                <StatContact
                  total_quote={total_quote}
                  total_invoice={total_invoice}
                  total_refund={total_refund}
                  currency={currency}
                  locale={locale}
                />
            </div>
            <Hidden xsDown>
            <div className={ classes.tabWrapper }>
            <AppBar position="static" style={{backgroundColor: '#fff', color: '#000'}}>
              <Tabs value={this.state.value}
                    onChange={this.handleChange}
                    classes={classes.tabsRoot}
                    variant="fullWidth"
                    >
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={locale.quote.name } />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={locale.invoice.name} />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={locale.refund.name} />
              </Tabs>
            </AppBar>
              <SwipeableViews

                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer><TableQuote reducer="QUOTE" contactId={this.props.match.params.id}/></TabContainer>
                <TabContainer><TableInvoice reducer="INVOICE" contactId={this.props.match.params.id}/></TabContainer>
                <TabContainer><TableRefund reducer="REFUND" contactId={this.props.match.params.id}/></TabContainer>
              </SwipeableViews>
            </div>
            </Hidden>

            </Grid>
        </Grid>
        </Paper>
      )
    }
}

const mapStateToProps = (state) => {

  return {
      isFetching: state.library.contact.isFetching,
      receivedAt: state.library.contact.receivedAt,
      locale: state.locale.locale,
      contact: state.library.contact.item,
      newContact: state.library.contact.tmp_state,
      progress: state.library.contact.progress,
      isUploading: state.library.contact.isUploading,
      total_quote: state.book.quote.total,
      total_invoice: state.book.invoice.total,
      total_refund: state.book.refund.total || 0,
      currency: state.account.company.item ? state.account.company.item.currency.value : []
  }
}

const StyledShowContact = withStyles(styles)(ShowContact)

export default connect( mapStateToProps, { getItem, resetState, createState , uploadFileToServer, getBookTotal})(StyledShowContact);
