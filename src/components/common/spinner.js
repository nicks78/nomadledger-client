import React  from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';


const Spinner = () => {
    return <div style={ styles.container}><CircularProgress size={50} color="secondary"/></div>
}


const styles = {
    container: {
        marginTop: '20%',
        textAlign: 'center'
    }
}

export default Spinner ;