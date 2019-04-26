//src/pages/account/modal.js

import React from 'react';
import {connect} from "react-redux"
import {pushToDocument} from '../../redux/account/actions'
import { withStyles, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/EditOutlined'
import { checkNumFormatRegex } from '../../utils/help_function'


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
    overflow: "hidden"
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
    vat_terms: "",
    en: ""
  }

  componentDidMount() {
    this.setState({
      fr: this.props.obj.fr,
      en: this.props.obj.en,
      value: this.props.obj.indice,
      color: this.props.obj.color,
      id: this.props.obj._id,
      vat_terms: this.props.obj.vat_terms
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      fr: nextProps.obj.fr,
      en: nextProps.obj.en,
      value: nextProps.obj.indice,
      color: nextProps.obj.color,
      id: nextProps.obj._id,
      vat_terms: nextProps.obj.vat_terms
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
      vat_terms: ""
    })
  };

  handleForm = (name, value) => {
    console.log(name + "=> "+ value)
      this.setState({[name]: value})
  }

  updateElement = () => {
    this.setState({
      open: false,
      id: "",
      value: '',
      fr: '',
      en: "",
      color: "",
      vat_terms: ""
    })
    if( this.props.type === 'vat' && typeof this.state.value !== "number" ){
        var num = checkNumFormatRegex( this.state.value || 0 )
    }
    var data = {
        _id: this.state.id,
        fr: this.state.fr,
        en: this.state.en,
        color: this.state.color,
        value: this.state.indice + " %",
        vat_terms: this.state.vat_terms,
        indice: num || 0
    }

    console.log(data)

    this.props.pushToDocument("COMPANY", data, `push-pull/modify/set/${this.props.type}/` );

  }

  render() {
    const { classes , obj, type, locale } = this.props;
    const {fr, en , color, vat_terms, indice} = this.state

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
                  value={ indice ? indice : this.props.obj.indice  }
                  onChange={(e) => { this.handleForm(e.target.name, e.target.value) }}
                  label={locale.wording.rate}
                  name="indice"
                  type="number"
                  fullWidth
                  margin="dense"
                  variant="filled"

              />
              : null
            }
            {
              type === 'vat' ?
                <TextField
                  value={ vat_terms ? vat_terms : this.props.obj.vat_terms  }
                  onChange={(e) => { this.handleForm(e.target.name, e.target.value) }}
                  label={locale.wording.vat_terms}
                  name="vat_terms"
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
