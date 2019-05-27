//src/public_pages/chat.js
import React from 'react'
import {connect} from 'react-redux'
import {TextField, withStyles, Typography, Button, Paper } from '@material-ui/core'

const DUMMY_DATA = {
  _id: "oijwr09v89394funinvuir3v9",
  date: "",
  messageList: [
    {
      senderId: "perborgen",
      text: "who'll win?"
    },
    {
      senderId: "janedoe",
      text: "who'll win?"
    }
  ]
}

class ChatBox extends React.Component {

  constructor(){
    super();
    this.state = {
        messages: DUMMY_DATA,
        open: true,
    }
  }

  componentDidMount(){
    // Check for existing chat or create new one
  }

  render () {
    const {classes} = this.props
    const {open, messages} = this.state

    return(
        <div>
          <div>
            <img src="http://miamioh.edu/_files/images/it-services/icons/online-chat-button.png" width="50" onClick={() => {this.setState({open: !open })}} />
          </div>
          {
            open ?
            <div className={classes.chatbox}>
              <div className={classes.title}>
                  <Typography variant="body2" component="span" >Tilte</Typography>
              </div>
              <div className={classes.messageList}>

              </div>
              <div className={classes.sendMessageForm}>
                  <TextField placeholder="Type a message" fullWidth />&nbsp;&nbsp;&nbsp;
                  <Button variant="contained" size="small" color="primary">Send</Button>
              </div>
            </div>
            : null
          }

        </div>

      )
  }
}

const styles = theme => ({
    chatbox: {
      position: "fixed",
      borderRadius: 4,
      bottom: 20,
      left: 20,
      boxShadow: "1px 2px 2px rgb(238,238,238)",
      // eight: 350,
      width: 300
    },
    title: {
      backgroundColor: "rgb(35, 110, 255)",
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      display: "flex",
      alignItems: "center",
      padding: "6px 16px",
      '& span': {
        color: "white"
      }
    },
    messageList: {
      height: 300,
      backgroundColor: "white",
      borderBottom: "1px solid rgb(243,243,243)",
      overflow: 'auto'
    },
    sendMessageForm: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 6,
      backgroundColor: "white",
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    }
})

const mapStateToProps = (state) => {

  return {
      locale: state.locale.locale,
  }
}


const styledChatBox = withStyles(styles)(ChatBox);

export default connect(mapStateToProps)(styledChatBox);
