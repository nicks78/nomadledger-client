import React, { Component } from 'react';
import Routes from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css'


// #33B3A9 == green
// #1F2A3F == darck green
// '#008489'
const theme = createMuiTheme({
  palette: {
    primary: {
      light:  '#00C5CC', //  rgb(66, 133, 244),
      main: '#008489', // 'rgb(51, 103, 214)',
      dark: '#267C7F',// '#1E3D7F',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6666', //'#ff9d3f',
      main:    '#ef4848', // '#ef6c00',
      dark: '#bf4040',// '#b53d00',
      contrastText: '#fff',
    },
    green:  '#4CAF50',
    grey: {
      light: 'rgba(251,251,251,1)',
      main: 'rgb(128, 128, 128)',
      dark: '#080808',
    },
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
      fontSize: '2rem',
      fontWeight: 700,
      colro: '#080808'
    },
    h2: {
      fontSize: '1.5rem',
      colro: '#080808',
      fontWeight: 400
    },
    h3: {
      fontSize: '1.2rem',
      colro: '#080808'
    },
    subtitle1: {
      fontSize: '0.9rem'
    },
    subtitle2: {
      fontWeight: 600,
      color: 'rgb(128, 128, 128)',
      fontSize: '0.9rem'
    },
    caption: {
      fontWeight: 500,
      color: 'rgba(128, 128, 128, 0.8)',
      fontSize: '0.8rem'
    },
    body1: {
      fontSize: '0.85rem',
      color: '#303030'
    },
    overline: {
      fontSize: '0.85rem',
      fontWeight: 600,
      color: 'rgb(128, 128, 128)',
      lineHeight: 1.6
    },
    fontWeightMedium: 700,
    
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
      <MuiThemeProvider theme={theme}>
          <Routes />
      </MuiThemeProvider> 
    )
  }
}

export default App;
