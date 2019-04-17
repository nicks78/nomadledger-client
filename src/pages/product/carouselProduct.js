//src/pages/marketing/productCarousel.js

import React, { Component } from 'react'
import {withStyles, IconButton} from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import CloseIcon from '@material-ui/icons/CloseOutlined'

class ProductCarousel extends Component {

    state = {
      imageIndex: 0,
    }

    prev = () => {
        if(this.state.imageIndex !== 0)
        this.setState({ imageIndex: this.state.imageIndex - 1 })
    }
    next = () => {
        var length = this.props.images.length -1;

        if(this.state.imageIndex !== length )
        this.setState({ imageIndex: this.state.imageIndex + 1 })
    }


  render() {

    const {classes, images, productId, reducer} = this.props
    const {imageIndex} = this.state;

    if(!images){
      return <div className={ classes.root } style={{height: window.innerHeight}}><p>No product found !</p></div>
    }

    if(images.length === 0 ){
          return <div className={ classes.root } style={{height: window.innerHeight}}><p>No images for this products !</p></div>
    }


    return (
      <div className={ classes.root } style={{height: "100%"}}>
          <ArrowLeftIcon style={{color: imageIndex === 0 && "grey" }} className={ classes.icon } onClick={ this.prev } />
            <div className={ classes.imageWrapper }>
              <IconButton
                onClick={() => { this.props.removeImageFromArray(reducer, `remove/${images[imageIndex].path}/${images[imageIndex]._id}/${productId}`) }}
                style={{position: 'absolute', top: 0, right: 20, color:'red'}}>
                <CloseIcon  />
              </IconButton>

              <a target="_blank" rel="noreferrer" href={images[imageIndex].full_path}>
              <img className={classes.img} src={images[imageIndex].full_path} alt={images[imageIndex].id}/>
              </a>
          </div>

          <ArrowRightIcon style={{color: imageIndex === (images.length -1 ) && "grey" }} className={ classes.icon } onClick={ this.next }/>
      </div>
    )
  }
}

const styles = theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center"
    },
    icon: {
      fontSize: 60,
      cursor: "pointer",
      color: theme.palette.secondary.main
    },
    imageWrapper: {
      width: '70%',
      textAlign: 'center'
    },
    img: {
      maxWidth: "100%",
      transition: 'all 1s ease',
      maxHeight: 300,
      [theme.breakpoints.down('sm')]: {
        maxHeight: 200
      }
    }
})

export default withStyles(styles)(ProductCarousel);
