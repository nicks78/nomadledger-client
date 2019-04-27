//src/pages/contact/mobileView.js
import React from 'react'
import { Link } from 'react-router-dom'
import {DEFAULT_IMG} from '../../redux/constant'
import { withStyles, Typography, Avatar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CallIcon from '@material-ui/icons/Call'

class MobileView extends React.Component {

  state = {
    skip: 10,
    num: 0
  }

  componentDidMount() {
    var el = document.getElementById('scrollable');
    el.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    var el = document.getElementById('scrollable');

    const offsetHeight = el.offsetHeight;
    const scrollHeight = el.scrollHeight;
    const scrollTop = el.scrollTop;
    const toBottom = offsetHeight + scrollTop

    if( toBottom  ===  scrollHeight ) {
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

      contacts.map(( contact, index) => {
        return <Link key={index} to={`/${this.props.reducer.toLowerCase()}/view/${contact._id}`}>
                <Card className={this.props.classes.card} >
                <Avatar
                    alt={contact.company_name}
                    src={`${ contact.logo_contact.full_path ||  DEFAULT_IMG }`}
                />
                <div className={this.props.classes.details}>
                  <CardContent className={this.props.classes.content}>
                    <Typography variant="body1" style={{textTransform: "capitalize"}}>
                      {contact.company_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {contact.firstname} {contact.lastname}
                    </Typography>

                  </CardContent>

                </div>

            </Card></Link>
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
    const { contacts, classes , locale} = this.props;
    const grouped =  this.groupBy(contacts)

    return (
      <div className={classes.root} id="mobileView">
      <Typography variant="h1" align="center" className={classes.title}>{locale.contact.name}</Typography>

      {
        grouped.map((group, index) => {
            return <div id="main" key={index}>
                    <span className={classes.span}>{group.sort}</span>
                      {
                        group.contact.map(( contact, index) => {
                        return <Card  key={index} className={this.props.classes.card} >
                                <Link to={`/${this.props.reducer.toLowerCase()}/view/${contact._id.toLowerCase()}`}><Avatar
                                    alt={contact.company_name}
                                    src={`${ contact.logo_contact.full_path ||  DEFAULT_IMG }`}
                                /></Link>
                                <div className={this.props.classes.details}>
                                  <CardContent className={this.props.classes.content}>
                                    <Typography variant="body1" style={{textTransform: "capitalize"}}>
                                      {contact.company_name}
                                    </Typography>
                                    <span style={{position: "absolute", right: 24, fontWeight: 700, marginTop: -15}}>
                                        <a href={`tel:${contact.phone_code.value}${contact.phone.replace("0", "")}`}><CallIcon style={{color: "green"}} /></a>
                                      </span>

                                      <Typography variant="body2" color="textSecondary">
                                        {contact.firstname} {contact.lastname}
                                      </Typography>

                                  </CardContent>

                                </div>

                            </Card>
                        })
                      }
                    </div>
        })
      }


      {
         this.props.isFetching ?
             <div style={{textAlign: "center"}}><CircularProgress color="secondary" /></div>
         : null
      }
      <br/><br/>
      </div>
  )
  }
}

const styles = theme => ({
  title: {
    marginTop: 12,
    marginBottom: 12
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
    fontWeight: 600
  }
})

export default withStyles(styles)(MobileView);
