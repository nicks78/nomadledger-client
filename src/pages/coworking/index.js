import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles, GridList, GridListTile, GridListTileBar, Button, Hidden, IconButton, TextField, Grid, Typography } from '@material-ui/core'
import { getListCoworking } from './redux/actions'
import ApxButtonCircle from '../../components/common/buttonCircle'
import InfoIcon from '@material-ui/icons/Info';


const lang = localStorage.getItem("locale") || "fr"

class Coworking extends Component {

    state = {
        receivedAt: null,
        skip: 0,
        limit: window.innerWidth <= 550 ? "8" : "18",
        width: window.innerWidth
    }

    componentDidMount() {
        this.props.getListCoworking(`list?limit=${this.state.limit}&skip=0&locale=${lang}`, `list`);
        window.addEventListener('resize', this.getWindowWidth);
        var el = document.getElementById('scrollable');
        el.scrollTo(0, 0)
        el.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        var el = document.getElementById('scrollable');
        el.removeEventListener('scroll', this.handleScroll);
    }


    handleScroll = (event) => {
        var el = document.getElementById('scrollable');

        const offsetHeight = el.offsetHeight;
        const scrollHeight = el.scrollHeight;
        const scrollTop = el.scrollTop;
        const toBottom = offsetHeight + scrollTop

        if (this.props.listCoworking < this.props.total)
            if (toBottom >= scrollHeight) {
                this.loadMoreData()
            }
    }

    loadMoreData = () => {
        let isMobile = this.state.width <= 550 ? 8 : 9
        var l = this.state.limit + isMobile
        var s = this.state.skip + isMobile
        this.props.getListCoworking(`list?limit=${l}&skip=${s}&locale=${lang}`, "list");
        this.setState({ limit: l, skip: s })
    }

    getWindowWidth = (x) => {
        this.setState({ width: window.innerWidth })
    }

    searchQuery = (e) => {
        let value = e.target.value;
        let limit = this.state.width <= 550 ? 8 : 9
        this.props.getListCoworking(`list?locale=${lang}&skip=0&limit=${limit}&q=${value}`, "list")
        this.setState({ q: value })
    }

    render() {

        const { classes, locale, listCoworking, isCreating } = this.props
        const { width } = this.state
        const isMobile = width <= 550

        return (
            <div className={classes.root}>
                <Hidden only={['xs', 'sm']}>
                    <Button variant="contained" component={Link} to={`/coworking/add`} color="primary" disabled={isCreating} className={classes.button} >{isCreating ? locale.wording.loading : locale.wording.create}</Button>
                </Hidden>
                <Hidden only={['lg', 'xl', 'md']}>
                    <Typography align="center" className={classes.title} variant="h1">{locale.coworking.name}</Typography>
                </Hidden>
                <Grid container spacing={24} className={classes.search}>
                    <Grid item xs={12}>
                        <TextField
                            label={locale.helperText.search_coworking}
                            name="q"
                            style={{ marginTop: 0 }}
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            onChange={(e) => this.searchQuery(e)}
                        />
                    </Grid>
                </Grid>
                <div className={classes.root}>

                    <GridList cellHeight={160} className={classes.gridList} cols={isMobile ? 2 : 3}>
                        {
                            listCoworking.map((place, index) => {
                                return <GridListTile key={index}>
                                    <img src={place.images[0] && place.images[0].full_path} alt={place.name} />
                                    <GridListTileBar
                                        title={place.name.toUpperCase()}
                                        subtitle={<b>In: {place.city} | {place.country[lang]}</b>}
                                        className={classes.titleBar}
                                        actionIcon={
                                            <IconButton component={Link} to={`/coworking/view/${place._id}`} aria-label={`info about ${place.title}`} className={classes.icon}>
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            })
                        }

                    </GridList>
                    <Hidden only={['lg', 'xl', 'md']}>
                        <ApxButtonCircle
                            handleAction={() => console.log("ok")}
                            open={true}
                            variant="contained"
                            color="primary"
                            side="right"
                        />
                    </Hidden>
                </div >

            </div>

        )
    }
}

const mapStateToProps = (state) => {

    return {
        isFetching: state.coworking.isFetching,
        listCoworking: state.coworking.list,
        total: state.coworking.total_list,
        locale: state.locale.locale,
        progress: state.coworking.progress,
        coworking: state.coworking.item,
    }
}

const styles = theme => ({
    root: {

    },
    gridList: {
        // width: 500,
        // height: 450,
    },
    button: {
        color: 'white',
        backgroundColor: '#FAB745',
        marginRight: 10,
        width: 120,
        marginBottom: 24
    },
    icon: {
        color: "white"
    },
    search: {
        marginBottom: 5
    },
    titleBar: {
        background: 'rgba(0, 0, 0, 0.8)'
    },
    title: {
        marginTop: 24,
        marginBottom: 24
    },
})

const StyledCoworking = withStyles(styles)(Coworking)


export default connect(mapStateToProps, { getListCoworking })(StyledCoworking)


