//src/pages/account/modal.js

import React from 'react';
import { connect } from "react-redux"
import { pushToDocument } from '../../../redux/account/actions'
import { withStyles, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


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
        float: 'right',
        marginTop: 24,
        backgroundColor: theme.palette.yellow.dark
    },
    icon: {
        fontSize: 15,
        cursor: 'pointer'
    }
});

class SimpleModal extends React.Component {
    state = {
        open: false,
        load: false,
        indice: "",
        fr: '',
        en: "",
        vat_terms_fr: "",
        vat_terms_en: "",
    }

    componentDidMount() {
        this.setState({ open: this.props.open })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.open })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            fr: '',
            en: "",
            color: "",
            indice: 0,
            vat_terms_fr: "",
            vat_terms_en: "",
        })
    };

    handleForm = (name, value) => {
        this.setState({ [name]: value })
    }

    renderTextField = (en, label, field) => {
        return <TextField
            value={en}
            onChange={(e) => { this.handleForm(e.target.name, e.target.value || " ") }}
            label={this.props.locale.wording[label]}
            name={field}
            type={field === "indice" ? "number" : "text"}
            fullWidth
            margin="dense"
            variant="filled"

        />
    }

    updateElement = async () => {
        this.setState({ load: true })
        var data = {
            vat: {
                fr: this.state.fr,
                en: this.state.en,
                color: this.state.color,
                vat_terms_fr: this.state.vat_terms_fr,
                vat_terms_en: this.state.vat_terms_en,
                indice: parseFloat(this.state.indice) || 0
            }
        }

        await this.props.pushToDocument("COMPANY", data, `push-pull/update/push/`);
        this.props.onCloseModal()

        this.setState({
            indice: 0,
            fr: '',
            en: "",
            color: "",
            vat_terms_fr: "",
            vat_terms_en: "",
            load: false
        })

    }

    render() {
        const { classes, locale } = this.props;
        const { fr, en, vat_terms_fr, vat_terms_en, indice, load } = this.state

        return (
            <React.Fragment>
                <Modal
                    aria-labelledby="add-vat"
                    aria-describedby="add-vat"
                    open={this.state.open}
                    onClose={this.handleClose}
                >

                    <div className={classes.paper}>
                        <Typography variant="h3" align="center" color="primary">{locale.subheading.edit_tag}</Typography>
                        <br />

                        {this.renderTextField(en, "tag_name_en", "en")}

                        {this.renderTextField(fr, "tag_name_fr", "fr")}

                        {this.renderTextField(indice, "rate", "indice")}

                        {this.renderTextField(vat_terms_fr, "vat_terms_fr", "vat_terms_fr")}

                        {this.renderTextField(vat_terms_en, "vat_terms_en", "vat_terms_en")}


                        <Button variant="contained" color="primary" disabled={load} className={classes.btn} onClick={this.updateElement}>{load ? locale.wording.loading : locale.wording.save}</Button>
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


const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default connect(mapStateToProps, { pushToDocument })(SimpleModalWrapped);
