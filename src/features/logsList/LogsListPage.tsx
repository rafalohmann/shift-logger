import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { setPage, setPageSize, fetchLogs } from './logsListSlice'

const useStyles = makeStyles({
  table: {
    minWidth: 500
  }
})

export const LogsListPage = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const {
    currentPageLogs,
    page,
    pageSize,
    rowCount,
    isLoading,
    error: LogsError
  } = useSelector((state: RootState) => state.LogsList)

  useEffect(() => {
    dispatch(fetchLogs(page, pageSize))
  }, [page, pageSize, dispatch])

  if (LogsError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{LogsError.toString()}</div>
      </div>
    )
  }

  const emptyRows = pageSize - currentPageLogs.length
  const pageIndex = page - 1

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    pageIndex: number
  ) => {
    dispatch(setPage(pageIndex + 1))
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPageSize(parseInt(event.target.value, 10)))
    dispatch(setPage(1))
  }

  return isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {currentPageLogs.map(Log => (
            <TableRow key={Log.id}>
              <TableCell style={{ width: 250 }} align="center">
                {Log.event_date}
              </TableCell>
              <TableCell>{Log.area}</TableCell>
              <TableCell>{Log.machine}</TableCell>
              <TableCell>{Log.operator}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={rowCount}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
