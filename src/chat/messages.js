//src/chat/messages.js
import React from "react";
import { withStyles, Paper } from '@material-ui/core';

class Messages extends React.Component {

    state = {
      open: true,

    }

    openChat = () => {
      this.setState({open: !this.state.open})
    }


    render(){
      const {classes} = this.props
      const {open} = this.state
      return (
          <div className={classes.wrapper}>
          {
            open ?
            <Paper className={classes.chatBox}>
                <div className={classes.chatWrap}>
                  <div className={classes.chatHeader}>
                      NomadLegder - Chat support
                  </div>
                  <div className={classes.chatMessages}>
                      <p>floralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralflora lfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloralfloral</p>
                  </div>
                  <div className={classes.chatInput}>
                      c
                  </div>
                </div>
            </Paper>
            : null
          }

            <img onClick={ this.openChat } alt="icon-chat" src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/01-512.png" width="50" />
          </div>
      )
    }
}

const styles = theme => ({
  wrapper: {
    position: 'fixed',
    bottom: 20,
    left: 20,
    zIndex: 9,
    cursor: 'pointer'
  },
  chatWrap: {

  },
  chatBox: {
    height: 400,
    width: 300,
    maxWidth: "100%",
    backgroundColor: "white",
    marginBottom: 10,
    marginLeft: 20,
    overflow: 'hidden',
    borderRadius: 4
  },
  chatHeader: {
    height: 20,
    padding: 5,
    backgroundColor: "blue",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  chatMessages: {
    height: 300,
    width: 300,
    padding: 5,
    backgroundColor: "white",
    overflowY: "auto"
  },
  chatInput: {
    height: 50,
    padding: 5,
    backgroundColor: "grey",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  }
})

export default withStyles(styles)(Messages);
