//manager/src/components/common/uploadImg.js

import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import CameraAltIcon from '@material-ui/icons/CameraAltOutlined'

const styles = theme => ({

    root: {
        minHeight: 100,
        margin: '0 auto',
        textAlign: 'center',
    },
    wrapper: {
        // margin: 5,
    },
    input: {
        display: 'none'
    }
})

const  UploadImg = (props) => {

    const {classes, image, progress, isUploading, field } = props

    return (
        <div className={ classes.root }>
                    {image}

            { isUploading ? <LinearProgress color="secondary" variant="determinate" value={ progress  } /> : null }

            <div className={ classes.wrapper }>
                <input
                    accept="image/*"
                    className={ classes.input }
                    id={field}
                    onChange={ props._handleUploadFile }
                    name={field}
                    type="file"
                    />

                <label htmlFor={field}>
                <IconButton color="primary" component="p" >
                    <CameraAltIcon />
                </IconButton>

                </label>

            </div>
        </div>
    )
}


export default  withStyles(styles)(UploadImg)
