//src/components/common/tableToolBar.js
import React from 'react';
import {
withStyles,
Toolbar,
Typography,
IconButton } from '@material-ui/core';
import BtnMenu from '../../lib/btnMenu'
import BtnMenuDate from '../../lib/btnMenuDate'
import GetAppIcon from '@material-ui/icons/GetApp'
import Tooltips from './tooltips'
import RefreshIcon from '@material-ui/icons/RefreshOutlined'
import SearchBar from './searchBar'


const styles = theme => ({
    spacer: {
      flex: '1 1 10%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
    margin: {
      margin: theme.spacing.unit,
    }
})

const EnhancedToolBar = (props) => {

  const { classes, title, menus, locale, toExcel, hideDateFilter, tooltipTitle, refresh, searchBar, onSearchByName } = props;

  return (
    <div><Toolbar>
          {
            searchBar ?
              <SearchBar title={  title } onSearchByName={onSearchByName}/>
            :

            <Typography variant="h3">{title}</Typography>

          }


          <Tooltips title={locale.wording.hint_refresh}>
            <IconButton aria-label="Refresh" onClick={ refresh }>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltips>



        <div className={classes.spacer} />

          {
            !hideDateFilter ?
            <div className={classes.actions}>
                  <BtnMenuDate
                      menus={menus}
                      onChangeQuery={ props.onChangeQuery}
                      locale={locale}
                  />
            </div>
            : null
          }

        <div className={classes.actions}>
              {
                  menus ?
                  <React.Fragment>
                    <BtnMenu
                        menus={menus}
                        onChangeQuery={ props.onChangeQuery}
                        tooltipTitle={tooltipTitle}
                    />
                  </React.Fragment>

                : <React.Fragment><span></span></React.Fragment>
              }
          </div>

          {
            toExcel ? <div className={classes.actions}>
                        <Tooltips title={locale.wording.export_csv}><IconButton  onClick={ props.onDownload }><GetAppIcon /></IconButton></Tooltips>
                      </div>
            : null
          }
      </Toolbar>

      </div>
  )
}

const ApxTableToolBar = withStyles(styles)(EnhancedToolBar);

export default ApxTableToolBar ;
