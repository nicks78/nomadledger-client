//manager/src/pages/account/setting.js

import React, { Component } from 'react'
import { withStyles, Typography, Divider } from '@material-ui/core';
import { updateDocument, createState } from './actions'
import { ApxTitleBar, ApxDatePicker, ApxtextIndexValue } from '../../components/common'
import {connect} from 'react-redux'
import EditSelect from '../../lib/editSelect'
// import EditInput from '../../lib/editInput'

import {company_type} from '../../utils/static_data'

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginBottom: 18
    },
    content: {
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10
    },
    divider: {
        clear: 'both',
    }    
});

class Setting extends Component {

    state = {
        showEdit: false,
        reducer: 'COMPANY'
    }

    openEdit = () => {
        this.setState({showEdit: !this.state.showEdit})
    }

    handleFormEdit  = event => {
        var name = event.target.name;
        var value = event.target.value
        // Temporary save data into redux store
        this.props.createState(this.state.reducer, name, value)
    }

    updateDocument = () => {
        this.setState({showEdit: false})
        this.props.updateDocument(this.state.reducer)
    }

    handleDate = (name, value) => {
        this.props.createState(this.state.reducer, name, value)
    }


    render() {
        const {classes, locale, company} = this.props;
        const { showEdit } = this.state;
       
        if(company === null ){
            return <p>...</p>
        }

        return (
            <div>
                <ApxTitleBar 
                    text={locale.page.header_02 }
                    showEdit={showEdit}
                    openAction={ this.openEdit }
                    editAction={ this.updateDocument }
                />

                <div className={classes.content}>
                    <Typography variant="subtitle2"  >
                        {locale.form.title.label_tax}
                    </Typography>
                    <Divider className={ classes.divider }/>
                    <EditSelect 
                        arrayField={company_type}
                        field="company_type"
                        helperText="select_service_type"
                        handleAction={ this.handleFormEdit }
                        locale={locale}
                        showEdit={showEdit}
                        label={locale.form.field.company_type}
                        value={ company.company_type[localStorage.getItem("locale")]}
                    />
                    <EditSelect 
                        arrayField={[{fr: 'Francais (00,00)', en: 'French (00,00)', value: 'fr'}, {fr: 'Anglais (00.00)', en: 'English (00.00)', value: 'en'}]}
                        field="num_format"
                        helperText="select_num_format"
                        handleAction={ this.handleFormEdit }
                        locale={locale}
                        showEdit={showEdit}
                        label={locale.form.field.num_format}
                        value={ company.num_format[localStorage.getItem("locale")]}
                    />
                    <br />
                    <Typography variant="subtitle2">
                        {locale.form.title.label_tax}
                    </Typography>
                    <Divider className={ classes.divider }/>

                    

                    {
                        showEdit ? 
                            <ApxDatePicker 
                                handleDate={ this.handleDate }
                                value={company.start_date.label} 
                                field="start_date"
                            />
                        : 
                        <ApxtextIndexValue 
                            value={company.start_date.label} 
                            label={locale.form.title.label_start_tax}
                        /> 
                    }
                     {
                        showEdit ? 
                            <ApxDatePicker 
                                handleDate={ this.handleDate }
                                value={company.end_date.label} 
                                field="end_date"
                            />
                        : 
                        <ApxtextIndexValue 
                            value={company.end_date.label} 
                            label={locale.form.title.label_end_tax}
                        /> 
                    }
                        
                </div>

                
            </div>
        )
  }
}

const mapStateToProps = (state) => {

    return {
        locale: state.locale.locale,
        company: state.account.company.item,
    }
}

const styledSetting = withStyles(styles)(Setting);

export default connect(mapStateToProps, { updateDocument, createState })(styledSetting);