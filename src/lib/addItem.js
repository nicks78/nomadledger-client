//manager/src/components/lib/addItem.js

import React, { Component } from 'react'
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
      clear: 'both'
    },
    drawer: {
        backgroundColor: theme.palette.grey.light,
        height: '100%'
    },
    button: {
        color: 'white',
        marginRight: 10
    },
    container: {
        display: 'flex',
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
        color: 'white' 
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
    };

    handleChange = (event) => {
        var fieldName = event.target.name;
        var value = event.target.value;

        if(fieldName === 'doc'){ // If input file
            
            value = this.handleFile(event.target.files[0]);
        }
        this.props.createItemState( this.props.reducer, fieldName, value )
    }

    handleFile (file) {
        if(file.type === 'image/png' || file.type === 'image/jpeg' ){ // Check file format 
            var imagesArray = this.props.newData.doc ?  this.props.newData.doc : [];
            file.blob = URL.createObjectURL(file) 
            imagesArray.push(file) 
        }else{
            alert(this.props.locale.message.error_file_not_allowed)
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

    _handleCreateItem = ()  => {
        this.props.createItem(this.props.reducer, this.props.newData)
    }

    render() {

        const { locale, newData, classes, formFields, addBtnTitle, headerText, limitUploadFile, isUploading, progress } = this.props
    
        const formDrawer = (
                <div className={ classes.formWindow}>
                    <form className={ classes.container} noValidate autoComplete="off">
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
                            <ApxExpanded heading={locale.form.title.label_assets}>
                                    <ApxUpload onChange={ (event) => { this.handleChange(event) } } docType="all" removeItem={this.handleRemoveItem} images={ newData.doc || [] } title={ locale.button.upload } limitUploadFile={limitUploadFile}/>
                            </ApxExpanded> 
                            : null 
                        }
                    </div>
                    </form>
                    <Button variant="contained" color="secondary" className={ classes.btnSave } onClick={ this._handleCreateItem }>{ locale.button.save }</Button>
                </div>
          );
        return (
            <div className={ classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button variant="contained" color="secondary"  className={  classes.button } onClick={this.toggleDrawer('right', true)}>{ addBtnTitle }</Button>
            </Hidden>
            <ApxRightDrawer toggleDrawer={ this.toggleDrawer } side="right" open={ this.state.right} title={ headerText }>
            
                    { 
                        isUploading ? 
                        <div className={ classes.loading }>
                            <Spinner /><br />
                            <p>{progress} %</p>
                            <LinearProgress color="secondary" variant="determinate" value={ progress  } />
                        </div> 
                        : formDrawer 
                    }
            </ApxRightDrawer>
            <Hidden only={['lg', 'xl', 'md']}>
                <ApxButtonCircle 
                    handleAction={this.toggleDrawer}
                    open={true}
                    variant="contained"
                    color="secondary"
                    side="right"
                />
            </Hidden>
            </div>
    )
  }
}


const AddItem = withStyles(styles)(Add)

export default AddItem;