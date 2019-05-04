import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
      position: 'absolute',
      bottom: 55,
      padding: '20px',
      color: '#303030',
      fontSize: '9px !important',
      [theme.breakpoints.down('sm')]: {
        bottom: 5,
        position: 'relative',
        padding: '10px',
      }
  },
  span: {
      color: '#8c8c8c',
      cursor: 'pointer'
  }
});


const Copyright = (props) => {

  const {classes} = props

  return (
        <Typography variant="caption" className={ classes.root }>
                &copy;Copyright {new Date().getFullYear()} by&nbsp;
                <span className={ classes.span } onClick={ () => { window.open('https://apx-dev.com', '_blank') }}>
                  APX Development Limited</span>. All right reserved.&nbsp;
                  <span className={ classes.span } onClick={() => { window.open('https://api.nomadledger.com/terms.pdf') }}>Terms & Conditions</span>
        </Typography>
  );
}


const ApxCopyright =  withStyles(styles)(Copyright)

export default ApxCopyright;
