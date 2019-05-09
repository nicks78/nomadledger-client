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
import { getItem, createState, uploadFileToServer } from '../../../redux/library/actions'
import { getBookTotal, resetState } from '../../../redux/book/actions'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import ContactInfo from './contactInfo'
import StatContact from './stat'

const styles = theme => ({
  root: {
      padding: 24,
      [theme.breakpoints.down('sm')]: {
        padding: "24px 12px 24px 12px",
        boxShadow: "none"
      }
  },
  statWrapper: {
    marginBottom: 24,
    // marginLeft: 16 ,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 24
    }
  }

})

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

           <div style={{textAlign:'center'}}>
             <UploadImg
               field="logo_contact"
               _handleUploadFile={ (e) => { this.props.uploadFileToServer("CONTACT", contact._id, e.target.files[0], contact.logo_contact )} }
               progress={progress}
               isUploading={isUploading}
               image={<img src={`${ contact.logo_contact.full_path || DEFAULT_IMG }`} alt={contact.logo_contact.org_name}

               style={{ maxWidth: '100%', maxHeight: '70px'}} />}
             />
           </div>
        <Grid container spacing={8}>
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
          </Grid>
          <Grid item xs={12} md={12}>
           <ContactInfo  locale={locale} contact={ contact } createState={this.props.createState} id={contact._id}/>

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
