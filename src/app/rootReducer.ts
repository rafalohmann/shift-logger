import { combineReducers } from '@reduxjs/toolkit'

// import LogListReducer from 'features/log/log-list/logListSlice'
// import LogFormReducer from 'features/log/log-form/LogFormSlice'
import LogReducer from 'features/log/LogSlice'

const rootReducer = combineReducers({
  // LogList: LogListReducer,
  // LogForm: LogFormReducer
  Log: LogReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
