import React from 'react';
import Typography from '@material-ui/core/Typography';

const ApxCopyright = () => {

  return (
        <Typography variant="caption" style={{ position: 'absolute', bottom: 60, padding: '20px',fontSize: '5px !important' }}>
                &copy;Copyright 2018 by <span style={{ color: 'blue', cursor: 'pointer'}} onClick={ () => { window.open('https://apx-dev.com', '_blank') }}>APX Development Limited</span>. All right reserved.
        </Typography> 
  );
}

export { ApxCopyright };