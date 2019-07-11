//src/pages/auth/components/offer.js

import React  from 'react'
import {DEFAULT_URL} from '../../../redux/constant'
import {Typography, withStyles, Grid, Button, ListItem, List, ListItemText, ListItemIcon} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckOutlined'


const listItem = ["Create invoice", "Create Quotes", "Tasks", "Item", "Item", "Item", "Item", "Item"];


const Offer = (props) => {

    const {locale, classes, isMobile} = props

    return (
      <div className={classes.root}>
         <Grid container className={classes.intro} spacing={24}>
            <Grid item xs={12} sm={6} md={6}>
              <div className={classes.left}>
                  <Typography variant="h1" align="center" className={classes.priceText}>One price Only<br /><strong>3,95 €</strong><br />per Month</Typography>
                  <br />
                  <Button component="a" href="#formAnchor" className={classes.btn} variant="contained" color="primary" align="center">Create an account</Button>
              </div>
            </Grid>
          <Grid item xs={12} sm={6} md={6}>
              <div>
                <Typography variant="body2" align="left" style={{color: "white"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                      when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                      It was popularised in the 1960s with the release of Letraset sheets containing
                      Lorem Ipsum passages, and more recently with desktop publishing software 
                      like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>
              </div>
              
             <br />
            <Typography variant="body2" align="left" style={{color: "white"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
            <List margin="dense" style={{marginLeft: 30}}>
                {
                listItem.map((x, index) => {
                  return <ListItem className={classes.list} key={index}>
                      <ListItemIcon style={{marginRight: 0}}>
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

          </Grid>
      </div>
      
    )
}


const styles = theme => ({
    left: {
      backgroundImage: `url(${DEFAULT_URL}img/element/our-offer-img-1.png)`,
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
      fontSize: 40,
      fontWeight: 400,
      color: "white"
    },
    btn: {
      height: 50,
      width: 200,
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
