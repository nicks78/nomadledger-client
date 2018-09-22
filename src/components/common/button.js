import React from 'react';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const ApxButton = (props) => {

  return (
    <div>
      <Button variant={props.variant} color={props.color} onClick={ props.action } className={styles.button}>
          {props.title}
      </Button>
    </div>
  );
}

export { ApxButton };