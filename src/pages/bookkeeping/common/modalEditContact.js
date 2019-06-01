import React from 'react';
import {connect} from 'react-redux'
import { Link } from "react-router-dom"
import { updateItem, createState , resetState } from '../../../redux/library/actions'
import { withStyles, TextField, Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseOutlined'
import Tooltips from '../../../components/common/tooltips'
import ApxSelect  from '../../../components/common/select'



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
  }

  componentWillUnmount(){
      this.props.resetState( "CONTACT")
  }


  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  handleForm = (e) => {
    var contact = this.props.item;
    contact[e.target.name] = e.target.value;

    this.props.createState( "CONTACT", "contact_id", contact)
    this.props.createState( this.props.reducer, "contact_id", contact);

  }

  updateContact = (e) => {
    e.preventDefault();
    this.props.updateItem("CONTACT", `update`);
    this.setState({ open: false });
  }

  render() {
    const { classes, item, locale, actionLoading, country } = this.props;
    const { lastname, firstname, addresses_zip, addresses_city, addresses_street, addresses_country, company_name} = item

    return (
      <React.Fragment>
        <Tooltips title={locale.wording.edit}><Typography onClick={this.handleOpen} component="span" style={{ color: "blue", fontSize: 12, cursor: "pointer" }}>{ company_name }</Typography></Tooltips>
        <Modal
          aria-labelledby={item._id}
          aria-describedby="modal-edit-contact"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>

          <IconButton style={{position: "absolute", top: 10, right: 10}} onClick={this.handleClose} ><CloseIcon style={{color: 'red'}} /></IconButton>
          <form onSubmit={this.updateContact}>

            <Typography variant="h2" align="center">
              <Link to={{ pathname: `/contact/view/${item._id}`, state: { reducer: "CONTACT" } }}>{ company_name }</Link>
            </Typography>
            <Typography variant="caption" align="center">
              {locale.helperText.edit_receiver_contact }
            </Typography>
            <br />
            <TextField
                  type="text"
                  value={company_name}
                  label={locale.wording.company_name}
                  fullWidth
                  name="company_name"
                  variant="outlined"
                  onChange={ this.handleForm }
                  margin="dense"/>
            <Grid container spacing={8}>

                <Grid item xs={12} sm={6} md={6}>
                <TextField
                      type="text"
                      value={firstname}
                      label={locale.wording.firstname}
                      fullWidth
                      name="firstname"
                      variant="outlined"
                      onChange={ this.handleForm }
                      margin="dense"/>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <TextField
                      type="text"
                      value={lastname}
                      label={locale.wording.lastname}
                      fullWidth
                      name="lastname"
                      variant="outlined"
                      onChange={ this.handleForm }
                      margin="dense"/>
                </Grid>

            </Grid>



            <TextField
                  type="text"
                  value={addresses_street}
                  label={locale.wording.addresses_street}
                  fullWidth
                  name="addresses_street"
                  variant="outlined"
                  onChange={ this.handleForm }
                  margin="dense"/>

            <TextField
                  type="text"
                  value={addresses_zip}
                  label={locale.wording.addresses_zip}
                  fullWidth
                  name="addresses_zip"
                  variant="outlined"
                  onChange={ this.handleForm }
                  margin="dense"/>
            <TextField
                  type="text"
                  value={addresses_city}
                  label={locale.wording.addresses_city}
                  fullWidth
                  name="addresses_city"
                  variant="outlined"
                  onChange={ this.handleForm }
                  margin="dense"/>
            <div style={{marginTop: 10}}>
            <ApxSelect
                arrayField={country}
                field="addresses_country"
                value={addresses_country && addresses_country[localStorage.getItem("locale")]}
                handleAction={ this.handleForm }
                locale={locale}
                required={false}
            />
            </div>

            <br />
            <div style={{float: "right", marginTop: "15"}}>
              <Button
                  type="submit"
                  variant="contained"
                  disabled={actionLoading}
                  color="primary">
                  {actionLoading ? locale.wording.loading : locale.wording.edit}</Button>
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
        isError: state.book.invoice.isError,
        contact: state.library.contact.item,
        country: state.helper.items.country,
    }
}


// We need an intermediary variable for handling the recursive nesting.
const ModalSendMail = withStyles(styles)(SimpleModal);

export default connect(mapStateToProps, { updateItem, createState, resetState  })(ModalSendMail);
