//src/components/common/boxHint.js
import React from 'react'
import {withStyles, Typography} from '@material-ui/core'

const BoxHint = (props) => {
    const { classes, content } = props
    return (
        <div className={classes.boxWrapper}>
            <Typography component="div" dangerouslySetInnerHTML={{__html: content }}></Typography>
        </div>
    )
}

const styles = theme => ({
    boxWrapper: {
        width: "50%",
        float: "right",
        marginTop: 24,
        marginLeft: 10,
        padding: 5,
        borderRadius: 4,
        border: `1px solid #b8daff`,
          color: "#004085",
          backgroundColor: theme.palette.thinDarkBlue,//  "#cce5ff"
      },
})

export default withStyles(styles)(BoxHint)