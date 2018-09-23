// manager/src/components/common/expanded.js
import React  from 'react'
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    heading: {
        color: 'white',
        fontWeight: 400,
        fontSize: '16px'
    },
    expand: {
        backgroundColor: theme.palette.primary.light
    },
    detail: {
        
    }

})

const Expanded = (props) => {
    const {classes} = props

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary className={ classes.expand } expandIcon={<ExpandMoreIcon className={classes.heading}/>}>
                <Typography className={classes.heading}>{ props.heading }</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={ classes.detail }>
                    {props.children}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

const ApxExpanded =  withStyles(styles)(Expanded)

export { ApxExpanded }