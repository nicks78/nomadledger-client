//src/components/common/tooltips.js

import React from 'react'
import {Tooltip , withStyles} from '@material-ui/core'


const Tooltips = (props) => {

    const {classes, title } = props

    return (
      <Tooltip classes={{ tooltip: classes.lightTooltip }} className={ classes.iconHelp } title={title}>
        { props.children }
      </Tooltip>
    )
}


const styles = theme => ({
    lightTooltip: {
      color: 'white',
      fontWeight: 500,
      maxWidth: 500,
      textAlign: 'center',
      padding: '5px 5px 5px 5px',
      fontSize: 12,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,1)',
      fontFamily: "Quicksand"
  },
  iconHelp: {
    fontSize: 18
  }
})


export default withStyles(styles)(Tooltips);
