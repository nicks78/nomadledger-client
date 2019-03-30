//manager/src/components/common/upload.js

import React  from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseOutlined'

const styles = theme => ({

    input: {
        display: 'none'
    },
    closeIcon: {
        color: 'red',
    },
    gallery: {
    },
    listItem: {
        width: '100%'
    }
})


const  Upload = (props) => {

    const { classes, images  } = props;
    const idInput =  Date.now().toString();

    return (
    
    <div className={ classes.root}>
        {  images.length < limitUploadFile &&
            <div className={classes.button}>
                <input
                    accept={docType}
                    className={classes.input}
                    id={idInput}
                    name="doc"
                    onChange={ props.onChange }
                    type="file"
                />
                <label htmlFor={idInput}>
                    <Button variant="outlined" color="secondary" component="span" className={classes.button}>
                        {props.title}
                    </Button>
                </label>
            </div>
        }
        
    </div>
    )
}

const ApxUpload = withStyles(styles)(Upload);

export default ApxUpload;