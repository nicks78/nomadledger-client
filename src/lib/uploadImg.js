//manager/src/components/common/uploadImg.js

import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import CameraAltIcon from '@material-ui/icons/CameraAltOutlined'

const styles = theme => ({

    root: {
        minHeight: 100, 
        maxWidth: '100px', 
        margin: '0 auto',
        textAlign: 'center',
        display: 'inline'
    },
    wrapper: {
        margin: 5, 
    },
    input: {
        display: 'none'
    }
})

class  UploadImg extends  React.Component {

    _handleFile (file) {
        if(file){
            if(file.type === 'image/png' || file.type === 'image/jpeg' ){ // Check file format 
                return file
            }else{
                alert('FILE TYPE NOT AUTHORIZED !')
            }
        }
        return false
    }
  
    _uploadFile = (event) => {
        var value = this._handleFile(event.target.files[0]);
        var fieldName = event.target.name;
        var actionType = this.props.reducer;

        if(value){
            this.props._handleUploadFile( actionType, value, this.props.idModel || actionType.toLowerCase(), fieldName, this.props.oldFile )
        }
    }

    render(){

    const {classes, image, progress, isUploading, field } = this.props

    return (
        <div className={ classes.root }>
                    {image}
                    { isUploading ? <LinearProgress color="secondary" variant="determinate" value={ progress  } /> : null }
            <div className={ classes.wrapper }>
                <input
                    accept="image/*"
                    className={ classes.input }
                    id={field}
                    onChange={ this._uploadFile }
                    name={field}
                    type="file"
                    />
                
                <label htmlFor={field}>
                <IconButton variant="contained" component="p" >
                    <CameraAltIcon />
                </IconButton>
                
                </label>
            
            </div> 
        </div>
        )
    }
}


export default  withStyles(styles)(UploadImg)