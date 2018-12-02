//manager/src/components/common/uploadImg.js
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {API_ENDPOINT} from '../../utils/constant'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import CameraAltIcon from '@material-ui/icons/CameraAltOutlined'


const styles = theme => ({

    root: {
        minHeight: 100, 
        width: '150px', 
        margin: '0 auto'
    },
    wrapper: {
        margin: 5, 
        textAlign: 'center'
    },
    input: {
        display: 'none'
    }


})

const  UploadImg = (props) => {

    const {classes, image, progress, isCreating, uploadFile } = props

    return (
        
        <div className={ classes.root }>
                    <img src={`${API_ENDPOINT}image/view${ image || '/default/default_logo.png' }`} alt="logo" width="100%" height={null} />
                    
                    { isCreating ? <LinearProgress color="secondary" variant="determinate" value={ progress  } /> : null }
            <div className={ classes.wrapper }>
                <input
                    accept="image/*"
                    className={ classes.input }
                    id="contained-button-file"
                    onChange={ uploadFile }
                    name="logo"
                    type="file"
                    />
                
                <label htmlFor="contained-button-file">
                <IconButton variant="contained" component="span" >
                <CameraAltIcon />
                </IconButton>
                
            </label>
            
            </div>
        </div>
 
    )
}

const ApxUploadImg = withStyles(styles)(UploadImg);

export {ApxUploadImg};