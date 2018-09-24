//manager/src/components/lib/addItem.js

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ApxExpanded, ApxUpload, ApxForm, ApxRightDrawer } from '../../components/common'

const styles = theme => ({
    root: {
        flex: 1,
        marginBottom: theme.margin.unit
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
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    card: {
        marginTop: theme.margin.unit,
        width: '100%'
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

    handleChange = name => event => {
        var fieldName = name;
        var value = event.target.value

        if(fieldName === 'doc'){ // Check if form input file
            value = this.handleFile(event.target.files[0]);
        }
        this.props.createItemState( fieldName, value )
    }

    handleFile (file) {
        if(file.type === 'image/png' || file.type === 'image/jpeg' ){ // Check file format 
            var imagesArray = this.props.newData.doc ?  this.props.newData.doc : [];
            file.blob = URL.createObjectURL(file) 
            imagesArray.push(file)
        }else{
            alert('FILE TYPE NOT AUTHORIZED !')
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
        this.props.createItemState( fieldName, newImages )
    }


    handleCreateItem = ()  => {
        this.props.createItem(this.props.newData)
    }
    

    render() {

        const { locale, newData, classes, formFields, addBtnTitle, headerText, limitUploadFile } = this.props

        const formDrawer = (
                <div className={ classes.formWindow}>
                    <form className={ classes.container} noValidate autoComplete="off">
                        {
                            formFields.map(( form, index) => {
                                return  <div key={index} className={  classes.card }>
                                            <ApxExpanded heading={ form.label }>
                                                <ApxForm formField={form.fields} formHandler={ this.handleChange } locale={ locale } xs={12} md={6} objData={newData}/>
                                            </ApxExpanded>        
                                        </div>
                            })
                        }
                    <div className={  classes.card }>
                        <ApxExpanded heading={locale.form.title.label_assets}>
                                <ApxUpload onChange={this.handleChange('doc')} docType="image/*" removeItem={this.handleRemoveItem} images={ newData.doc || [] } title={ locale.button.upload } limitUploadFile={limitUploadFile}/>
                        </ApxExpanded>
                    </div>
                    </form>
                    <Button variant="contained" color="secondary"  style={{ float: 'right', marginTop: '24px',marginBottom: '24px', color: 'white' }} onClick={ this.handleCreateItem }>{ locale.button.save }</Button>
                </div>
          );

        return (
            <div className={ classes.root}>
                <Button variant="contained" color="primary"  className={  classes.button } onClick={this.toggleDrawer('right', true)}>{ addBtnTitle }</Button>
                <span>&nbsp;{ Object.keys(this.props.newData).length > 0 ? "En cours..." : "" }</span>
                
                <ApxRightDrawer toggleDrawer={ this.toggleDrawer } side="right" open={ this.state.right} title={ headerText }>
                        {formDrawer}
                </ApxRightDrawer>
            </div>
    )
  }
}


const AddItem = withStyles(styles)(Add)

export default AddItem;