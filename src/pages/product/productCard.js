//manager/src/pages/product/productCard.js
import React from 'react'
import {DEFAULT_IMG} from '../../redux/constant'
import {Link} from 'react-router-dom'
import { withStyles, CardHeader, Card, IconButton, CardMedia, Avatar, CardContent, Typography, CardActions} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined'
import {cvtNumToUserPref} from '../../utils/help_function'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined'


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
      actions: {
    display: 'flex',
  },
    sidebar: {
        height: '100vh',
        boxShadow: '2px 0 10px -5px black',
        zIndex: 3
    },
    content: {
        backgroundColor: 'rgb(240, 240, 240)',
        zIndex: 1,
    },
    span: {
      float: 'right',
      color: theme.palette.darkGrey,
      fontWeight: 600
    }
})



const ProductCard = (props) => {

    const {product, classes, locale}= props

    return (
        <Card>
        <CardHeader
            avatar={
                <Avatar aria-label={product.name} className={classes.avatar}>
                    { product.sort.toUpperCase() }
                </Avatar>
            }
            action={
                <IconButton component={Link} color="primary" to={`product/view/${product._id}`}>
                    <VisibilityIcon />
                </IconButton>
            }
            title={product.name}
            subheader={ cvtNumToUserPref(product.selling_price) + ' ' + product.currency.value}
            />
            <CardMedia
                className={classes.media}
                image={`${ product.img[0] ? product.img[0].full_path : DEFAULT_IMG}`}
                title={product.img[0] ? product.img[0].org_name : "default"}
                />
          <CardContent>
            <Typography variant="caption">{locale.wording.buying_price}:
              <span className={classes.span }>{cvtNumToUserPref(product.buying_price || 0)} {product.currency.value}</span>
            </Typography>
            <Typography variant="caption">{locale.wording.stock}:
              <span className={classes.span }>{product.stock}</span>
            </Typography>
          </CardContent>

        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Delete product" onClick={ () => { props.onDeleteProduct(product._id) } } >
            <DeleteIcon style={{ color: "red", fontSize: 18 }} />
          </IconButton>
          <IconButton aria-label="Duplicate product" onClick={ () => { props.duplicateItem( product) } } >
            <FileCopyIcon style={{ color: "grey", fontSize: 18 }}  />
          </IconButton>
        </CardActions>
        </Card>
    )

}

export default withStyles(styles)(ProductCard)
