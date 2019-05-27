import React, { Component } from 'react';
import {STRIPE_PUBLIC_KEY} from './redux/constant'
import Routes from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css'
import {StripeProvider} from 'react-stripe-elements';
// import ChatBox from './public_pages/chat'


// #33B3A9 == green
// #1F2A3F == darck green
// '#008489'
const theme = createMuiTheme({
  palette: {
    primary: {
      // light:  '#009AFF',
      main: '#1A67A3',//'#5A6899',
      // dark:  '#265C7F',
      contrastText: '#fff',
    },
    secondary: {
      // light: '#38CC24', // '#ff6666', //'#ff9d3f',
      main: "#F26767", // rgba(239, 108, 0, 1)',
      // dark:  '#38CC24',
      contrastText: '#fff',
    },
    green: "green",
    grey: {
      light: 'rgba(251,251,251,1)',
      main: 'rgb(128, 128, 128)',
      dark: 'rgb(48, 48, 48)',
    },
    caption: "rgba(0, 0, 0, 0.54)",
    lightGrey: 'rgba(243,243,243)',
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
    fontFamily: "'Lato', sans-serif",
    fontWeight: 300,
    h1:{
      fontSize: '1.8rem',
      fontWeight: 300,
      color: 'rgb(48, 48, 48)',
      textTransform: "capitalize"
    },
    h2: {
      fontSize: '1.3rem',
      color: 'rgb(48, 48, 48)',
      fontWeight: 300,
      textTransform: "capitalize"
    },
    h3: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: 'rgb(48, 48, 48)',
      textTransform: "capitalize"
    },
    subtitle1: {
      fontWeight: 600,
      color: '#303030',
      fontSize: '0.9rem'
    },
    subtitle2: {
      fontWeight: 400,
      color: '#303030',
      fontSize: '0.9rem'
    },
    body1: {
      fontSize: '0.8rem',
      fontWeight: 600,
      color: '#303030'
    },
    body2: {
      fontWeight: 400,
      color: '#303030',
      fontSize: '0.8rem'
    },
    caption: {
      fontWeight: 400,
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '0.8rem'
    },
    overline: {
      fontSize: '0.8rem',
      fontWeight: 600,
      color: '#303030',
      lineHeight: 1.6
    },
    fontWeightMedium: 400,
  },
  overrides: {
    tableHead: {
      fontSize: '4px'
    },
  }
});


/** TODO
 *
 *
 */
class App extends Component {
  render() {

    return (
      <React.Fragment>
        <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
          <MuiThemeProvider theme={theme}>
              <Routes />
          </MuiThemeProvider>
        </StripeProvider>
      </React.Fragment>

    )
  }
}

export default App;
