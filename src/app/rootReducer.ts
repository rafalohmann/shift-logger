import { combineReducers } from '@reduxjs/toolkit'

import LogListReducer from 'features/log/log-list/logListSlice'

const rootReducer = combineReducers({
  Log: LogListReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
