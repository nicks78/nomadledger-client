//manager/src/lib/addVat.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushToDocument, getAccount } from '../../redux/account/actions'
import { withStyles, TextField, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddOutlined'
import ApxTag from '../../components/common/tag'
import Spinner from '../../components/common/spinner'
import { cvtNumToUserPref } from '../../utils/help_function'
import { setNotification } from '../../redux/notification/actions'




const styles = theme => ({
    addVat: {
        position: 'relative',
        marginTop: 24
    },
    textField: {
        width: '45%',
        marginRight: 5
    },
    addBtn: {
        position: 'absolute',
        bottom: 8,
        right: 0,
        cursor: 'pointer'
    },
    tagWrapper: {
        marginTop: 24
    }
})



class AddVat extends Component {


    state = {
        name: '',
        vat_terms_fr: "",
        vat_terms_en: "",
        indice: "",
        reducer: "COMPANY",
        addApi: 'push-pull/update/push/',
        deleteApi: 'push-pull/update/pull/'
    }

    componentDidMount() {
        if (this.props.receivedAt === null) {
            this.props.getAccount(this.state.reducer)
        }
    }

    _handleFormEdit = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({ [name]: value })
    }

    _pushToDoc = () => {

        if (this.state.name === '') {
            this.props.setNotification("error_422_name_vat", "error")
            return;
        }


        var data = {
            vat: {
                en: this.state.name,
                fr: this.state.name,
                indice: this.state.indice || "",
                vat_terms_fr: this.state.vat_terms_fr,
                vat_terms_en: this.state.vat_terms_en
            }
        }
        this.setState({ name: '', indice: 0, vat_terms_fr: "", vat_terms_en: "" })
        this.props.pushToDocument(this.state.reducer, data, this.state.addApi)
    }


    deleteCategory = (id) => {
        var data = {
            vat: { _id: id }
        }
        this.props.pushToDocument(this.state.reducer, data, this.state.deleteApi)
    }

    render() {
        const { locale, classes, company, isFetching } = this.props

        if (isFetching || company === null) {
            return <Spinner />
        }


        return (
            <div>

                <div className={classes.addVat}>
                    <TextField
                        id="vatname"
                        label={locale.wording.name}
                        className={classes.textField}
                        value={this.state.name}
                        name="name"
                        onChange={this._handleFormEdit}
                        margin="normal"
                    />

                    <TextField
                        id="vat"
                        type="number"
                        label={locale.wording.add_vat}
                        className={classes.textField}
                        value={this.state.indice}
                        name="indice"
                        onKeyPress={(e) => { e.key === "Enter" && this._pushToDoc() }}
                        onChange={this._handleFormEdit}
                        margin="normal"
                    />
                    <TextField
                        id="vat_terms"
                        type="text"
                        label={locale.wording[`vat_terms_${localStorage.getItem("locale")}`]}
                        style={{ width: "90%" }}
                        value={this.state[`vat_terms_${localStorage.getItem("locale")}`]}
                        name={`vat_terms_${localStorage.getItem("locale")}`}
                        onKeyPress={(e) => { e.key === "Enter" && this._pushToDoc() }}
                        onChange={this._handleFormEdit}
                        margin="normal"
                    />

                    <Fab size="small" color="primary" onClick={this._pushToDoc} className={classes.addBtn}><AddIcon /></Fab>

                </div>

                <div className={classes.tagWrapper}>

                    {
                        company.vat.map((vat, index) => {
                            return <ApxTag
                                key={index}
                                obj={vat}
                                edit={true}
                                type="vat"
                                canDelete={company.vat.length === 1 ? false : true}
                                color="secondary"
                                variant="outlined"
                                actionTag={() => { this.deleteCategory(vat._id) }}
                                label={vat[localStorage.getItem('locale')] + ' (' + cvtNumToUserPref(vat.indice || 0) + ")"}
                            />
                        })
                    }


                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        isFetching: state.account.company.isFetching,
        receivedAt: state.account.company.receivedAt,
        isError: state.account.company.isError,
        company: state.account.company.item,
        message: state.account.company.message,
        locale: state.locale.locale,
    }
}



const StyledAddVat = withStyles(styles)(AddVat);

export default connect(mapStateToProps, { getAccount, pushToDocument, setNotification })(StyledAddVat);
