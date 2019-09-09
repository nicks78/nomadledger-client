import React, { Component } from 'react'
import { getItemList } from '../../redux/library/actions'
import { connect } from 'react-redux'
import ApxPaper from '../../components/common/paper';
import { TableCell, TableRow, Table, TableHead, TableBody, Typography, withStyles } from '@material-ui/core';
import ApxTableToolBar from '../../components/common/tableToolBar'
import Pagination from '../../lib/pagination'


class Marketing extends Component {

    state = {
        reducer: "ANNUAIRE",
        search_name: ""
    }

    componentDidMount() {
        this.props.getItemList("ANNUAIRE", `/list`)
    }

    handleSearchByName = (e) => {
        this.setState({ search_name: e.target.value.replace("&", "") })
        if (this.state.search_name.length > 2) {
            this.props.getItemList(this.state.reducer, `list?search=${this.state.search_name}&limit=10&skip=0`);
        } else if (e.target.value === "") {
            this.props.getItemList(this.state.reducer, `list?limit=10&skip=0`);
        }
    }

    render() {
        const { list, isFetching, locale, total, classes, access } = this.props
        const { reducer } = this.state
        const titleBar = access ? locale.subheading.placeholder_search_leads : locale.marketing.h1
        return (
            <div>
                <div className={classes.wrapTitle}>
                    <Typography variant="h2">{locale.marketing.h3} {total} {locale.wording.leads}</Typography>
                    <Typography className={classes.subtitle} variant="body2">{locale.message.privateAccess}</Typography>
                </div>

                <ApxPaper>

                    <ApxTableToolBar
                        numSelected={0}
                        menus={null}
                        hideDateFilter={true}
                        searchBar={access}
                        title={isFetching ? locale.wording.loading : titleBar}
                        selected={locale.wording.selected}
                        toExcel={false}
                        refresh={() => this.props.getItemList("ANNUAIRE", `/list`)}
                        locale={locale}
                        tooltipTitle={locale.wording.filter_category}
                        onSearchByName={this.handleSearchByName}
                    />

                    <div className="table-wrapper">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{locale.wording.name}</TableCell>
                                    <TableCell>{locale.wording.addresses_city}</TableCell>
                                    <TableCell>{locale.wording.addresses_zip_code}</TableCell>
                                    <TableCell>{locale.wording.phone}</TableCell>
                                    <TableCell>{locale.wording.email}</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {!isFetching ?
                                    list.map((contact, index) => {
                                        return <TableRow key={index}>
                                            <TableCell>{contact.name}</TableCell>
                                            <TableCell>{contact.city}</TableCell>
                                            <TableCell>{contact.zip_code}</TableCell>
                                            <TableCell>{contact.phone}</TableCell>
                                            <TableCell>{contact.email !== "Non renseigner" ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : locale.wording.not_provided}</TableCell>
                                        </TableRow>
                                    })
                                    : null
                                }
                            </TableBody>
                        </Table>
                    </div>
                    {
                        access ?
                            <Pagination
                                total={total || 0}
                                rowsPerPageOptions={this.props.rowsPerPageOptions || []}
                                label={locale.wording.label_rows_per_page}
                                value={`search=${this.state.search_name}`}
                                reducer={reducer}
                                label2={locale.wording.of}
                                onGetItemList={this.props.getItemList}
                            />
                            : null
                    }

                </ApxPaper>
            </div>
        )
    }
}


const styles = theme => ({
    wrapTitle: {
        marginBottom: 24
    },
    subtitle: {
        color: "red",
        fontWeight: 600
    }
})


const mapStateToProps = (state) => {

    return {
        isFetching: state.library.annuaire.isFetching,
        list: state.library.annuaire.list,
        locale: state.locale.locale,
        total: state.library.annuaire.total,
        access: state.library.annuaire.access,
    }
}

const StyledMarketing = withStyles(styles)(Marketing);

export default connect(mapStateToProps, { getItemList })(StyledMarketing);