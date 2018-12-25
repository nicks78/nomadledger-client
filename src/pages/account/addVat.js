//manager/src/lib/addVat.js

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {pushToDocument, getAccount} from './actions'
import { withStyles, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddOutlined'
import {ApxTag, Spinner} from '../../components/common'
import { checkNumFormatRegex } from '../../utils/help_function'




const styles = theme => ({
  root: {
      padding: 24
  },
  title: {
      marginBottom: 24
  },
  addVat: {
        position: 'relative'
  },
  textField: {
      width: '45%',
      marginRight: 5
  },
  addBtn: {
      position: 'absolute',
      bottom: 8,
      right: 0,
      cursor: 'pointer',

      '&:hover': {
          color: theme.palette.secondary.main
      }
  },
  tagWrapper: {
      marginTop: 24
  }
})



class AddVat extends Component {


  state = {
    value: '',
    name: '',
    indice: 0,
    reducer: "COMPANY",
    addApi: 'push-pull/update/push/',
    deleteApi: 'push-pull/update/pull/'
  }

    componentDidMount(){
        if(this.props.receivedAt === null ){
            this.props.getAccount(this.state.reducer)
        }
    }
  
    _handleFormEdit = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        

        this.setState({[name]: value })
    }

    _pushToDoc = () => {
        var num = checkNumFormatRegex( this.state.value )

        if(this.state.name === ''){
            alert("Must give a name !")
            return ;
        }
        
        if( num && this.state.name ){
            var data = {
                vat: { 
                    en: this.state.name, 
                    fr: this.state.name, 
                    value: this.state.value + " %",
                    indice: num 
                }
            }
            this.setState({value: "", name: '', indice: 0 })
            this.props.pushToDocument(this.state.reducer, data, this.state.addApi )
        }else{
            alert("Format de numero ou nom incorrect (ex: 18.06 | 18,06 )!")
        }
    }


    deleteCategory = (id) => {
        var data = {
            vat: {_id: id}
        }
        this.props.pushToDocument(this.state.reducer, data, this.state.deleteApi )
    }

    render() {
        const {locale, classes, company, isFetching } = this.props

        if( isFetching  || company === null ){
        return <Spinner />
        }


    return (
      <div>

                    <div className={ classes.addVat}>
                        <TextField 
                                id="vatname"
                                label={locale.form.field.name}
                                className={classes.textField}
                                value={this.state.name}
                                name="name"
                                onChange={this._handleFormEdit}
                                margin="normal"
                            />

                            <TextField 
                                id="vat"
                                type="text"
                                label={locale.form.field.add_vat}
                                className={classes.textField}
                                value={this.state.value}
                                name="value"
                                onChange={this._handleFormEdit}
                                margin="normal"
                            />
                        
                        <AddIcon className={ classes.addBtn} onClick={ this._pushToDoc }/>
                        
                       
                    </div>

                    <div className={ classes.tagWrapper}>

                    {
                        company.vat.map((vat, index) => {
                          return <ApxTag 
                                  key={index}
                                  variant="outlined"
                                  actionTag={ () => { this.deleteCategory(vat._id) } }
                                  label={ vat[localStorage.getItem('locale')] + ' ('+ vat.value +")"}
                                />
                        })
                    }
                        

                    </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
      isFetching: state.account.company.isFetching,
      receivedAt: state.account.company.receivedAt,
      isError: state.account.company.isError,
      company: state.account.company.item,
      message: state.account.company.message,
      locale: state.locale.locale,
  }
}



const StyledAddVat =  withStyles(styles)(AddVat);

export default connect(mapStateToProps, {getAccount, pushToDocument})(StyledAddVat);
