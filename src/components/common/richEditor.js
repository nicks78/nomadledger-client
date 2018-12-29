//manager/src/components/common/richEditor.js
import React from "react";
import { withStyles } from '@material-ui/core';
import SimpleMDEReact from "react-simplemde-editor/lib";
import "simplemde/dist/simplemde.min.css";


class RichEditor extends React.Component {
  
  state = {
    textValue: this.props.initText,
  }

  handleChange = value => {
    this.setState({
      textValue: value
    });
    // Set to redux state
    this.props.handleAction(this.props.reducer, "infos", value)
  }

  getInsance = () => {

  }

  render() {

    const { classes } = this.props

    return (
      <div className="container container-naow">
        <SimpleMDEReact
            className={classes.root}
            options={{ 
                toolbar: ["bold", "italic", "heading", "|", "unordered-list", "ordered-list", "table", "|", "quote", "link",  "|", "preview"],
                spellChecker: false,
	              status: false,
            }}
            label=""
            value={this.state.textValue}
            onChange={this.handleChange}
        />
      </div>
    );
  }
}

const styles = theme => ({
    root: {
      
    }
})

const ApxRichEditor =  withStyles(styles)(RichEditor)

export { ApxRichEditor };