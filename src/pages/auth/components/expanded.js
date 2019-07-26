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
    const {classes, locale} = this.props
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
          <Typography className={classes.heading}>{locale.home_page.questions.q_1}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.para} variant="body2" dangerouslySetInnerHTML={{ __html: locale.home_page.questions.r_1 }}/>
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
          <Typography className={classes.heading}>{locale.home_page.questions.q_2}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.para} variant="body2"  dangerouslySetInnerHTML={{ __html: locale.home_page.questions.r_2 }}/>
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
          <Typography className={classes.heading}>{locale.home_page.questions.q_3}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.para} variant="body2"  dangerouslySetInnerHTML={{ __html: locale.home_page.questions.r_3 }}/>
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
        flexBasis: '90%',
        flexShrink: 0,
    },
    icon: {
      color: 'white'
    },
    expand: {
        backgroundColor: theme.palette.secondary.light,
        height: 64
    },
    para: {
        margin: 24
    }
})

export default withStyles(styles)(Expanded)