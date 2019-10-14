//manager/src/pages/expense/addExpense.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStateCoworking } from './redux/actions'
import { TextField, withStyles, Typography, Grid, Divider } from '@material-ui/core'
import ApxPaper from '../../components/common/paper'
import ApxSelect from '../../components/common/select'
import UploadFile from '../../lib/file/upload'
import ApxTag from '../../components/common/tag'


const lang = localStorage.getItem('locale')

export class Create extends Component {

    getCountry = (e) => {
        console.log(e)
    }

    handleTags = (e, key = null) => {
        let array = this.props.coworking.tags || [];
        let value = e.target.value

        if (key === "Enter") {
            this.props.createStateCoworking("tag", "")
            array = ['#' + this.formatString(value), ...array];
            this.props.createStateCoworking("tags", array)
        } else {
            this.props.createStateCoworking("tag", value)
        }
    }

    formatString = (value) => {
        let newVal = value.replace(/#/g, "_");
        let splited = newVal.split(" ");
        for (let x = 1; x < splited.length; x++) {
            splited[x] = splited[x].charAt(0).toUpperCase() + splited[x].slice(1)
        }

        return splited.join("")
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

    render() {

        const { coworking, locale, country, classes } = this.props

        return (
            <ApxPaper styled={{ padding: window.innerWidth <= 500 ? 12 : 24 }}>
                <Typography variant="h1" align="center" className={classes.title}>{locale.coworking.create_h1}</Typography>
                <div >
                    <Typography variant="h2" align="left">{locale.coworking.create_h2_form}</Typography>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <Grid container spacing={8}>
                                <Grid item xs={12}>
                                    <TextField
                                        label={locale.wording.name}
                                        variant="outlined"
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
                                        name="name"
                                        margin="dense"
                                        fullWidth
                                        value={coworking.name || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={locale.wording.phoneNumber}
                                        variant="outlined"
                                        name="name"
                                        margin="dense"
                                        fullWidth
                                        value={coworking.name || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={locale.wording.url}
                                        variant="outlined"
                                        name="name"
                                        margin="dense"
                                        fullWidth
                                        value={coworking.name || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={locale.wording.fb_page}
                                        variant="outlined"
                                        name="name"
                                        margin="dense"
                                        fullWidth
                                        value={coworking.name || ""}
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
                                        name="name"
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
                                        name="name"
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
                                        name="name"
                                        margin="dense"
                                        value={coworking.city || ""}
                                        onChange={(e) => { this.props.createStateCoworking(e.target.name, e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ApxSelect
                                        arrayField={country}
                                        field="country"
                                        locale={locale}
                                        label={locale.wording.country}
                                        variant="outlined"
                                        name="country"
                                        value={coworking.country ? coworking.country[lang] : ""}
                                        handleAction={(e) => { this.getCountry() }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <Divider className={classes.divider} />

                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Typography variant="h2" align="left">{locale.coworking.create_h2_img}</Typography>

                        <UploadFile
                            getImages={(arrayImages) => { this.props.createStateCoworking("images", arrayImages) }}
                            docType="all"
                            images={coworking.images || []}
                            btnLabel={locale.wording.upload}
                            limitUploadFile={10} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h2" align="left">{locale.coworking.create_h2_tags}</Typography>
                        <TextField
                            fullWidth
                            label={locale.wording.tags}
                            variant="outlined"
                            name="tags"
                            margin="dense"
                            style={{ marginBottom: 12 }}
                            value={this.props.coworking.tag || ""}
                            onKeyPress={(e) => { if (e.key === "Enter") { this.handleTags(e, e.key) } else { return null } }}
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
                <Typography variant="h2" align="left">{locale.coworking.create_h2_cmt}</Typography>
            </ApxPaper >
        )
    }
}

const styles = theme => ({
    title: {
        marginBottom: 24
    },
    divider: {
        marginTop: 24,
        marginBottom: 24,
    }
})

const mapStateToProps = (state) => {
    return {
        locale: state.locale.locale,
        coworking: state.coworking.item || {},
        country: state.helper.items.country,
    }
}

const StyledCreate = withStyles(styles)(Create)

export default connect(mapStateToProps, { createStateCoworking })(StyledCreate)
