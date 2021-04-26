import React from 'react'
import Footer from '../components/Footer'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { LogsListPage } from 'features/logsList/LogsListPage'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    marginBottom: theme.spacing(3)
  }
}))

const App: React.FC = () => {
  const classes = useStyles()
  return (
    <div>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Shift Logger
          </Typography>
        </Toolbar>
      </AppBar>
      <LogsListPage />
      <Footer />
    </div>
  )
}

export default App
