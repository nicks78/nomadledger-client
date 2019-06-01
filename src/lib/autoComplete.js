//manager/src/lib/AutoComplete.js

import React from 'react';
import {connect} from 'react-redux'
import { getAutocompleteList, receiveItems } from '../redux/search/actions'
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles, TextField, Paper, MenuItem } from '@material-ui/core'


const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: -9
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
});

/**
 * @String  model
 * @String  field (database)
 * @String  state (redux)
 * @String  reducer (name)
 * @String  placeholder
 *
 */
class AutoComplete extends React.Component {

  state = {
    value: ""
  }

  renderInput = (inputProps) => {
    const { InputProps, classes, ...other } = inputProps;
    return (
        <TextField
            label={InputProps.placeholder}
            InputProps={{
              classes: {
                root: classes.inputRoot,
                input: classes.inputInput,
              },
              ...InputProps,
            }}
            {...other}
          />
      )
  }

  renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex }) => {
    const isHighlighted = highlightedIndex === index;
    const name = this.props.field === "company_name" ? "("+suggestion.firstname +" "+ suggestion.lastname +")" : ""
    return (
      <MenuItem
        {...itemProps}
        key={index}
        selected={isHighlighted}

        component="div"
        style={{
          fontWeight: 400,
        }}
      >
        {suggestion[this.props.field]} {name}
      </MenuItem>
    );
  }

  // Set selected value to the store
  downshiftOnChange = (selected) => {

      this.props.setSelectedObject(this.props.reducer, this.props.state, selected)
      this.setState({value: ""})
  }


  inputOnChange = (event) => {
    const inputValue = deburr(event.target.value.trim()).toLowerCase();

    this.setState({value: inputValue})

    if (!inputValue) { // Reset suggestions to empty
        this.props.receiveItems([]);
        return
    }

    var endpoint = "";

    if(this.props.model === "contact"){
      endpoint = `contact/search/query?value=${inputValue}`
    }else{
      endpoint = `common/search?query=${inputValue}&field=${this.props.field}`
    }
    this.props.getAutocompleteList(endpoint)
  }

  render(){
  const { classes, field, suggestions, placeholder } = this.props;
  const {value} = this.state

  return (
    <div className={classes.root}>
      <Downshift id={field}
        onChange={ this.downshiftOnChange }
        itemToString={item => (item ? item[field] : '')}>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          isOpen,
          selectedItem,
        }) => (
          <div className={classes.container}>
            {
              this.renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: placeholder,
                name: field,
                onChange: this.inputOnChange,
                autoComplete: "off",
                disabled: this.props.disabled,
                value: value
              }),
            })}
            <div {...getMenuProps()}>
              { isOpen ? (
                <Paper className={classes.paper}>
                  {
                    suggestions.map((suggestion, index) =>
                      this.renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion }),
                        highlightedIndex,
                        selectedItem,
                      })
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>

    </div>
  )
  }
}

const mapStateToProps = (state) => {

  return {
      isFetching: state.search.isFetching,
      suggestions: state.search.list
  }
}

const StyledAutoComplete = withStyles(styles)(AutoComplete)

export default connect(mapStateToProps, { getAutocompleteList, receiveItems })(StyledAutoComplete);
