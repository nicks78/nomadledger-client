//manager/src/pages/expense/addExpense.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStateCoworking, createCoworking, resetCoworking } from './redux/actions'
import { TextField, withStyles, Typography, Grid, Divider, Button } from '@material-ui/core'
import ApxBackBtn from '../../components/common/backBtn'
import ApxPaper from '../../components/common/paper'
import ApxSelect from '../../components/common/select'
import UploadFile from '../../lib/file/upload'
import ApxTag from '../../components/common/tag'


const lang = localStorage.getItem('locale')

export class Create extends Component {


    componentWillMount() {
        this.props.resetCoworking()
    }

    handleTags = (e, key = null) => {
        let array = this.props.coworking.tags || [];
        let value = e.target.value

        if (value.indexOf(" ") >= 1) {
            this.props.createStateCoworking("tag", "")
            array = [...array, '#' + value];
            this.props.createStateCoworking("tags", array)
        } else {
            this.props.createStateCoworking("tag", value)
        }
    }

    deleteTag = (tag) => {
        let tags = this.props.coworking.tags || [];
        for (let i = 0; i < tags.length; i++) {
            if (tag === tags[i]) {
                tags.splice(i, 1);
                break;
            }
        }
        this.props.createStateCoworking("tags", tags)
    }

    onSubmitForm = (e) => {
        e.preventDefault()
        this.props.createCoworking()
    }

    render() {

        const { coworking, locale, country, classes, isFetching } = this.props

        return (
            <ApxPaper styled={{ padding: window.innerWidth <= 500 ? 12 : 24 }}>
                <ApxBackBtn />
                <Typography variant="h1" align="center" className={classes.title}>{locale.coworking.create_h1}</Typography>
                <Typography variant="caption" align="center">{locale.coworking.create_subtitle}</Typography>
                <form onSubmit={this.onSubmitForm} className={classes.form}>
                    <Typography variant="h6" align="left">{locale.coworking.create_h2_form}</Typography>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <Grid container spacing={8}>
                                <Grid item xs={12}>
                                    <TextField
                                        label={locale.wording.name}
                                        variant="outlined"
                                        required
                                        name="name"
                                        margin="dense"
                                        fullWidth
                                        value={coworking.name || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={locale.wording.email}
                                        variant="outlined"
                                        name="email"
                                        margin="dense"
                                        fullWidth
                                        value={coworking.email || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={locale.wording.phoneNumber}
                                        variant="outlined"
                                        name="phoneNumber"
                                        margin="dense"
                                        fullWidth
                                        value={coworking.phoneNumber || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={locale.wording.url}
                                        variant="outlined"
                                        name="url"
                                        margin="dense"
                                        fullWidth
                                        value={coworking.url || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={locale.wording.fb_page}
                                        variant="outlined"
                                        name="fb_page"
                                        margin="dense"
                                        fullWidth
                                        value={coworking.fb_page || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={8}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label={locale.wording.addresses_street}
                                        variant="outlined"
                                        name="address"
                                        required
                                        margin="dense"
                                        value={coworking.address || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label={locale.wording.addresses_zip}
                                        variant="outlined"
                                        name="zip_code"
                                        margin="dense"
                                        value={coworking.zip_code || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label={locale.wording.addresses_city}
                                        variant="outlined"
                                        required
                                        name="city"
                                        margin="dense"
                                        value={coworking.city || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ApxSelect
                                        arrayField={country}
                                        field="country"
                                        required={true}
                                        locale={locale}
                                        label={locale.wording.country}
                                        variant="outlined"
                                        name="country"
                                        value={coworking.country ? coworking.country[lang] : ""}
                                        handleAction={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows="3"
                                        label={locale.wording.description}
                                        variant="outlined"
                                        name="description"
                                        margin="dense"
                                        value={coworking.description || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />

                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <Typography variant="h6" align="left">{locale.coworking.create_h2_img}</Typography>

                            <UploadFile
                                getImages={(arrayImages) => { this.props.createStateCoworking("images", arrayImages) }}
                                docType="all"
                                images={coworking.images || []}
                                btnLabel={locale.wording.upload}
                                limitUploadFile={10} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" align="left">{locale.coworking.create_h2_tags}</Typography>
                            <Typography variant="caption" style={{ fontSize: "80%" }} align="left">{locale.coworking.create_caption_tags}</Typography>
                            <TextField
                                fullWidth
                                label={locale.wording.tags}
                                variant="outlined"
                                name="tags"
                                margin="dense"
                                style={{ marginBottom: 12 }}
                                value={this.props.coworking.tag || ""}
                                onChange={(e) => { this.handleTags(e) }}
                            />
                            {coworking.tags &&
                                coworking.tags.map((tag, index) => {
                                    return <ApxTag
                                        key={index}
                                        color="primary"
                                        variant="outlined"
                                        edit={false}
                                        type="category_name"
                                        obj={null}
                                        canDelete={true}
                                        actionTag={() => { this.deleteTag(tag) }}
                                        label={tag}
                                    />
                                })
                            }

                        </Grid>



                    </Grid>

                    <Divider className={classes.divider} />
                    <Typography variant="h6" align="left">{locale.coworking.create_h2_cmt}</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows="3"
                        label={locale.wording.type_comment}
                        variant="outlined"
                        name="comment"
                        margin="dense"
                        value={coworking.comment || ""}
                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                    />

                    <div className={classes.btnWrapper}>
                        <Button variant="contained" type="submit" to={`/coworking/add`} color="primary" disabled={isFetching} className={classes.button} >{isFetching ? locale.wording.loading : locale.wording.create}</Button>
                    </div>
                </form>
            </ApxPaper >
        )
    }
}

const styles = theme => ({
    title: {
        marginBottom: 5
    },
    form: {
        marginTop: 24
    },
    divider: {
        marginTop: 24,
        marginBottom: 24,
    },
    btnWrapper: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 24
    },
    button: {
        color: 'white',
        backgroundColor: theme.palette.yellow.dark,
        width: 120,
        marginBottom: 24
    }
})

const mapStateToProps = (state) => {
    return {
        locale: state.locale.locale,
        isFetching: state.coworking.isFetching,
        coworking: state.coworking.item || {},
        country: state.helper.items.country,
    }
}

const StyledCreate = withStyles(styles)(Create)

export default connect(mapStateToProps, { createStateCoworking, createCoworking, resetCoworking })(StyledCreate)
