import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/CloseOutlined'
import { ApxExpanded, ApxPhoneCode, ApxUpload } from '../../components/common'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flex: 1,
        marginBottom: theme.margin.unit
    },
    formWindow: {
      minWidth: '100px',
      maxWidth: '500px',
      paddingBottom: theme.padding.unit,
      paddingRight: theme.padding.unit,
      paddingLeft: theme.padding.unit,
      height: '100%',
      clear: 'both'
    },
    drawer: {
        backgroundColor: theme.palette.grey.light,
        height: '100%'
    },
    button: {
        color: 'white',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: '10px',
        marginRight: '10px',
        width: '90%',
        marginTop: '0px',
        float: 'left',
    },
    icon: {
        color: 'red',
        float: 'right',
    },
    card: {
        marginTop: theme.margin.unit,
        width: '100%'
    }
})


class Add extends Component {

    state = {
        right: false,
        img: []
    };
    
    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
    };

    handleChange = name => event => {
        var fieldName = name;
        var value = event.target.value

        if(fieldName === 'img'){ // Check if form input file
            if(event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg' ){ // Check file format 
                var img = this.props.newClient.img ?  this.props.newClient.img : [];
                img.push(event.target.files[0])
                value = img
            }else{
                alert('FILE TYPE NOT AUTHORIZED !')
            }
        }
        this.props.createClientState( fieldName, value )
    }

    handleCreateClient = ()  => {
        this.props.createClient(this.props.newClient)
    }
    

    render() {

        const { locale, newClient, classes } = this.props

        const clientCompany = ['company', 'register', 'vat', 'address', 'city', 'country'];
        const clientContact =  ['firstname', 'lastname', 'phone_code', 'phone', 'email'];

        const formDrawer = (
            <div className={ classes.drawer }>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div><span ></span>
                    </div>
                    <div>
                        <IconButton className={  classes.icon } onClick={ this.toggleDrawer('right', false) }><CloseIcon /></IconButton>
                    </div>
                    
                </div>
                <div className={ classes.formWindow}>
                <form className={ classes.container} noValidate autoComplete="off">
                <div className={  classes.card }>
                <ApxExpanded heading={locale.form.title.label_company}>
                <Grid container className={classes.root} spacing={8}>
                    
                    {
                        clientCompany.map((cp, index) => {
                           
                            return  <Grid item xs={12} sm={6} key={index}>
                                    <TextField
                                        id={cp}
                                        label={locale.form.field[cp]}
                                        className={ classes.textField}
                                        value={newClient[cp] || ''}
                                        onChange={this.handleChange(cp)}
                                        margin="normal"
                                    /></Grid>
                        })
                    }
                </Grid>
                </ApxExpanded>
                    
                </div>
                <div className={  classes.card }>
                    <ApxExpanded heading={locale.form.title.label_client}>
                        <Grid container className={classes.root} spacing={8}>
                        {
                            clientContact.map((cp, index) => {
                                if(cp === 'phone_code'){
                                    return <Grid item xs={12} sm={6} key={index}><ApxPhoneCode value={ newClient.phone_code || '' } handleAction={ this.handleChange } locale={ locale }/></Grid>
                                }else
                                return  <Grid item xs={12} sm={6} key={index}>
                                        <TextField
                                            id={cp}
                                            label={locale.form.field[cp]}
                                            className={ classes.textField}
                                            value={newClient[cp] || ''}
                                            onChange={this.handleChange(cp)}
                                            margin="normal"
                                        /></Grid>
                            })
                        }
                        </Grid>
                    </ApxExpanded>
                    </div>
                    <div className={  classes.card }>
                    <ApxExpanded heading={locale.form.title.label_assets}>
                            <ApxUpload onChange={this.handleChange('img')} images={ newClient.img || [] } title={ locale.button.upload } authNumberFile={2}/>
                    </ApxExpanded>
                    </div>
                </form>
                <Button variant="contained" color="secondary"  style={{ float: 'right', marginTop: '24px', color: 'white' }} onClick={ this.handleCreateClient }>{ locale.button.save }</Button>
            </div>
            </div>
          );

        return (
            <div className={ classes.root}>
                <Button variant="contained" color="primary"  className={  classes.button } onClick={this.toggleDrawer('right', true)}>{ locale.button.add_client }</Button>
                <span>&nbsp;{ Object.keys(this.props.newClient).length > 0 ? "En cours..." : "" }</span>
                <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                    {formDrawer}
                </Drawer>
            </div>
    )
  }
}


const AddClient = withStyles(styles)(Add)

export default AddClient;