import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
      position: 'absolute', 
      bottom: 60, 
      padding: '20px',
      fontSize: '9px !important'
  },
  span: {
      color: 'blue', 
      cursor: 'pointer'
  }
});


const Copyright = (props) => {

  const {classes} = props

  return (
        <Typography variant="caption" className={ classes.root }>
                &copy;Copyright {new Date().getFullYear()} by <span className={ classes.span } onClick={ () => { window.open('https://apx-dev.com', '_blank') }}>APX Development Limited</span>. All right reserved.
        </Typography> 
  );
}


const ApxCopyright =  withStyles(styles)(Copyright)

export { ApxCopyright };