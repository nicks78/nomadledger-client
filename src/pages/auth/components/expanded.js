//src/pages/auth/jumbotron.js

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



class Expanded extends React.Component {

    state = {
        expanded: "panel1",
    }

    handleChange = (panel) => {
        // console.log(event)
        this.setState({expanded: panel })
    }

    render(){
    const {classes} = this.props
    const {expanded} = this.state
    

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === 'panel1'} className={classes.panel} onChange={() => this.handleChange('panel1')}>
        <ExpansionPanelSummary
            className={ classes.expand }
            style={{ backgroundColor: expanded === "panel1" ? "#188A8D" : "#62C1C5" , borderRadius: 4}}
            expandIcon={<ExpandMoreIcon className={ classes.icon } />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
          <Typography className={classes.heading}>General settings</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.para} variant="body2" >
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} className={classes.panel}  onChange={() => this.handleChange('panel2')}>
        <ExpansionPanelSummary
          className={ classes.expand }
          style={{ backgroundColor: expanded === "panel2" ? "#188A8D" : "#62C1C5" , borderRadius: 4}}
          expandIcon={<ExpandMoreIcon className={ classes.icon } />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Users</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.para} variant="body2" >
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel3'} className={classes.panel}  onChange={() => this.handleChange('panel3')}>
        <ExpansionPanelSummary
          className={ classes.expand }
          style={{ backgroundColor: expanded === "panel3" ? "#188A8D" : "#62C1C5" , borderRadius: 4}}
          expandIcon={<ExpandMoreIcon className={ classes.icon } />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Advanced settings</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.para} variant="body2" >
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
    }
}


const styles = theme => ({
    root: {
      width: '100%',
    },
    panel: {
        boxShadow: "none",
        marginTop: 10
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        color: 'white',
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    icon: {
      color: 'white'
    },
    expand: {
        backgroundColor: theme.palette.secondary.light,
    },
    para: {
        margin: 24
    }
})

export default withStyles(styles)(Expanded)