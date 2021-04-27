import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

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

  const handleNew = () => {
    console.log('"handleNew" clicked')
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" color="inherit" noWrap className={classes.title}>
        Logs
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNew}
      >
        New log
      </Button>
    </Paper>
  )
}
