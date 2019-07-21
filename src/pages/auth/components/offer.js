//src/pages/auth/components/offer.js

import React  from 'react'
import {DEFAULT_URL} from '../../../redux/constant'
import {Typography, withStyles, Grid, Button, ListItem, List, ListItemText, ListItemIcon} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckOutlined'



const Offer = (props) => {

    const {locale, classes, isMobile } = props

    return (
      <div className={classes.root}>
         <Grid container className={classes.intro} spacing={24}>
            <Grid item xs={12} sm={6} md={6}>
              <div className={classes.left}>
                  <Typography variant="h1" align="center" className={classes.priceText} dangerouslySetInnerHTML={{__html: locale.home_page.offer.price}} />
                  
                  <Button style={{ width: isMobile ? "auto" : 200, height: isMobile ? "auto" : 50 }} component="a" href="#formAnchor" className={classes.btn} variant="contained" color="primary" align="center">{locale.home_page.offer.btn}</Button>
              </div>
            </Grid>
          <Grid item xs={12} sm={6} md={6}>
              <div>
                <Typography variant="body2" align="left" style={{color: "white"}}>{locale.home_page.offer.paragraphe}
              </Typography>
              </div>
              
             
            <Typography variant="body2" align="left" style={{color: "white", marginTop: 24}}>{locale.home_page.offer.title_list}</Typography>
            <List margin="dense" style={{marginLeft: 30}}>
                {
                locale.home_page.offer.listItem.map((x, index) => {
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
      color: "white",
      marginBottom: 24,
      [theme.breakpoints.down("sm")]: {
        marginTop: 24
      }
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
