import React, { Component } from 'react';
import Routes from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css'
import {StripeProvider} from 'react-stripe-elements';
import ApxAlert from './components/common/alert'

// #33B3A9 == green
// #1F2A3F == darck green
// '#008489'
const theme = createMuiTheme({
  palette: {
    primary: {
      // light:  '#009AFF', 
      main: '#00aff2', // '#0077c5', 
      // dark:  '#265C7F', 
      contrastText: '#fff',
    },
    secondary: {
      // light: '#38CC24', // '#ff6666', //'#ff9d3f',
      main: 'rgba(239, 108, 0, 0.9)', //'#2ca01c',  
      // dark:  '#38CC24', 
      contrastText: '#fff',
    },
    green:  '#4CAF50',
    grey: {
      light: 'rgba(251,251,251,1)',
      main: 'rgb(128, 128, 128)',
      dark: 'rgb(51,51,51)',
    },
    lightGrey: 'rgb(238,238,238)',
    darkGrey: "rgb(44,47,50)", // 58.58.58
    lightSecondary: "rgba(239, 108, 0, 0.05)",
    blue: {
      light: 'rgb(66, 133, 244)',
      main: 'rgb(51, 103, 214)'
    },
    btnblue: 'rgb(66, 133, 244)',
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
    fontFamily: "'Open Sans', sans-serif",
    h1:{
      fontSize: '1.8rem',
      fontWeight: 700,
      color: 'rgb(51,51,51)',
      textTransform: "capitalize"
    },
    h2: {
      fontSize: '1.3rem',
      color: 'rgb(51,51,51)',
      fontWeight: 500,
      textTransform: "capitalize"
    },
    h3: {
      fontSize: '1.1rem',
      fontWeight: 400,
      color: 'rgb(51,51,51)',
      textTransform: "capitalize"
    },
    subtitle1: {
      fontWeight: 600,
      color: 'rgba(48,48,48,1)',
      fontSize: '0.9rem'
    },
    subtitle2: {
      fontWeight: 500,
      color: 'rgba(48,48,48,1)',
      fontSize: '0.9rem'
    },
    body1: {
      fontSize: '0.8rem',
      fontWeight: 600,
      color: 'rgba(48,48,48,0.8)'
    },
    body2: {
      fontWeight: 500,
      color: 'rgba(48,48,48,0.8)',
      fontSize: '0.8rem'
    },
    caption: {
      fontWeight: 500,
      color: 'rgba(128, 128, 128, 0.8)',
      fontSize: '0.8rem'
    },
    overline: {
      fontSize: '0.8rem',
      fontWeight: 700,
      color: 'rgba(48,48,48,1)',
      lineHeight: 1.6
    },
    fontWeightMedium: 700,
  },
  overrides: {
    tableHead: {
      fontSize: '4px'
    },
  }
});


/** TODO 
 * - Check local and send menu name accordingly
 * - Check if user is loggedIn
 * - If no loggedIn => Logout
 */

class App extends Component {
  render() {

    return (
      <React.Fragment>
        <ApxAlert message="beta_1" />
        <StripeProvider apiKey="pk_test_GblxUSlJYaYq5b3dU2GIoPql00wt6XzrAC">
          <MuiThemeProvider theme={theme}>
              <Routes />
          </MuiThemeProvider> 
        </StripeProvider>
      </React.Fragment>

    )
  }
}

export default App;
