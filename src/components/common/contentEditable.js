import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({

});

const ContenEditable = (props) => {

  const { value, actionInput, id, name } = props;
  return (
        <div    id={name}
                suppressContentEditableWarning={true} 
                contentEditable 
                onBlur={ (event) => { actionInput(event, id) } }>
                {  value.toString() }
        </div>
  );
}

const ApxContenEditable =  withStyles(styles)(ContenEditable)

export default ApxContenEditable;