import { combineReducers } from '@reduxjs/toolkit'

import LogsListReducer from 'features/logsList/logsListSlice'

const rootReducer = combineReducers({
  LogsList: LogsListReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
