import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseOutlined'
import { resizeFile } from '../../utils/resizeFile'
import { setNotification } from '../../redux/notification/actions'


class UploadFile extends React.Component {

    uploadImages = (event) => {
        let file = event.target.files[0];

        if (!file) {
            this.props.setNotification("error_file_found", 'error');
            return
        }

        // Resize file before upload
        resizeFile(file, this.callback)

        return
    }


    // Callback after resizing image
    callback = (file) => {
        let value = this.handleFile(file)
        this.props.getImages(value)
    }

    handleFile(file) {
        let imagesArray = this.props.images ? this.props.images : [];
        if (file) {
            if (file.type === 'image/png' || file.type === 'image/jpeg') { // Check file format
                file.blob = URL.createObjectURL(file)
                imagesArray.push(file)
            } else {
                this.props.setNotification("error_file_not_allowed", 'warning');
            }
        }
        return imagesArray
    }
    handleRemoveItem = (id, field) => {
        let images = this.props.images;
        let newImages = [];
        for (let i = 0; i < images.length; i++) {
            if (images[i][field] !== id) {
                newImages.push(images[i]);
            }
        }
        this.props.getImages(newImages)
    }

    render() {

        const { classes, images, limitUploadFile, docType, btnLabel } = this.props;
        const idInput = Date.now().toString();

        return (
            <div className={classes.root}>
                <List className={classes.gallery}>
                    {
                        images.map((value, index) => {
                            return <ListItem key={index} dense button className={classes.listItem}>
                                <a href={value.blob} target="_blank"><Avatar alt={value.name} src={value.blob} /></a>
                                <ListItemText primary={value.name.slice(0, 10) + "..."} />
                                <ListItemSecondaryAction>
                                    <IconButton className={classes.closeIcon} onClick={() => { this.handleRemoveItem(value.lastModified, 'lastModified') }}>
                                        <CloseIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        })
                    }
                </List>
                <br />
                {images.length < limitUploadFile &&
                    <div className={classes.button}>
                        <input
                            accept={docType}
                            className={classes.input}
                            id={idInput}
                            onChange={this.uploadImages}
                            type="file"
                        />
                        <label htmlFor={idInput}>
                            <Button variant="outlined" color="secondary" component="span" className={classes.button}>
                                {btnLabel}
                            </Button>
                        </label>
                    </div>
                }

            </div>
        )
    }
}

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

const StyledUploadFile = withStyles(styles)(UploadFile);

export default connect(null, { setNotification })(StyledUploadFile);
