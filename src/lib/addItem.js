//manager/src/components/lib/addItem.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ApxExpanded from '../components/common/expanded'
import UploadFile from './file/upload'
import ApxForm from '../components/common/form'
import ApxRightDrawer from '../components/common/rightDrawer'
import Spinner from '../components/common/spinner'
import ApxButtonCircle from '../components/common/buttonCircle'
import LinearProgress from '@material-ui/core/LinearProgress';
import Hidden from '@material-ui/core/Hidden';
import { checkNumFormatRegex } from '../utils/help_function'
import { setNotification } from '../redux/notification/actions'


const styles = theme => ({
    root: {
        flex: 1,
        marginBottom: theme.margin.unit,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 0
        },
    },
    formWindow: {
        minWidth: '100px',
        maxWidth: '500px',
        paddingBottom: theme.padding.unit,
        paddingRight: theme.padding.unit,
        paddingLeft: theme.padding.unit,
        height: '100%',
        // clear: 'both'
    },
    button: {
        color: 'white',
        backgroundColor: '#FAB745',
        marginRight: 10,
        width: 120
    },
    container: {
        // display: 'flex',
        flexWrap: 'wrap',
    },
    card: {
        marginTop: theme.margin.unit,
        width: '100%'
    },
    btnSave: {
        float: 'right',
        marginTop: '24px',
        marginBottom: '24px',
        color: 'white',
        backgroundColor: theme.palette.yellow.dark,
        width: 120
    },
    loading: {
        margin: 10
    }
})


class Add extends Component {

    state = {
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    }

    componentDidMount() {
        if (this.props.location) {
            this.setState({ right: this.props.location.state ? this.props.location.state.right : false })
        }
    }

    handleChange = async (event) => {
        var fieldName = event.target.name;
        var value = event.target.value;

        if (fieldName === "price" || fieldName === "selling_price" || fieldName === "buying_price") {
            if (checkNumFormatRegex(value) === false) {
                this.props.setNotification("error_422_price", 'warning');
                return
            }
        }
        this.props.createItemState(this.props.reducer, fieldName, value)
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        // Expense date cannot be above of current date
        if (!this.checkDateExpense()) { return; }

        this.props.createItem(this.props.reducer, this.props.newData)
    }

    checkDateExpense = () => {
        if (this.props.reducer === "EXPENSE") {
            var date_1 = new Date().getTime();
            var date_2 = new Date(this.props.newData.receipt_date.date).getTime();

            if (date_2 > date_1) {
                this.props.setNotification("error_date_expense", "error");
                return false;
            }
        }
    }

    render() {

        const { locale, newData, classes, formFields, addBtnTitle, headerText, limitUploadFile, isUploading, progress, isCreating } = this.props

        const formDrawer = (
            <div className={classes.formWindow}>
                <form className={classes.container} onSubmit={this.onFormSubmit} autoComplete="off">
                    {
                        formFields.map((form, index) => {
                            return <div key={index} className={classes.card}>
                                <ApxExpanded heading={form.label}>
                                    <ApxForm formField={form.fields} formHandler={this.handleChange} locale={locale} xs={12} md={6} objData={newData} />
                                </ApxExpanded>
                            </div>
                        })
                    }
                    <div className={classes.card}>
                        {limitUploadFile > 0 ?
                            <ApxExpanded heading={locale.subheading.label_assets}>
                                <UploadFile
                                    getImages={(arrayImages) => { this.props.createItemState(this.props.reducer, "doc", arrayImages) }}
                                    docType="all"
                                    images={newData.doc || []}
                                    btnLabel={locale.wording.upload}
                                    limitUploadFile={limitUploadFile} />
                            </ApxExpanded>
                            : null
                        }
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isCreating}
                        className={classes.btnSave}
                    >
                        {isCreating ? locale.wording.loading : locale.wording.save}
                    </Button>
                </form>

            </div>
        );
        return (
            <div className={classes.root}>
                <Hidden only={['xs', 'sm']}>
                    <Button variant="contained" color="primary" disabled={isCreating} className={classes.button} onClick={this.toggleDrawer('right', true)}>{isCreating ? locale.wording.loading : addBtnTitle}</Button>
                </Hidden>
                <ApxRightDrawer toggleDrawer={this.toggleDrawer} side="right" open={this.state.right} title={headerText} requiredText={locale.message.error_400}>

                    {
                        isUploading ?
                            <div className={classes.loading}>
                                <Spinner /><br />
                                <p>{progress} %</p>
                                <LinearProgress color="primary" variant="determinate" value={progress} />
                            </div>
                            : formDrawer
                    }
                </ApxRightDrawer>
                <Hidden only={['lg', 'xl', 'md']}>
                    <ApxButtonCircle
                        handleAction={this.toggleDrawer}
                        open={true}
                        variant="contained"
                        color="primary"
                        side="right"
                    />
                </Hidden>
            </div>
        )
    }
}


const AddItem = withStyles(styles)(Add)

export default connect(null, { setNotification })(AddItem);
