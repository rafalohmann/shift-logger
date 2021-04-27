import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { Log } from 'api/logAPI'
import { setLog } from '../LogSlice'

const styles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export const LogHeader = () => {
  const classes = styles()
  const dispatch = useDispatch()

  const handleAdd = () => {
    dispatch(setLog({ status: true } as Log))
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" color="inherit" noWrap className={classes.title}>
        Logs
      </Typography>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleAdd}
      >
        Add
      </Button>
    </Paper>
  )
}
