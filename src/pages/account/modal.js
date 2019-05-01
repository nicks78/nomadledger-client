//src/pages/account/modal.js

import React from 'react';
import {connect} from "react-redux"
import {pushToDocument} from '../../redux/account/actions'
import { withStyles, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/EditOutlined'
import { checkNumFormatRegex, cvtNumToUserPref} from '../../utils/help_function'


const styles = theme => ({
  paper: {
    // position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    margin: '0 auto',
    marginTop: '10%',
    overflow: "hidden",
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  btn: {
      float: 'right'
  },
  icon: {
    fontSize: 15,
    cursor: 'pointer'
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false,
    id: "",
    value: '',
    fr: '',
    en: "",
    vat_terms_fr: "",
    vat_terms_en: "",
  }

  componentDidMount() {

    this.setState({
      fr: this.props.obj.fr,
      en: this.props.obj.en,
      value: cvtNumToUserPref(this.props.obj.indice || 0 ),
      color: this.props.obj.color,
      id: this.props.obj._id,
      vat_terms_fr: this.props.obj.vat_terms_fr,
      vat_terms_en: this.props.obj.vat_terms_en
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      fr: nextProps.obj.fr,
      en: nextProps.obj.en,
      value: cvtNumToUserPref(nextProps.obj.indice || 0 ),
      color: nextProps.obj.color,
      id: nextProps.obj._id,
      vat_terms_fr: nextProps.obj.vat_terms_fr,
      vat_terms_en: nextProps.obj.vat_terms_en
    })
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      id: "",
      value: '',
      fr: '',
      en: "",
      color: "",
      indice: 0,
      vat_terms_fr: "",
      vat_terms_en: "",
    })
  };

  handleForm = (name, value) => {
      this.setState({[name]: value})
  }

  updateElement = () => {
    this.setState({ open: false })

    if( this.props.type === 'vat'){
        var num = checkNumFormatRegex( this.state.value || 0 );

        if(num === false){
          alert(this.props.locale.message.error_422_indice)
          return ;
        }
    }

    var data = {
        _id: this.state.id,
        fr: this.state.fr,
        en: this.state.en,
        color: this.state.color,
        value: this.state.value + " %",
        vat_terms_fr: this.state.vat_terms_fr,
        vat_terms_en: this.state.vat_terms_en,
        indice: num || 0
    }

    this.props.pushToDocument("COMPANY", data, `push-pull/modify/set/${this.props.type}/` );

    this.setState({
              id: "",
              value: '',
              indice: 0,
              fr: '',
              en: "",
              color: "",
              vat_terms_fr: "",
              vat_terms_en: ""
    })

  }

  render() {
    const { classes , obj, type, locale } = this.props;
    const {fr, en , color, vat_terms_fr, vat_terms_en, value} = this.state

    return (
      <React.Fragment>
        <EditIcon className={classes.icon} onClick={this.handleOpen}/>
        <Modal
          aria-labelledby={obj._id}
          aria-describedby={obj.en }
          open={this.state.open}
          onClose={this.handleClose}
        >

          <div  className={classes.paper}>
          <Typography variant="subtitle1" align="center">{ locale.subheading.edit_tag }</Typography>
            <TextField
                value={  en ? en : this.props.obj.en }
                onChange={(e) => { this.handleForm(e.target.name, e.target.value) }}
                label={ locale.wording.tag_name_en }
                name="en"
                fullWidth
                margin="dense"
                variant="filled"

            />
             <TextField
                value={ fr ? fr : this.props.obj.fr }
                onChange={(e) => { this.handleForm(e.target.name, e.target.value) }}
                label={locale.wording.tag_name_fr}
                name="fr"
                fullWidth
                margin="dense"
                variant="filled"

            />
            {
              type === 'category_name' ?
            <TextField
                value={ color ? color : this.props.obj.color }
                onChange={(e) => { this.handleForm(e.target.name, e.target.value) }}
                label={locale.wording.tag_hex}
                name="color"
                fullWidth
                inputProps={{ maxLength: 7 }}
                margin="dense"
                variant="filled"

            />
            : null
            }
            {
              type === 'vat' ?
                <TextField
                  value={ value ? value : cvtNumToUserPref(this.props.obj.indice)   }
                  onChange={(e) => { this.handleForm(e.target.name, e.target.value) }}
                  label={locale.wording.rate}
                  name="value"
                  type="text"
                  inputProps={{
                    pattern: /^[0-9]$/gm
                  }}
                  fullWidth
                  margin="dense"
                  variant="filled"

              />
              : null
            }
            {
              type === 'vat' ?
                <TextField
                  value={ vat_terms_fr ? vat_terms_fr : this.props.obj.vat_terms_fr  }
                  onChange={(e) => { this.handleForm(e.target.name, e.target.value) }}
                  label={locale.wording.vat_terms_fr}
                  name="vat_terms_fr"
                  type="text"
                  fullWidth
                  margin="dense"
                  variant="filled"

              />
              : null
            }
            {
              type === 'vat' ?
                <TextField
                  value={ vat_terms_en ? vat_terms_en : this.props.obj.vat_terms_en  }
                  onChange={(e) => { this.handleForm(e.target.name, e.target.value) }}
                  label={locale.wording.vat_terms_en}
                  name="vat_terms_en"
                  type="text"
                  fullWidth
                  margin="dense"
                  variant="filled"

              />
              : null
            }

            <Button variant="contained" color="primary" className={classes.btn} onClick={ this.updateElement }>{locale.wording.save}</Button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {

  return {
      locale: state.locale.locale,
  }
}



const SimpleModalWrapped =  withStyles(styles)(SimpleModal);

export default connect(mapStateToProps, { pushToDocument })(SimpleModalWrapped);
