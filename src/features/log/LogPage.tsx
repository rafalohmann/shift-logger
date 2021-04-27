import React from 'react'
import Paper from '@material-ui/core/Paper'
import { LogHeader } from './log-header/LogHeader'
import { LogList } from './log-list/LogList'

export const LogPage = () => {
  return (
    <>
      <LogHeader />
      <Paper>
        <LogList />
      </Paper>
    </>
  )
}
