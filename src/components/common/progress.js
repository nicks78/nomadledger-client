import React  from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';


const ApxProgress = (props) => {

    var count = Object.keys(props.objData).length
    
    return (
        <div>{ Object.keys(props.objData).length > 0 ? 
        <div>En cours...{count}<LinearProgress color="secondary" variant="determinate" value={count} /></div> : "" }</div>
    )
}


export { ApxProgress }