import React, { Component } from 'react';
import Routes from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css'


// #33B3A9 == green
// #1F2A3F == darck green

const theme = createMuiTheme({
  palette: {
    primary: {
      light: 'rgb(66, 133, 244)',
      main: 'rgb(51, 103, 214)',
      dark: '#1E3D7F',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff9d3f',
      main: '#ef6c00',
      dark: '#b53d00',
      contrastText: '#fff',
    },
    green:  '#4CAF50',
    grey: {
      light: 'rgba(251,251,251,1)',
      main: 'rgb(223,224,228)',
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
    htmlFontSize: 15,
    fontFamily: "'RaleWay', sans-serif"
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
