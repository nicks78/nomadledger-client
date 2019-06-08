//src/pages/template/index.js
import React from 'react'
import {API_ENDPOINT} from '../../redux/constant'
import {connect} from 'react-redux'
import {Typography, withStyles, Paper, Grid} from '@material-ui/core'
import { getAllContract} from '../../redux/contract/actions'
import Spinner from '../../components/common/spinner'

class Template extends React.Component {


  componentDidMount(){
    this.props.getAllContract(`contract/list`, "listFile")
  }

  render () {
    const {locale, listFile, classes, isFetching} = this.props


    if(isFetching){
      return <Spinner />
    }

      return (
        <div>
            <Typography className={classes.h1} variant="h1" align="center">{locale.template.h1}</Typography>
            <Typography className={classes.body2} variant="body2" align="center" dangerouslySetInnerHTML={{__html: locale.template.subtitle}} />
            <Grid container spacing={24}>
            {
              listFile.map((contract, index) => {
                return  <Grid item xs={6} sm={3} md={3} key={index}>
                          <a href={`${API_ENDPOINT}contract/download/${contract._id}`} target="_blank">
                            <Paper className={classes.paper}>
                            <Typography variant="caption" align="center">{contract.name} - {contract.language.toUpperCase()}</Typography>
                            <br />
                            <div style={{textAlign: "center"}}>

                                <img src="https://cdn.worldvectorlogo.com/logos/microsoft-word-2013-logo.svg" width="100" alt="logo-word"/>

                            </div>

                          </Paper></a>
                        </Grid>
              })
            }
            </Grid>
            <div style={{position: "absolute", bottom: 10, paddingLeft: 24, paddingRight: 24}}>
                <Typography variant="caption" align="center" dangerouslySetInnerHTML={{__html: locale.template.rule }} />
            </div>

        </div>
      )

  }
}

const styles = theme => ({
    h1: {
      [theme.breakpoints.down('sm')]: {
          marginTop: 24,
      }
    },
    body2: {
      marginBottom: 24,
      width: "60%",
      margin: "0 auto",
      [theme.breakpoints.down('sm')]: {
          width: "95%",
      }
    },
    paper: {
      padding: 12,
    }
})

const mapStateToProps = (state) => {

  return {
      locale: state.locale.locale,
      isFetching: state.contract.isFetching,
      listFile: state.contract.listFile || [],
  }
}

const StyledTemplate = withStyles(styles)(Template)

export default connect(mapStateToProps, { getAllContract })(StyledTemplate);
