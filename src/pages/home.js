import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getItemList } from '../redux/library/actions'
import {Grid} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {BarCharts} from '../components/common'

class Home extends Component {

    state = {
        showContact: false,
        reducer: 'STAT',
        keyLocation: ''
    }

    componentDidMount(){
        // this.props.getItemList(this.state.reducer)
    }


    render() {
        return (
        <div style={styles.container}>

            <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={1}>
                    <Typography component="h2" variant="h1" gutterBottom>
                        h1. Gros titre
                    </Typography>
                    <Typography variant="h2" gutterBottom>
                        h2. Sous Titre
                    </Typography>
                    
                    <Typography variant="subtitle1" gutterBottom>
                        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>
                    <Typography variant="button" gutterBottom>
                        button text
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                        caption text
                    </Typography>
                    <Typography variant="overline" gutterBottom>
                        Titre des banners
                    </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={1}>
                        <Typography variant="subtitle1">
                            This is a sheet of paper.
                        </Typography>
                        <Typography component="p">
                            Paper can be used to build surface or other elements for your application.
                        </Typography>
                    </Paper>

                    <BarCharts />
                </Grid>
            </Grid>


            
        </div>
    )
  }
}


const styles = {
    container: {
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
}


const mapStateToProps = (state) => {

    return {
        isFetching: state.library.stat.isFetching,
        item: state.library.stat.item
    }
}


export default connect(mapStateToProps, { getItemList })(Home);
