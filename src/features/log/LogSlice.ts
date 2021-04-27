import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  Log,
  getLogList,
  LogListResult,
  getLog,
  createLog,
  updateLog,
  deleteLog as deleteLogApi
} from 'api/logAPI'
import { AppThunk } from 'app/store'

interface LogState {
  log: Log | null
  currentPageList: Log[]
  page: number
  pageSize: number
  rowCount: number
  pageCount: number
  isLoading: boolean
  error: string | null
}

const LogInitialState: LogState = {
  log: null,
  currentPageList: [],
  page: 1,
  pageSize: 10,
  rowCount: 0,
  pageCount: 0,
  isLoading: false,
  error: null
}

function startLoading(state: LogState) {
  state.isLoading = true
}

function loadingFailed(state: LogState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const LogReducer = createSlice({
  name: 'Log',
  initialState: LogInitialState,
  reducers: {
    setLog: (state: LogState, action: PayloadAction<Log>) => {
      state.log = action.payload
    },
    clear: (state: LogState) => {
      state.log = null
    },
    setPage: (state: LogState, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setPageSize: (state: LogState, action: PayloadAction<number>) => {
      state.pageSize = action.payload
    },
    isLoading: (state: LogState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    getLogListStart: startLoading,
    getLogListSuccess(state, { payload }: PayloadAction<LogListResult>) {
      const { data, pagination } = payload

      state.currentPageList = data

      const { page, pageSize, rowCount, pageCount } = pagination

      state.page = page
      state.pageSize = pageSize
      state.rowCount = rowCount
      state.pageCount = pageCount

      state.isLoading = false
      state.error = null
    },
    getLogListFailure: loadingFailed,
    getLogStart: startLoading,
    getLogSuccess(state, { payload }: PayloadAction<Log>) {
      state.log = payload
      state.isLoading = false
      state.error = null
    },
    getLogFailure: loadingFailed,
    createUpdateLogStart: startLoading,
    createLogSuccess(state) {
      state.log = null
      state.isLoading = false
      state.error = null
    },
    updateLogSuccess(state) {
      state.log = null
      state.isLoading = false
      state.error = null
    },
    createUpdateLogFailure: loadingFailed,
    deleteLogStart: startLoading,
    deleteLogSuccess(state) {
      state.log = null
      state.isLoading = false
      state.error = null
    },
    deleteLogFailure: loadingFailed
  }
})

export const {
  setLog,
  clear,
  setPage,
  setPageSize,
  getLogListStart,
  getLogListSuccess,
  getLogListFailure,
  isLoading,
  getLogStart,
  getLogSuccess,
  getLogFailure,
  createUpdateLogStart,
  createLogSuccess,
  updateLogSuccess,
  createUpdateLogFailure,
  deleteLogStart,
  deleteLogSuccess,
  deleteLogFailure
} = LogReducer.actions

export default LogReducer.reducer

export const fetchLogList = (
  page?: number,
  pageSize?: number
): AppThunk => async dispatch => {
  try {
    dispatch(getLogListStart())
    const LogList = await getLogList(page, pageSize)
    dispatch(getLogListSuccess(LogList))
  } catch (err) {
    dispatch(getLogListFailure(err.toString()))
  }
}

export const fetchLog = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getLogStart())
    const log = await getLog(id)
    dispatch(getLogSuccess(log))
  } catch (err) {
    dispatch(getLogFailure(err.toString()))
  }
}

export const createUpdateLog = ({
  id = 0,
  status,
  event_date,
  area,
  machine,
  operator,
  comment
}: Log): AppThunk => async (dispatch, getState) => {
  const { page, pageSize } = getState().Log
  try {
    dispatch(createUpdateLogStart())

    if (id > 0) {
      await updateLog({
        id,
        status,
        event_date,
        area,
        machine,
        operator,
        comment
      })
      dispatch(createLogSuccess())
      const LogList = await getLogList(page, pageSize)
      dispatch(getLogListSuccess(LogList))
    } else {
      await createLog({
        status,
        event_date,
        area,
        machine,
        operator,
        comment
      })
      dispatch(updateLogSuccess())
      const LogList = await getLogList(1, pageSize)
      dispatch(getLogListSuccess(LogList))
    }
  } catch (err) {
    dispatch(createUpdateLogFailure(err.toString()))
  }
}

export const deleteLog = (id: number): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(deleteLogStart())
    await deleteLogApi(id)
    dispatch(deleteLogSuccess())
    const { pageSize } = getState().Log
    const LogList = await getLogList(1, pageSize)
    dispatch(getLogListSuccess(LogList))
  } catch (err) {
    dispatch(deleteLogFailure(err.toString()))
  }
}
