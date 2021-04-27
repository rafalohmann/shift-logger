import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Log, LogListResult, getLogList } from '../../../api/logAPI'
import { AppThunk } from 'app/store'

interface LogListState {
  currentPageList: Log[]
  page: number
  pageSize: number
  rowCount: number
  pageCount: number
  isLoading: boolean
  error: string | null
}

const LogListInitialState: LogListState = {
  currentPageList: [],
  page: 1,
  pageSize: 10,
  rowCount: 0,
  pageCount: 0,
  isLoading: false,
  error: null
}

function startLoading(state: LogListState) {
  state.isLoading = true
}

function loadingFailed(state: LogListState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const LogList = createSlice({
  name: 'LogList',
  initialState: LogListInitialState,
  reducers: {
    setPage: (state: LogListState, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setPageSize: (state: LogListState, action: PayloadAction<number>) => {
      state.pageSize = action.payload
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
    getLogListFailure: loadingFailed
  }
})

export const {
  setPage,
  setPageSize,
  getLogListStart,
  getLogListSuccess,
  getLogListFailure
} = LogList.actions

export default LogList.reducer

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
