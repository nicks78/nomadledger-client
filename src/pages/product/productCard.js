//manager/src/pages/product/productCard.js
import React from 'react'
import {DEFAULT_IMG} from '../../redux/constant'
import {Link} from 'react-router-dom'
import { withStyles, CardHeader, Card, IconButton, CardMedia, Avatar, } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined'
import {cvtNumToUserPref} from '../../utils/help_function'

const styles = theme =>  ({
    container: {
    },
    link: {
        color: '#ef6c00',
        cursor: 'pointer'
    },
    media: {
        height: 140,
      },
    sidebar: {
        height: '100vh',
        boxShadow: '2px 0 10px -5px black',
        zIndex: 3
    },
    content: {
        backgroundColor: 'rgb(240, 240, 240)',
        zIndex: 1,
    }
})



const ProductCard = (props) => {

    const {product, classes}= props
    
    return (
        <Card>
        <CardHeader
            avatar={
                <Avatar aria-label={product.name} className={classes.avatar}>
                    { product.name.charAt(0) }
                </Avatar>
            }
            action={
                <IconButton component={Link} to={`product/view/${product._id}`}>
                    <VisibilityIcon />
                </IconButton>
            }
            title={product.name}
            subheader={ cvtNumToUserPref(product.buying_price) + ' ' + product.currency.value}
            />
            <CardMedia
                className={classes.media}
                image={`${ product.img[0] ? product.img[0].full_path : DEFAULT_IMG}`}
                title={product.img[0] ? product.img[0].org_name : "default"}
                />
        </Card>
    )

}

export default withStyles(styles)(ProductCard)