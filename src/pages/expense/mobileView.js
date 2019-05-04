//src/pages/expense/mobileView.js
import React from 'react'
import { Link } from 'react-router-dom'
import {DEFAULT_IMG} from '../../redux/constant'
import { withStyles, Typography, Avatar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { cvtNumToUserPref } from '../../utils/help_function';

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

    if( toBottom  >=  scrollHeight ) {
      if( !this.props.isFetching && this.props.expenses.length < this.props.total){
          this.loadMoreData()
      }
    }
  }

  loadMoreData = () => {
    this.props.getMoreData(this.props.reducer, `list?limit=10&skip=${this.state.skip}`);
    this.setState({skip: this.state.skip +10 })
  }

  renderCard = (expense) => {
      return <Link to={`/${this.props.reducer.toLowerCase()}/view/${expense._id.toLowerCase()}`}>
              <Card className={this.props.classes.card} >
              <Avatar
                  alt={expense.name}
                  src={`${ expense.receipt.full_path ||  DEFAULT_IMG }`}
              />
              <div className={this.props.classes.details}>
                <CardContent className={this.props.classes.content}>
                  <Typography variant="body1" style={{textTransform: "capitalize"}}>
                    <span style={{ fontSize: 8 }}>{expense.receipt_date.label}</span><br />
                    {expense.name}
                  <span style={{position: "absolute", right: 24, fontWeight: 700}}>
                      { cvtNumToUserPref(expense.price)} {expense.currency.en}
                    </span>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {expense.description.slice(0, 30)}
                  </Typography>

                </CardContent>

              </div>

          </Card></Link>
  }


  render () {
    const { expenses, classes , locale} = this.props

    return (
      <div className={classes.root} id="mobileView">
      <Typography variant="h1" align="center" className={classes.title}>{locale.expense.name}</Typography>
      {
         expenses.map((expense, index) => {
            return <div key={index} id="main">{this.renderCard(expense)}</div>
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
    borderBottom: '1px solid rgb(238,238,238)',
    borderRadius: 0,
    height: 80,
    boxShadow: 'none'
  }
})

export default withStyles(styles)(MobileView);
