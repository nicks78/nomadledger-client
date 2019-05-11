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


const styles = theme => ({
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    }
})

const EnhancedToolBar = (props) => {

  const { classes, title, menus, locale, toExcel, hideDateFilter, tooltipTitle } = props;

  return (
    <div><Toolbar>
        <div className={classes.title}>
            <Typography variant="subtitle1" id="tableTitle">
              { title }
            </Typography>
        </div>

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
