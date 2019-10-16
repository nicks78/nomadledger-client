//manager/src/lib/addCategory.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushToDocument, getAccount } from '../../redux/account/actions'
import { withStyles, TextField, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddOutlined'
import ApxTag from '../../components/common/tag'
import Spinner from '../../components/common/spinner'
import { setNotification } from '../../redux/notification/actions'



const styles = theme => ({
  addCategory: {
    position: 'relative',
    marginTop: 24
  },
  textField: {
    width: '90%',
    textTransform: 'capitalize'
  },
  addBtn: {
    position: 'absolute',
    bottom: 8,
    right: 0,
    cursor: 'pointer',
  },
  tagWrapper: {
    marginTop: 24
  }
})



class AddCategory extends Component {


  state = {
    value: '',
    reducer: "COMPANY",
    addApi: 'push-pull/update/push/',
    deleteApi: 'push-pull/update/pull/'
  }

  _handleFormEdit = (event) => {
    var value = event.target.value;
    this.setState({ value: value })
  }

  _pushToDoc = () => {

    if (!this.state.value) {
      this.props.setNotification("error_422_name", "error");
      return
    }
    var data = {
      category_name: {
        fr: this.state.value,
        en: this.state.value,
      }
    }

    this.setState({ value: '' })
    this.props.pushToDocument(this.state.reducer, data, this.state.addApi)
  }


  deleteCategory = (id) => {
    var data = {
      category_name: { _id: id }
    }

    this.props.pushToDocument(this.state.reducer, data, this.state.deleteApi)
  }

  render() {
    const { locale, classes, company, isFetching } = this.props

    if (isFetching || company === null) {
      return <Spinner />
    }


    return (
      <div>

        <div className={classes.addCategory}>
          <TextField
            id="category_name"
            label={locale.wording.category}
            className={classes.textField}
            value={this.state.value || ""}
            onKeyPress={(e) => { e.key === "Enter" && this._pushToDoc() }}
            name="category_name"
            onChange={this._handleFormEdit}
            margin="dense"

          />

          <Fab size="small" color="primary" onClick={this._pushToDoc} className={classes.addBtn}><AddIcon /></Fab>


        </div>

        <div className={classes.tagWrapper}>
          {
            company.category_name.map((category, index) => {
              return <ApxTag
                color="secondary"
                variant="outlined"
                edit={true}
                type="category_name"
                obj={category}
                canDelete={company.category_name.length === 1 ? false : true}
                key={index}
                actionTag={() => { this.deleteCategory(category._id) }}
                label={category[localStorage.getItem('locale')]}
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



const StyledAddCategory = withStyles(styles)(AddCategory);

export default connect(mapStateToProps, { getAccount, pushToDocument, setNotification })(StyledAddCategory);
