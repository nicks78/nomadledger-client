//manager/src/pages/account/setting.js

import React, { Component } from 'react'
import { withStyles, Typography, Divider } from '@material-ui/core';
import { updateDocument, createState } from '../../redux/account/actions'
import { ApxTitleBar } from '../../components/common'
import {connect} from 'react-redux'
import EditSelect from '../../lib/editSelect'



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
        marginBottom: 10
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

    updateDocument = () => {
        this.setState({showEdit: false})
        this.props.updateDocument(this.state.reducer)
    }


    render() {
        const {classes, locale, company} = this.props;
        const { showEdit , reducer} = this.state;
       
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
                        {locale.form.title.label_other}
                    </Typography>
                    <Divider className={ classes.divider }/>
                    
                    <EditSelect 
                        arrayField={[{fr: 'Francais (00,00)', en: 'French (00,00)', value: 'fr'}, {fr: 'Anglais (00.00)', en: 'English (00.00)', value: 'en'}]}
                        field="num_format"
                        helperText="select_num_format"
                        handleAction={ (event) => { this.props.handleFormEdit(event, reducer) } }
                        locale={locale}
                        showEdit={showEdit}
                        label={locale.form.field.num_format}
                        value={ company.num_format[localStorage.getItem("locale")]}
                    />

                </div>
                <br />
                    
                
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