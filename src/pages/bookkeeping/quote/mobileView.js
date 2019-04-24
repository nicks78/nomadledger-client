//src/pages/expense/mobileView.js
import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles, Typography } from '@material-ui/core';
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

    if( toBottom ===  scrollHeight ) {
      if( !this.props.isFetching && this.props.quotes.length < this.props.total){
          this.loadMoreData()
      }
    }
  }

  loadMoreData = () => {
    this.props.getMoreData(this.props.reducer, `list?limit=10&skip=${this.state.skip}`);
    this.setState({skip: this.state.skip +10 })
  }

  renderCard = (quote) => {
      return <Link to={`/${this.props.reducer.toLowerCase()}/view/${quote._id.toLowerCase()}`}>
              <Card className={this.props.classes.card} >
              <div className={this.props.classes.details}>
                <CardContent className={this.props.classes.content}>
                  <Typography variant="body1">
                    {quote.contact_id.company_name} - <span>{new Date(quote.createAt.date).toLocaleString("fr")}</span>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ color: quote.status.color }}>{quote.status[localStorage.getItem('locale')]}</span>
                  </Typography>

                </CardContent>

              </div>
              <Typography variant="h3" style={{position: "absolute", right: 24, fontWeight: 700}} color="textSecondary">
                {quote.price} {quote.currency.en}
              </Typography>
          </Card></Link>
  }


  render () {
    const { quotes, classes , locale} = this.props

    return (
      <div className={classes.root} id="mobileView">
      <Typography variant="h1" align="center" className={classes.title}>{locale.quote.name}</Typography>
      {
         quotes.map((quote, index) => {
            return <div key={index} id="main">{this.renderCard(quote)}</div>
        })
      }
      {
         this.props.isFetching ?
             <div style={{textAlign: "center"}}><CircularProgress color="secondary" /></div>
         : null
      }
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
