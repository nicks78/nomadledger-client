import React from 'react';
import {connect} from 'react-redux'
import {  sendEmailWithPdf } from '../../../redux/book/actions'
import { withStyles, TextField, Button } from '@material-ui/core';
import ApxRichEditor from '../../../components/common/richEditor'
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/SendOutlined'
import CloseIcon from '@material-ui/icons/CloseOutlined'
import Tooltips from '../../../components/common/tooltips'



function getModalStyle() {
  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    margin: '0 auto',
    outline: 'none',
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
    email: this.props.item.contact_id.email,
    subject: "",
    content: `<p><br /><br />${this.props.company.company_name}<br />
          ${this.props.user.lastname} ${this.props.user.firstname}<br />
        ${this.props.user.email}<br />
          (${this.props.user.phone_code.dial_code})${this.props.user.phone}<br />
    </p>`,
  }


  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  handleRichEditor = (reducer, fieldName, value) => {
    this.setState({content: value})
  }

  sendEmail = (e) => {
    e.preventDefault();
    var data = {
      email: this.state.email,
      subject: this.state.subject,
      content: this.state.content
    }
    this.props.sendEmailWithPdf(this.props.reducer, `/send-document/${this.props.item._id}`, data)
  }

  render() {
    const { classes, loading , reducer, item, locale, actionLoading } = this.props;
    const {email, subject, content, isLoading} = this.state

    return (
      <React.Fragment>
        <Tooltips title={locale.wording.send}><IconButton onClick={this.handleOpen} style={{ minWidth: 5 }} disabled={loading}  color="primary"><SendIcon style={{ fontSize: 18, color:  "darkorange" }} /></IconButton></Tooltips>
        <Modal
          aria-labelledby={item._id}
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
          <IconButton style={{position: "absolute", top: 10, right: 10}} onClick={this.handleClose} ><CloseIcon style={{color: 'red'}} /></IconButton>
          <form onSubmit={this.sendEmail}>

            <Typography variant="h2" align="center">{item.contact_id.company_name}</Typography><br />
            <Typography variant="h3" align="center">{locale.wording[reducer.toLowerCase()]}&nbsp;{item.ref_add +"-"+item.ref}</Typography>
            <TextField
                  type="email"
                  value={email}
                  label={locale.wording.email}
                  fullWidth
                  required
                  variant="outlined"
                  onChange={ (e) => { this.setState({email: e.target.value}) } }
                  margin="dense"/>

            <TextField
                  type="text"
                  onChange={ (e) => { this.setState({subject: e.target.value}) } }
                  value={subject}
                  label={locale.wording.subject}
                  required
                  fullWidth
                  variant="outlined"
                  margin="dense"/>

            <ApxRichEditor
                reducer={reducer}
                field="content"
                initText={content || ""}
                handleAction={ this.handleRichEditor }
            />
            <br />
            <div style={{float: "right"}}>
              <Button
                  type="submit"
                  variant="contained"
                  disabled={actionLoading}
                  color="primary">
                  {actionLoading ? locale.wording.loading : locale.wording.send}</Button>
            </div>
            </form>
          </div>

        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {

    return {
        locale: state.locale.locale,
        company: state.account.company.item,
        isError: state.book.invoice.isError,
        actionLoading: state.book.invoice.actionLoading,
        user: state.account.user.item
    }
}


// We need an intermediary variable for handling the recursive nesting.
const ModalSendMail = withStyles(styles)(SimpleModal);

export default connect(mapStateToProps, { sendEmailWithPdf  })(ModalSendMail);
