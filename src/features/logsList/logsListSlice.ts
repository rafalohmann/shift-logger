import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Log, LogsResult, getLogs } from './logsAPI'
import { AppThunk } from 'app/store'

interface LogsState {
  currentPageLogs: Log[]
  page: number
  pageSize: number
  rowCount: number
  pageCount: number
  isLoading: boolean
  error: string | null
}

const LogsInitialState: LogsState = {
  currentPageLogs: [],
  page: 1,
  pageSize: 10,
  rowCount: 0,
  pageCount: 0,
  isLoading: false,
  error: null
}

function startLoading(state: LogsState) {
  state.isLoading = true
}

function loadingFailed(state: LogsState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const Logs = createSlice({
  name: 'Logs',
  initialState: LogsInitialState,
  reducers: {
    setPage: (state: LogsState, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setPageSize: (state: LogsState, action: PayloadAction<number>) => {
      state.pageSize = action.payload
    },
    getLogsStart: startLoading,
    getLogsSuccess(state, { payload }: PayloadAction<LogsResult>) {
      const { data, pagination } = payload

      state.currentPageLogs = data

      const { page, pageSize, rowCount, pageCount } = pagination

      state.page = page
      state.pageSize = pageSize
      state.rowCount = rowCount
      state.pageCount = pageCount

      state.isLoading = false
      state.error = null
    },
    getLogsFailure: loadingFailed
  }
})

export const {
  setPage,
  setPageSize,
  getLogsStart,
  getLogsSuccess,
  getLogsFailure
} = Logs.actions

export default Logs.reducer

export const fetchLogs = (
  page?: number,
  pageSize?: number
): AppThunk => async dispatch => {
  try {
    dispatch(getLogsStart())
    const Logs = await getLogs(page, pageSize)
    dispatch(getLogsSuccess(Logs))
  } catch (err) {
    dispatch(getLogsFailure(err.toString()))
  }
}
