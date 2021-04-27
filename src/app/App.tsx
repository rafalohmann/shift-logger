import React from 'react'
import Footer from '../components/Footer'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { LogPage } from 'features/log/LogPage'

const styles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    marginBottom: theme.spacing(3)
  }
}))

const App: React.FC = () => {
  const classes = styles()
  return (
    <div>
      <CssBaseline />
      <AppBar position="absolute" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Shift Logger
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <LogPage />
        <Footer />
      </Container>
    </div>
  )
}

export default App
