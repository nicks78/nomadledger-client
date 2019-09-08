import React from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_URL } from '../../../redux/constant'
import { withStyles, Typography, Button } from "@material-ui/core"

const EmptyChart = (props) => {

    const { classes, locale } = props;

    return (
        <div className={classes.root}>
            <div style={{ textAlign: "center" }}>
                <img src={`${DEFAULT_URL}img/logo-white-Pastille.png`} width="100" alt="logo-white-pastille" />
                <Typography variant="body2" className={classes.text}><strong>Hello {props.user.firstname},</strong></Typography>
                <Typography variant="caption" className={classes.subtext} dangerouslySetInnerHTML={{ __html: locale.dashboard.empty_stat }} />
                <Button component={Link} to="/invoice/create"
                    variant="contained" color="primary"
                    className={classes.button}>
                    {locale.invoice.btn_create}
                </Button>
            </div>
        </div >
    )
}


const styles = theme => ({
    root: {
        minHeight: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: "1.4em"
    },
    subtext: {
    },
    button: {
        color: 'white !important',
        backgroundColor: theme.palette.yellow.dark,
        marginRight: 10,
        marginTop: 12,
        marginBottom: theme.margin.unit,
        '& :hover': {
            color: 'white !important',
        }
    }
})




export default withStyles(styles)(EmptyChart)
