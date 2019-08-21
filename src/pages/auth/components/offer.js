//src/pages/auth/components/offer.js

import React from 'react'
import { DEFAULT_URL } from '../../../redux/constant'
import { Typography, withStyles, Grid, Button, ListItem, List, ListItemText, ListItemIcon } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckOutlined'



const Offer = (props) => {

  const { locale, classes, isMobile } = props

  return (
    <div className={classes.root}>
      <Grid container className={classes.intro} spacing={24}>
        <Grid item xs={12} sm={6} md={6}>
          <div className={classes.left}>
            <Typography variant="h1" align="center" className={classes.priceText} dangerouslySetInnerHTML={{ __html: locale.home_page.offer.price }} />
            <Typography component="span" align="center" className={classes.priceTextSub} dangerouslySetInnerHTML={{ __html: locale.home_page.offer.price_sub }} />
            <br />
            <Button style={{ width: isMobile ? "auto" : 200, height: isMobile ? "auto" : 50 }} component="a" href="#formAnchor" className={classes.btn} variant="contained" color="primary" align="center">{locale.home_page.offer.btn}</Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <div>
            <Typography variant="body2" align="left" style={{ color: "white" }} dangerouslySetInnerHTML={{ __html: locale.home_page.offer.paragraphe }} />
          </div>


          <Typography variant="body2" align="left" style={{ color: "white", marginTop: 24 }} dangerouslySetInnerHTML={{ __html: locale.home_page.offer.title_list }} />

          <Grid container spacing={24}>

            <Grid item xs={12} sm={8} md={8}>
              <List margin="dense" style={{ marginLeft: 30 }}>
                {
                  locale.home_page.offer.listItem.map((x, index) => {
                    return <ListItem className={classes.list} key={index}>
                      <ListItemIcon style={{ marginRight: 0 }}>
                        <CheckIcon className={classes.icon} />
                      </ListItemIcon>
                      <ListItemText
                        primary={x}
                        className={classes.listItem}
                      />
                    </ListItem>
                  })}
              </List>
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <a href="https://www.appvizer.fr/finance-comptabilite/facturation/nomadledger" rel="noopener noreferrer" target="_blank"><img src={`${DEFAULT_URL}img/badge-premium-2019-appvizer.png`} width="200" alt="app-vizer" /></a>
            </Grid>

          </Grid>


        </Grid>

      </Grid>
    </div>

  )
}


const styles = theme => ({
  left: {
    backgroundImage: `url(${DEFAULT_URL}img/element/our-offer-img.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    margin: "0 auto",
    height: 400,
    textAlign: "center",
    paddingTop: 80,
  },
  offer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  priceText: {
    fontSize: "2.7rem",
    fontWeight: 400,
    marginLeft: 50,
    color: "white",
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      marginTop: 24
    }
  },
  priceTextSub: {
    marginLeft: 30,
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "white"
  },
  btn: {
    height: 50,
    marginLeft: 50,
    width: 200,
    boxShadow: "none"
  },
  list: {
    paddingTop: 0,
    paddingBottom: 5
  },
  icon: {
    color: theme.palette.yellow.light
  },
  listItem: {
    "& span": {
      color: "white"
    }
  }
})

export default withStyles(styles)(Offer)
