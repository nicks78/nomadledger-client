//src/components/common/tableToolBar.js
import React from 'react';
import {
withStyles,
Toolbar,
Typography,
Tooltip,
IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import { lighten } from '@material-ui/core/styles/colorManipulator';
import BtnMenu from '../../lib/btnMenu'

const styles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
    linkToExcel: {
      margin: 0,
      fontSize: 9,
      cursor: "pointer",
      color: 'rgba(128, 128, 128, 0.8)',
      '& :hover i': {
        color: theme.palette.primary.main
      }
    }
})

const EnhancedToolBar = (props) => {

  const { numSelected, classes, selected, title, menus, locale, toExcel } = props;

  return (
    <div><Toolbar>
        <div className={classes.title}>
          { numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle2">
              {numSelected} {selected}
            </Typography>
          ) : (
            <Typography variant="subtitle1" id="tableTitle">
              { title }
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />

        <div className={classes.actions}>


          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">

              {
                  menus ?
                  <React.Fragment>
                    <BtnMenu
                        toExcel={toExcel}
                        onDownload={ props.onDownload}
                        menus={menus}
                        onChangeQuery={ props.onChangeQuery}
                        locale={locale}
                    />
                  </React.Fragment>

                : null
              }
            </Tooltip>
          )}

        </div>

      </Toolbar>

      </div>
  )
}

const ApxTableToolBar = withStyles(styles)(EnhancedToolBar);

export default ApxTableToolBar ;
