import React from 'react';
import { withStyles, TextField } from '@material-ui/core';

const styles = theme => ({
  textField: {
    margin: 0,
    '& div input': {
      paddingTop: 5,
      paddingBottom: 5,
      overflow: "hidden"
    }

  }
});

const ContenEditable = (props) => {

  const { value, actionInput, id, name, classes, length, placeholder, row, type, multiline } = props;


  return (

    <TextField
      id={name}
      type={type || "text"}
      placeholder={placeholder || ""}
      autoComplete="off"
      margin="dense"
      multiline={multiline || false}
      inputProps={{
        maxLength: length || "256",
        rows: row || "1"
      }}
      fullWidth
      className={classes.textField}
      style={{ minWidth: length === "5" ? "130%" : "100%" }}
      onChange={(event) => { actionInput(event, id) }}
      variant="outlined"
      value={value.toString()}
    />
  );
}

const ApxContenEditable = withStyles(styles)(ContenEditable)

export default ApxContenEditable;

// <p    id={name}
//         suppressContentEditableWarning={true}
//         contentEditable
//         onKeyPress={(e) => { e.key === "Enter" ? actionInput(e, id) : null  }}
//         onBlur={ (event) => { actionInput(event, id) } }>
//         {  value.toString() }
// </p>
