//src/pages/contact/mobileView.js
import React from 'react'
import { Link } from 'react-router-dom'
import {DEFAULT_IMG} from '../../redux/constant'
import { withStyles, Typography, Avatar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';


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

  renderCard = (contact) => {
      return <Link to={`/${this.props.reducer.toLowerCase()}/view/${contact._id.toLowerCase()}`}>
              <Card className={this.props.classes.card} >
              <Avatar
                  alt={contact.name}
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
  }


  render () {
    const { contacts, classes , locale} = this.props

    return (
      <div className={classes.root} id="mobileView">
      <Typography variant="h1" align="center" className={classes.title}>{locale.contact.name}</Typography>
      {
         contacts.map((contact, index) => {
            return <div key={index} id="main">{this.renderCard(contact)}</div>
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
    height: 80
  }
})

export default withStyles(styles)(MobileView);
