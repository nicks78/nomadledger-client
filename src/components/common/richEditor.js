//manager/src/components/common/richEditor.js
import React from "react";
import { withStyles } from '@material-ui/core';
import "simplemde/dist/simplemde.min.css";
import RichTextEditor from 'react-rte';

const toolbarConfig = {
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'LINK_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
  ],
  BLOCK_TYPE_DROPDOWN: [
    {label: 'Normal', style: 'unstyled'},
    {label: 'Heading Large', style: 'header-two'},
    {label: 'Heading Medium', style: 'header-three'}
  ],
  BLOCK_TYPE_BUTTONS: [
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'}
  ]
};

class RichEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      value: RichTextEditor.createValueFromString(this.props.initText, "html")
    }  
  }

  onChange = (value) => {
    this.setState({value});
    this.props.handleAction(this.props.reducer, this.props.field, value.toString('html'))
    
  };

  render() {

    const { classes } = this.props;


    return (
      <div className="container container-naow">
      <RichTextEditor
        editorClassName={classes.editor}
        value={this.state.value}
        onChange={this.onChange}
        toolbarConfig={toolbarConfig}
      />

      </div>
    );
  }
}

const styles = theme => ({
  editor: {
    minHeight: 150
  }
})

const ApxRichEditor =  withStyles(styles)(RichEditor)

export default ApxRichEditor;