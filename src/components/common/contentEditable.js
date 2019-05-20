import React from 'react';
import { withStyles, TextField } from '@material-ui/core';

const styles = theme => ({
    textField: {
      '& div input': {
        paddingTop: 5,
        paddingBottom: 5
      }

    }
});

const ContenEditable = (props) => {

  const { value, actionInput, id, name, classes, length } = props;
  return (

        <TextField
          id={name}
          autoComplete="off"
          margin="dense"
          inputProps={{
            maxLength: length || 256
          }}
          fullWidth
          className={classes.textField}
          onChange={ (event) => { actionInput(event, id) } }
          variant="outlined"
          value={value.toString()}
        />
  );
}

const ApxContenEditable =  withStyles(styles)(ContenEditable)

export default ApxContenEditable;

// <p    id={name}
//         suppressContentEditableWarning={true}
//         contentEditable
//         onKeyPress={(e) => { e.key === "Enter" ? actionInput(e, id) : null  }}
//         onBlur={ (event) => { actionInput(event, id) } }>
//         {  value.toString() }
// </p>
