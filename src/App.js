import React, { Component } from 'react';
import {STRIPE_PUBLIC_KEY} from './redux/constant'
import Routes from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css'
import {StripeProvider} from 'react-stripe-elements';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import Cookie from './lib/cookie'

// fab746 jaune
// 0c3c5e bleu foncé
// edf6f7 bleu clair background
// 188a8d approuvé
// 62c1c5 en attente
// b7b7b7 brouillon
// cc1b1b rejeté

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: "#50b9bc",
      main: '#0c3c5e',
      // dark: `#005b5f`,
      contrastText: '#fff',
    },
    secondary: {
      // light: "#41668b",
      main: '#01898c',
      // dark: "#001634",
      contrastText: '#fff',
    },
    lightBlue: "#63c1c5",
    lightGreen: "#b0d9c8",
    thinDarkBlue: "#d4ebf9",
    thinBlue: "#edf7f8",
    yellow: {
      dark: "#fab746",
      light: "#ffd247"
    },

    green: "green",
    grey: {
      light: 'rgba(251,251,251,1)',
      main: 'rgb(128, 128, 128)',
      dark: '#484848',
    },
    caption: "rgba(0, 0, 0, 0.54)",
    lightGrey: '#F5F5F5',
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
      color: '#0c3c5e',
      // textTransform: "capitalize"
    },
    h2: {
      fontSize: '1.3rem',
      color: '#0c3c5e',
      fontWeight: 500,
      // textTransform: "capitalize"
    },
    h3: {
      fontSize: '1.1rem',
      fontWeight: 700,
      color: '#0c3c5e',
      // textTransform: "capitalize"
    },
    subtitle1: {
      fontWeight: 700,
      color: '#484848',
      fontSize: '1em',
    },
    subtitle2: {
      fontWeight: 500,
      color: '#484848',
      fontSize: '0.875em',
    },
    body1: {
      fontSize: '1em',
      fontWeight: 700,
      color: '#484848'
    },
    body2: {
      fontWeight: 400,
      fontStyle: "normal",
      color: '#484848',
      fontSize: '1em',
    },
    caption: {
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '1em',
    },
    overline: {
      fontSize: '1em', 
      fontWeight: 700,
      color: '#0c3c5e',
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

  constructor() {
    super();
    this.state = {
      stripe: null,
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
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe(STRIPE_PUBLIC_KEY)});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe(STRIPE_PUBLIC_KEY)});
      });
    }
  }

  render() {

    const cookie = localStorage.getItem("cookie")

    return (
          <React.Fragment>
          <StripeProvider stripe={this.state.stripe}>
            <MuiThemeProvider theme={theme}>
                <Routes /> 
            </MuiThemeProvider>
          </StripeProvider>
          {  cookie !== "1" ? <Cookie /> : null  }
          
        </React.Fragment>
    )
  }
}


export default App;