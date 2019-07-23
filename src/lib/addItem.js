//manager/src/components/lib/addItem.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ApxExpanded from '../components/common/expanded'
import ApxUpload from '../components/common/upload'
import ApxForm from '../components/common/form'
import ApxRightDrawer  from '../components/common/rightDrawer'
import Spinner from '../components/common/spinner'
import ApxButtonCircle from '../components/common/buttonCircle'
import LinearProgress from '@material-ui/core/LinearProgress';
import Hidden from '@material-ui/core/Hidden';
import {checkNumFormatRegex} from '../utils/help_function'
import {resizeFile} from '../utils/resizeFile'
import {setNotification} from '../redux/notification/actions'


const styles = theme => ({
    root: {
        flex: 1,
        marginBottom: theme.margin.unit,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 0
        },
    },
    formWindow: {
      minWidth: '100px',
      maxWidth: '500px',
      paddingBottom: theme.padding.unit,
      paddingRight: theme.padding.unit,
      paddingLeft: theme.padding.unit,
      height: '100%',
      // clear: 'both'
    },
    button: {
        color: 'white',
        backgroundColor: '#FAB745',
        marginRight: 10,
        width: 120
    },
    container: {
        // display: 'flex',
        flexWrap: 'wrap',
    },
    card: {
        marginTop: theme.margin.unit,
        width: '100%'
    },
    btnSave: {
        float: 'right',
        marginTop: '24px',
        marginBottom: '24px',
        color: 'white',
        backgroundColor: theme.palette.yellow.dark,
        width: 120
    },
    loading: {
        margin: 10
    }
})


class Add extends Component {

    state = {
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
    }

     handleChange = async (event) => {
        var fieldName = event.target.name;
        var value = event.target.value;

        if(fieldName === "price" || fieldName === "selling_price" || fieldName === "buying_price"){

          if(checkNumFormatRegex(value) === false){
            this.props.setNotification("error_422_price", 'warning');
            return
          }
        }

        if(fieldName === 'doc'){ // If input file
            // Resize file before upload
            var file = event.target.files[0];
            if(!file){return;}
            resizeFile( file, this.callback )

            return;
        }else{
            this.props.createItemState( this.props.reducer, fieldName, value )
        }

    }

    // Callback after resizing image
    callback = (file) => {
        var value = this.handleFile(file)
        this.props.createItemState( this.props.reducer, "doc", value )
    }

    handleFile (file) {
        var imagesArray = this.props.newData.doc ?  this.props.newData.doc : [];
        if(file){
            if(file.type === 'image/png' || file.type === 'image/jpeg' ){ // Check file format
                file.blob = URL.createObjectURL(file)
                imagesArray.push(file)
            }else{
                this.props.setNotification("error_file_not_allowed", 'warning');
            }
        }
        return imagesArray
    }

    handleRemoveItem = ( id, field, fieldName ) => {
        var images = this.props.newData.doc;
        var newImages = [];
        for(var i = 0 ; i < images.length ; i++){
            if( images[i][field] !== id ){
                newImages.push(images[i]);
            }
        }
        this.props.createItemState( this.props.reducer, fieldName, newImages )
    }


    onFormSubmit = (e) => {
      e.preventDefault();
      this.props.createItem(this.props.reducer, this.props.newData)
    }

    render() {

        const { locale, newData, classes, formFields, addBtnTitle, headerText, limitUploadFile, isUploading, progress, isCreating} = this.props

        const formDrawer = (
                <div className={ classes.formWindow}>
                    <form className={ classes.container} onSubmit={ this.onFormSubmit } autoComplete="off">
                        {
                            formFields.map(( form, index) => {
                                return  <div key={index} className={  classes.card }>
                                            <ApxExpanded heading={ form.label }>
                                                <ApxForm formField={form.fields} formHandler={ this.handleChange } locale={ locale } xs={12} md={6} objData={ newData }/>
                                            </ApxExpanded>
                                        </div>
                            })
                        }
                        <div className={  classes.card }>
                        { limitUploadFile > 0 ?
                            <ApxExpanded heading={locale.subheading.label_assets}>
                                    <ApxUpload  onChange={ (event) => { this.handleChange(event) } }
                                                docType="all"
                                                removeItem={this.handleRemoveItem}
                                                images={ newData.doc || [] }
                                                title={ locale.wording.upload }
                                                limitUploadFile={limitUploadFile}/>
                            </ApxExpanded>
                            : null
                        }
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={ isCreating }
                        className={ classes.btnSave }
                        >
                        { isCreating ? locale.wording.loading : locale.wording.save }
                    </Button>
                    </form>

                </div>
          );
        return (
            <div className={ classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button variant="contained" color="primary" disabled={ isCreating }  className={  classes.button } onClick={this.toggleDrawer('right', true)}>{ isCreating ? locale.wording.loading : addBtnTitle }</Button>
            </Hidden>
            <ApxRightDrawer toggleDrawer={ this.toggleDrawer }  side="right" open={ this.state.right} title={ headerText } requiredText={locale.message.error_400}>

                    {
                        isUploading ?
                        <div className={ classes.loading }>
                            <Spinner /><br />
                            <p>{progress} %</p>
                            <LinearProgress color="primary" variant="determinate" value={ progress  } />
                        </div>
                        : formDrawer
                    }
            </ApxRightDrawer>
            <Hidden only={['lg', 'xl', 'md']}>
                <ApxButtonCircle
                    handleAction={this.toggleDrawer}
                    open={true}
                    variant="contained"
                    color="primary"
                    side="right"
                />
            </Hidden>
            </div>
    )
  }
}


const AddItem = withStyles(styles)(Add)

export default connect(null, {setNotification})(AddItem);
