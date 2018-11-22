import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    banner: {
        backgroundImage: 'url(http://localhost:8080/img/background.jpg)',
        backgroundSize: 'cover',
        padding: '10%',
        textAlign: 'center'
    },
    title: {
        color: theme.palette.secondary.main,
        fontWeight: 900,
    },
    subtitle: {
        color: 'white'
    },
});

const Banner = (props) => {

    const { classes } = props 

  return (
    <div className={ classes.banner }>
            <Typography variant="display3" className={ classes.title }>
                    APX-COMPTA
            </Typography>
            <Typography variant="display1" className={ classes.subtitle }>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt.
            </Typography>
    </div>
  );
}

const ApxBanner = withStyles(styles)(Banner);

export { ApxBanner };