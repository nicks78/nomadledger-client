//manager/src/pages/client/showContact.js

import React  from 'react'
import {connect} from 'react-redux'
import {API_ENDPOINT} from '../../../utils/constant'
import { Spinner, ApxAlert, ApxTable} from '../../../components/common'
import Paper from '@material-ui/core/Paper'
import { getItem, resetState, createState, uploadFileToServer } from '../../../redux/actions'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ContactInfo from './contactInfo'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import SwipeableViews from 'react-swipeable-views'
import CameraAltIcon from '@material-ui/icons/CameraAltOutlined'
import StatContact from './stat'
import Invoice from '../../invoice'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress';


const styles = {
  root: {
      padding: '24px'
  }
}

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ paddingLeft: 0 }}>
      {children}
    </Typography>
  );
}

class ShowContact extends React.Component {

    state = {
      value: 0,
      reducer: 'CONTACT',
      showEdit: false
    }

    componentDidMount(){
        var id = this.props.match.params.id;
        this.props.getItem(this.props.location.state.reducer, id)
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillUnmount(){
        this.props.resetState();
    }

    handleChange = (event, value) => {
      this.setState({ value });
    }

    handleFile (file) {
      if(file.type === 'image/png' || file.type === 'image/jpeg' ){ // Check file format 
          return file
      }else{
          alert('FILE TYPE NOT AUTHORIZED !')
      }
      return file
    }

    uploadFile = (event) => {
      var value = this.handleFile(event.target.files[0]);
      var fieldName = event.target.name;
      var model = this.state.reducer;
      var actionType = this.state.reducer;

      this.props.uploadFileToServer( actionType, model, value, this.props.match.params.id, fieldName, this.props.contact.logo )
    }

    render(){
      const { contact, isFetching, isError, locale, progress, isCreating } = this.props
 
      if(isFetching || contact === null){
        return <Spinner />
      }
      if(isError){
        return <ApxAlert message="Erreur message" reducer={ this.state.reducer }/>
      }
      return (
        <Paper style={ styles.root }>
        <Grid container spacing={8}>

            <Grid item xs={12} md={3}>
                <div style={{ minHeight: 150, width: 100, borderRadius: 100, margin: '0 auto' }}>
                    <img src={`${API_ENDPOINT}image/view${contact.logo || '/default/default_logo.png' }`} alt="logo" width="100%" />
                    
                    { isCreating ? <LinearProgress color="secondary" variant="determinate" value={ progress  } /> : null }
                    <div style={{ margin: 5, textAlign: 'center' }}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            onChange={ this.uploadFile }
                            name="logo"
                            type="file"
                          />
                      
                      <label htmlFor="contained-button-file">
                      <IconButton variant="contained" component="span" >
                        <CameraAltIcon />
                      </IconButton>
                      
                    </label>
                    
                    </div>
                </div>

              <Divider />
              
              <ContactInfo  locale={locale} contact={ contact } createState={this.props.createState} id={contact._id}/>
              
            </Grid>
            <Grid item xs={12} md={9}>
            <div>
            <div style={{height: 50, marginBottom: 24, marginLeft: 16 }}>
                <StatContact />
            </div>
            <div style={{ marginLeft: 16}}>
            <AppBar position="static" style={{backgroundColor: '#FF8119'}}>
              <Tabs value={this.state.value} 
                    onChange={this.handleChange}
                    fullWidth
                    >
                <Tab label={locale.invoice.name} />
                <Tab label={locale.quote.name} />
                <Tab label={locale.payback.name} />
              </Tabs>
            </AppBar>
              <SwipeableViews
                style={{backgroundColor: 'beige'}}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer><Invoice title={locale.invoice.name}/></TabContainer>
                <TabContainer><ApxTable title={locale.quote.name}/></TabContainer>
                <TabContainer><ApxTable title={locale.payback.name}/></TabContainer>
              </SwipeableViews>
              </div>
            </div>
            </Grid>
        </Grid>
              
              
        </Paper>
      )
    }
}

const mapStateToProps = (state) => {

  return {
      isFetching: state.library.contact.isFetching,
      isError: state.library.contact.isError,
      receivedAt: state.library.contact.receivedAt,
      locale: state.locale.locale,
      contact: state.library.contact.item,
      newContact: state.library.contact.tmp_state,
      progress: state.library.contact.progress,
      isCreating: state.library.contact.isCreating
  }
}

export default connect( mapStateToProps, { getItem, resetState, createState , uploadFileToServer})(ShowContact);