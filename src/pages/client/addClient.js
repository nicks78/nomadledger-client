import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const styles =  {
    root: {
        flex: 1,

    },
    formWindow: {
      minWidth: '400px',
      maxWidth: '100%',
      padding: '20px',
      height: '100%'
      
    },
    button: {
        color: 'white',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: '10px',
        marginRight: '10px',
    },
};

class AddClient extends Component {

    state = {
        right: false,
    };
    
    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }
    

    render() {
    
        const { locale } = this.props
        
        const formDrawer = (
            <div style={styles.formWindow}>
                <Typography variant="display2" gutterBottom>
                    {locale.form.title.add_client}
                </Typography>
                <form style={styles.container} noValidate autoComplete="off">
                    <TextField
                        id="standard-name"
                        label={locale.form.field.company}
                        style={styles.textField}
                        value={this.state.company || ''}
                        onChange={this.handleChange('company')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label={locale.form.field.firstname}
                        style={styles.textField}
                        value={this.state.firstname || ''}
                        onChange={this.handleChange('firstname')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label={locale.form.field.lastname}
                        style={styles.textField}
                        value={this.state.lastname || ''}
                        onChange={this.handleChange('lastname')}
                        margin="normal"
                    />
                </form>
                <Button variant="contained" color="secondary"  style={ styles.button } onClick={ this.handleCreateClient }>{ locale.button.add_client }</Button>
            </div>
          );

        return (
            <div style={styles.root}>
            
                <Button variant="contained" color="secondary"  style={ styles.button } onClick={this.toggleDrawer('right', true)}>{ locale.button.add_client }</Button>
                <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                    {formDrawer}
                </Drawer>
            </div>
    )
  }
}


export default AddClient;