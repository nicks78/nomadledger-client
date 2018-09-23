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
        paddingLeft: 10
    },
    gallery: {
        width: '100%'
    },
    listItem: {
        width: '100%'
    }

})

const  Upload = (props) => {

    const {classes, images, authNumberFile } = props
    console.log(images.length)

    return (
    <div className={ classes.root}>
        <List className={ classes.gallery }>
            {
                images.map((value, index) => {
                    return  <ListItem key={index} dense button className={classes.listItem}>
                                <Avatar alt={value.name} src={URL.createObjectURL(value)} />
                                <ListItemText primary={value.name} />
                                <ListItemSecondaryAction>
                                    <IconButton className={classes.closeIcon} onClick={ () => { alert('delete') }  }>
                                        <CloseIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                })
            }
        </List>
    <br />
        {  images.length < authNumberFile &&
            <div className={classes.button}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="flat-button-file"
                    multiple
                    onChange={ props.onChange }
                    type="file"
                />
                <label htmlFor="flat-button-file">
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

export {ApxUpload};