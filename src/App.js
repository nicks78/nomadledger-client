import React, { Component } from 'react';
import {STRIPE_PUBLIC_KEY} from './redux/constant'
import Routes from './routes'
// import { Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css'
import {StripeProvider} from 'react-stripe-elements';
// import Messages from "./chat/messages";
import MessengerCustomerChat from 'react-messenger-customer-chat';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#04405d',
      contrastText: '#fff',
    },
    secondary: {
      thinlight: "rgba(242, 103, 103, 0.1)",
      main: '#00888b', //'#ffb555'
      contrastText: '#fff',
    },
    green: "green",
    grey: {
      light: 'rgba(251,251,251,1)',
      main: 'rgb(128, 128, 128)',
      dark: 'rgb(48, 48, 48)',
    },
    caption: "rgba(0, 0, 0, 0.54)",
    lightGrey: '#F5F5F5',
    sideBar: "rgb(44,47,50)",
    error: {
      warning: 'yellow',
      light: '#FFEBEE',
      main: '#FFCDD2',
      dark: '#B71C1C',
      contrastText: '#B71C1C',
    },
  },
  margin: {
    unit: '2%'
  },
  padding: {
    unit: '2%'
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 17,
    fontFamily: "'Quicksand', sans-serif",
    fontWeight: 300,
    h1:{
      fontSize: '1.8rem',
      fontWeight: 500,
      color: 'rgb(48, 48, 48)',
      textTransform: "capitalize"
    },
    h2: {
      fontSize: '1.3rem',
      color: 'rgb(48, 48, 48)',
      fontWeight: 500,
      textTransform: "capitalize"
    },
    h3: {
      fontSize: '1.1rem',
      fontWeight: 700,
      color: 'rgb(48, 48, 48)',
      textTransform: "capitalize"
    },
    subtitle1: {
      fontWeight: 700,
      color: '#303030',
      fontSize: '0.9rem'
    },
    subtitle2: {
      fontWeight: 500,
      color: '#303030',
      fontSize: '0.9rem'
    },
    body1: {
      fontSize: '0.8rem',
      fontWeight: 700,
      color: '#303030'
    },
    body2: {
      fontWeight: 500,
      color: '#303030',
      fontSize: '0.8rem'
    },
    caption: {
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '0.8rem'
    },
    overline: {
      fontSize: '0.8rem',
      fontWeight: 700,
      color: '#303030',
      lineHeight: 1.6
    },
    fontWeightMedium: 500,
  },
  overrides: {
    tableHead: {
      fontSize: '4px'
    },
  }
});


function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}


/**
 * TODO
 *
 */
class App extends Component {

  state = {
  messages: [
    {
      text: "This is a test message!",
      member: {
        color: "blue",
        username: "bluemoon"
      }
    }
  ],
  member: {
    username: randomName(),
    color: randomColor()
  }
}
  render() {

    return (
      <React.Fragment>

        <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
          <MuiThemeProvider theme={theme}>
              <Routes />
                  <div>
                      <MessengerCustomerChat
                        pageId="2385240291708965"
                        appId="733037490462839"
                        htmlRef={window.location.pathname}
                      />
                    </div>

          </MuiThemeProvider>
        </StripeProvider>
      </React.Fragment>


    )
  }
}


export default App;
//
// <div>
//     <Typography variant="h1">Test TEST</Typography>
//     <Typography variant="h2">Test TEST</Typography>
//     <Typography variant="h3">Test TEST</Typography>
//     <Typography variant="subtitle1">Test TEST</Typography>
//     <Typography variant="subtitle2">Test TEST</Typography>
//     <Typography variant="body1">Test TEST</Typography>
//     <Typography variant="body2">Test TEST</Typography>
//     <Typography variant="caption">Test TEST</Typography>
//     <Typography variant="overline">Test TEST</Typography>
// </div>
