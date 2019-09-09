//src/pages/payment/index.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPaymentInfo } from '../../redux/payment/actions'
import { initLocale } from '../../redux/locale/actions'
import MyStoreCheckout from '../payment/MyStoreCheckout';
import { Paper, withStyles, Button } from '@material-ui/core'
import Header from '../auth/components/header'


class Payment extends Component {

    state = {
        height: window.innerHeight
    }

    componentDidMount() {
        var user_token = this.props.match.params.token_id;
        this.props.getPaymentInfo(user_token)
        window.addEventListener("resize", this.changeHeight)
    }

    changeHeight = () => {
        this.setState({ height: window.innerHeight })
    }

    render() {
        const { classes, locale } = this.props

        return (
            <div className={classes.root} style={{ height: this.state.height }}>

                <Paper className={classes.paper}>
                    <div>
                        <Button color="primary" className={classes.btn} onClick={() => { this.props.initLocale(localStorage.getItem("locale") === "en" ? "fr" : "en") }}  >{localStorage.getItem("locale")}</Button>
                    </div>
                    <Header locale={locale} />
                    <MyStoreCheckout {...this.props} />
                </Paper>
            </div>

        )
    }
}

const styles = theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center'
    },
    paper: {
        position: "relative",
        padding: "20px",
        maxWidth: 450,
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            boxShadow: 'none'
        }
    },
    btn: {
        position: "absolute",
        right: 10,
        top: 10
    }

})

const mapStateToProps = (state) => {
    return {
        locale: state.locale.locale,
    }
}

const StyledPayment = withStyles(styles)(Payment)

export default connect(mapStateToProps, { getPaymentInfo, initLocale })(StyledPayment)
