//src/pages/expense/mobileView.js
import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles, Typography, Avatar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

const height = window.innerHeight;

class MobileView extends React.Component {

  state = {
    skip: 10,
    num: 0
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

    if( toBottom >=  scrollHeight ) {
      if( !this.props.isFetching && this.props.items.length < this.props.total){
          this.loadMoreData()
      }
    }
  }

  loadMoreData = () => {
    this.props.getMoreData(this.props.reducer, `list?limit=10&skip=${this.state.skip}`);
    this.setState({skip: this.state.skip +10 })
  }

  renderCard = (item) => {
      return <Link to={`/${this.props.reducer.toLowerCase()}/${item.status.code === "1" ? "edit" : "view" }/${item._id.toLowerCase()}`}>
              <Card className={this.props.classes.card} >
                <Avatar style={{backgroundColor: item.status.color, fontWeight: 400 , fontSize: 15, height: 20, width: 20 }} >

                </Avatar>
              <div className={this.props.classes.details}>
                <CardContent className={this.props.classes.content}>
                  <Typography variant="body1" style={{textTransform: "capitalize"}}>
                    {item.contact_id.company_name}<br />
                    <span style={{ fontSize: 8 }}>{new Date(item.createAt.date).toLocaleString("fr")}</span>
                      <span style={{position: "absolute", right: 24, fontWeight: 700}}>
                          {item.subtotal} {item.currency.en}
                        </span>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ color: item.status.color }}>{item.status[localStorage.getItem('locale')]}</span>
                  </Typography>

                </CardContent>

              </div>
          </Card></Link>
  }


  render () {
    const { items, classes , locale} = this.props

    return (
      <div className={classes.root} id="mobileView">
      <Typography variant="h1" align="center" className={classes.title}>{locale[this.props.reducer.toLowerCase()].name}</Typography>
      {
         items.map((item, index) => {
            return <div key={index} id="main">{this.renderCard(item)}</div>
        })
      }
      {
         this.props.isFetching ?
             <div style={{textAlign: "center"}}><CircularProgress color="secondary" /></div>
         : null
      }
      <br /><br />
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
    marginBottom: 24
  },
  card: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    paddingLeft: 24,
    borderBottom: '1px solid rgba(230,230,230, 1)',
    borderRadius: 0,
    height: 80,
    boxShadow: 'none'
  }
})

export default withStyles(styles)(MobileView);
