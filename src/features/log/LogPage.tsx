import React from 'react'
import Paper from '@material-ui/core/Paper'
import { LogHeader } from './log-header/LogHeader'
import { LogList } from './log-list/LogList'
import { LogForm } from './log-form/LogForm'
import { useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'

export const LogPage = () => {
  const { log } = useSelector((state: RootState) => state.Log)
  return (
    <>
      <LogHeader />
      <Paper>
        <LogList />
      </Paper>
      {log ? <LogForm /> : null}
    </>
  )
}
