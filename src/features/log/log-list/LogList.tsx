import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
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
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import moment from 'moment'

import { fetchLog, setPage, setPageSize, fetchLogList } from '../LogSlice'

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
    zIndex: theme.zIndex.modal + 1,
    color: '#fff'
  }
}))

const areas = {
  control_room: 'Control room',
  factory_floor: 'Factory floor',
  expedition: 'Expedition'
}

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

  const { isLoading: isLoadingForm } = useSelector(
    (state: RootState) => state.Log
  )

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

  const handleEditButtonClick = (id: number) => {
    dispatch(fetchLog(id))
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading || isLoadingForm}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table
          size="small"
          className={classes.table}
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Event Date</StyledTableCell>
              <StyledTableCell>Area</StyledTableCell>
              <StyledTableCell>Machine</StyledTableCell>
              <StyledTableCell>Comment</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageList.map(log => (
              <StyledTableRow key={log.id}>
                <TableCell style={{ width: 250 }} align="center">
                  {moment(log.event_date).format('MMMM Do YYYY, h:mm:ss a')}
                </TableCell>
                <TableCell>{areas[log.area]}</TableCell>
                <TableCell>{log.machine}</TableCell>
                <TableCell>{log.comment}</TableCell>
                <TableCell align="center">
                  {log.status ? 'Active' : 'Inactive'}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    aria-label="Edit"
                    onClick={() => handleEditButtonClick(log.id)}
                  >
                    <CreateIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 43 * emptyRows }}>
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
    </>
  )
}
