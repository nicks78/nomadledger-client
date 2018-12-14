//manager/src/pages/product/productCard.js
import React from 'react'
import {API_ENDPOINT} from '../../utils/constant'
import { withStyles, CardHeader, Card, IconButton, CardMedia, CardContent, Typography, CardActions, Avatar, } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined'
import {cvtNumToUserPref} from '../../utils/help_function'

const styles = theme =>  ({
    container: {
    },
    link: {
        color: '#ef6c00',
        cursor: 'pointer'
    },
    media: {
        // height: 0,
        // paddingTop: '46.25%', // 16:9
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
                <Avatar aria-label={product.product_name} className={classes.avatar}>
                    { product.product_name.charAt(0) }
                </Avatar>
            }
            action={
                <IconButton>
                <MoreVertIcon />
                </IconButton>
            }
            title={product.product_name}
            subheader={ cvtNumToUserPref(product.product_buying_price) + ' ' + product.product_currency.value}
            />
            <CardMedia
                className={classes.media}
                image={`${API_ENDPOINT}image/view${ product.product_img[0] ? product.product_img[0].path : '/default/default_logo.png' }`}
                title="Paella dish"
                />
        </Card>
    )

}

export default withStyles(styles)(ProductCard)