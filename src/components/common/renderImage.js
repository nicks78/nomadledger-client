//src/components/common/renderImage.js

import React from 'react'
import {DEFAULT_IMG} from '../../redux/constant'
import {randomString} from '../../utils/help_function'

const renderImage =(props) => {

    const { img } = props

    if(img && img.full_path){
      return <a href={ img.full_path } target="_blank"><img alt={ img.org_name } height="30" src={img.full_path } /></a>
    }else{
      return <img alt={randomString(5)} height="30" src={ DEFAULT_IMG } />
    }
}

export default renderImage;
