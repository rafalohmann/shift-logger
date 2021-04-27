import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import moment from 'moment'

import { setPage, setPageSize, fetchLogList } from './logListSlice'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.common.white
    }
  })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: grey[100]
      }
    }
  })
)(TableRow)

const styles = makeStyles(theme => ({
  table: {
    minWidth: 500
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

export const LogList = () => {
  const classes = styles()

  const dispatch = useDispatch()

  const {
    currentPageList,
    page,
    pageSize,
    rowCount,
    isLoading,
    error: LogError
  } = useSelector((state: RootState) => state.Log)

  useEffect(() => {
    dispatch(fetchLogList(page, pageSize))
  }, [page, pageSize, dispatch])

  if (LogError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{LogError.toString()}</div>
      </div>
    )
  }

  const emptyRows = pageSize - currentPageList.length
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

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {!isLoading && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell>Area</StyledTableCell>
                <StyledTableCell>Machine</StyledTableCell>
                <StyledTableCell>Operator</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageList.map(Log => (
                <StyledTableRow key={Log.id}>
                  <TableCell style={{ width: 250 }} align="center">
                    {moment(Log.event_date).format('MMMM Do YYYY, h:mm:ss a')}
                  </TableCell>
                  <TableCell>{Log.area}</TableCell>
                  <TableCell>{Log.machine}</TableCell>
                  <TableCell>{Log.operator}</TableCell>
                </StyledTableRow>
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
      )}
    </>
  )
}
