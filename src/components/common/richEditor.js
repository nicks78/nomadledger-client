//manager/src/components/common/richEditor.js
import React from "react";
import SimpleMDEReact from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";


class RichEditor extends React.Component {
  state = {
    textValue: "I am the initial value. Erase me, or try the button above.",
  };

  handleChange = value => {
    this.setState({
      textValue: value
    });

    // Set to redux state
  };

  render() {

    return (
      <div className="container container-narrow">
        <SimpleMDEReact
            className={""}
            options={{ 
                toolbar: ["bold", "italic", "heading", "|", "unordered-list", "ordered-list", "table", "|", "quote", "link",  "|", "preview"],
                spellChecker: false,
	              status: false,
            }}
            label="Markdown Editor"
            value={this.state.textValue}
            onChange={this.handleChange}
        />
      </div>
    );
  }
}

export { RichEditor };