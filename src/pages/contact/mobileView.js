//src/pages/contact/mobileView.js
import React from 'react'
import { Link } from 'react-router-dom'
import {DEFAULT_IMG} from '../../redux/constant'
import { withStyles, Typography, Avatar, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CallIcon from '@material-ui/icons/Call'

const height = window.innerHeight;

class MobileView extends React.Component {

  constructor(props){
    super(props);
    this.state  = {
      skip: 10,
      num: 0
    }
  }

  componentDidMount() {
    var el = document.getElementById('scrollable');
    el.scrollTo(0, 0)
    el.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    var el = document.getElementById('scrollable');
    el.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    var el = document.getElementById('scrollable');

    const offsetHeight = el.offsetHeight;
    const scrollHeight = el.scrollHeight;
    const scrollTop = el.scrollTop;
    const toBottom = offsetHeight + scrollTop

    if( toBottom   >= scrollHeight ) {
      if( !this.props.isFetching && this.props.contacts.length < this.props.total){
          this.loadMoreData()
      }
    }
  }

  loadMoreData = () => {
    this.props.getMoreData(this.props.reducer, `list?limit=10&skip=${this.state.skip}`);
    this.setState({skip: this.state.skip +10 })
  }

  renderCard = (contacts) => {
      return contacts.map(( contact, index) => {
        return<Card  key={index} className={this.props.classes.card} >
                <Link to={`/${this.props.reducer.toLowerCase()}/view/${contact._id.toLowerCase()}`}>
                  {
                    contact.logo_contact.full_path ?
                      <Avatar
                          alt={contact.company_name}
                          src={`${ contact.logo_contact.full_path ||  DEFAULT_IMG }`}
                      />
                    :
                    <Avatar style={{backgroundColor: contact.color, fontWeight: 400 , fontSize: 15 }} >
                      {contact.sort}
                    </Avatar>
                  }
                  </Link>
                <div className={this.props.classes.details}>
                  <CardContent className={this.props.classes.content}>
                    <Typography variant="body1" style={{textTransform: "capitalize"}}>
                      {contact.company_name}
                    </Typography>
                    <span style={{position: "absolute", right: 24, fontWeight: 700, marginTop: -15}}>
                        {
                          contact.phoneNumber !== "" ?
                          <a href={`tel:${contact.phoneNumber}`}><CallIcon style={{color: "green"}} /></a>
                          : <CallIcon style={{color: "grey"}} />
                        }

                      </span>

                      <Typography variant="body2" color="textSecondary">
                        {contact.firstname} {contact.lastname}
                      </Typography>

                  </CardContent>

                </div>

            </Card>
      })
  }

  groupBy = (contacts) => {

    var grouped = contacts.reduce( (array, obj) => {
        array[obj.sort] = array[obj.sort] || { sort: obj.sort, contact: [] };
        array[obj.sort].contact.push(obj)
        return array;
    }, []);

    var newArray = [];

    for ( var index in grouped ) {
        var tmp = { sort: grouped[index].sort, contact: grouped[index].contact }
        newArray.push(tmp)
    }

    return newArray
  }


  render () {
    const { contacts, classes} = this.props;

    return (
      <div className={classes.root} id="mobileView">

        <br /><br /><br />
      {
        this.groupBy(contacts).map((group, index) => {
            return <div id="main" key={index}>
                      <Grid container>
                        <Grid item xs={1}>
                              <span className={classes.span}>{group.sort}</span>
                        </Grid>
                        <Grid item xs={11} style={{marginTop: -15, marginBottom: 30}}>
                          { this.renderCard(group.contact)  }
                        </Grid>

                      </Grid>
                    </div>
        })
      }

      {
         this.props.isFetching ?
             <div style={{textAlign: "center"}}><CircularProgress color="secondary" /></div>
         : null
      }
      <br/>
      </div>
  )
  }
}

const styles = theme => ({
  root: {
    minHeight: height + 10
  },
  title: {
    marginTop: 24,
    marginBottom: 48,
  },
  card: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    paddingLeft: 24,
    borderBottom: '1px solid rgb(238,238,238)',
    borderRadius: 0,
    boxShadow: "none",
    backgroundColor: "transparent",
    height: 60
  },
  span: {
    marginLeft: 10,
    color: theme.palette.secondary.main,
    fontWeight: 700,
  }
})

export default withStyles(styles)(MobileView);

// <Paper style={{margin: 10}}>
//   <TextField
//     placeholder="Search contacts"
//     fullWidth
//     variant="outlined"
//     onChange={onSearchByName}
//   />
// </Paper>
//
