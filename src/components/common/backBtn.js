//src/components/common/backBtn.js

import React from 'react'
import {history} from '../../routes/history'
import { withStyles, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'


const BackBtn = (props) => {
    const { classes, styled } = props;

    return <IconButton  variant="outline" onClick={ () => { history.goBack() } } ><ArrowBackIcon style={styled} className={ classes.backBtn }/></IconButton>
}

const styles = theme => ({
    backBtn: {
        fontSize: '20px',
        cursor: 'pointer',
        // marginBottom: 15,
        transition: 'all .2s ease',
        '&:hover': {
            // color: theme.palette.secondary.main
        }
    },
})

const ApxBackBtn = withStyles(styles)(BackBtn);

export default ApxBackBtn;
