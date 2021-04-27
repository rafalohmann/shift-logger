import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { cloneDeep } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { red } from '@material-ui/core/colors'
import moment from 'moment'

import { clear, createUpdateLog, deleteLog } from '../LogSlice'
import { Log } from 'api/logAPI'

const validationSchema = yup.object({
  event_date: yup.date().required(),
  area: yup
    .mixed()
    .oneOf(['control_room', 'factory_floor', 'expedition'])
    .required(),
  machine: yup.string().nullable(),
  operator: yup.string().required(),
  comment: yup.string().required()
})

const styles = makeStyles((theme: Theme) =>
  createStyles({
    formElements: {
      marginBottom: theme.spacing(2),
      marginTop: 0
    },
    saveButton: {
      position: 'absolute',
      right: theme.spacing(2),
      top: theme.spacing(1.5)
    }
  })
)

export const LogForm = () => {
  const classes = styles()
  const dispatch = useDispatch()

  const [confirmDelete, setConfirmDelete] = React.useState(false)
  const { log } = useSelector((state: RootState) => state.Log)

  const formValues = { ...cloneDeep(log) }

  let { id, status, event_date, area, machine, operator, comment } = formValues

  const handleClose = () => {
    dispatch(clear())
  }

  const handleDeleteClick = () => {
    setConfirmDelete(true)
  }

  const handleCancelDeleteClick = () => {
    setConfirmDelete(false)
  }

  const handleConfirmDeleteClick = () => {
    setConfirmDelete(false)
    if (id) {
      dispatch(deleteLog(id))
    }
  }

  const formattedEventDate = moment(event_date).format('YYYY-MM-DD[T]hh:mm')
  status = status ? true : false

  const formik = useFormik({
    initialValues: {
      id,
      status,
      event_date: formattedEventDate,
      area,
      machine,
      operator,
      comment
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(
        createUpdateLog({
          ...values,
          event_date: moment(values.event_date).toDate()
        } as Log)
      )
    }
  })

  const DeleteButton = withStyles((theme: Theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700]
      }
    }
  }))(Button)

  return (
    <Dialog aria-labelledby="form-dialog-title" open={true}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle id="form-dialog-title">
          <Typography>{id ? 'Edit Shift Log' : 'Add Shift Log'}</Typography>
          <Button
            size="small"
            color="primary"
            variant="contained"
            type="submit"
            className={classes.saveButton}
          >
            Save
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            id="event_date"
            name="event_date"
            label="Event Date"
            type="datetime-local"
            value={formik.values.event_date}
            onChange={formik.handleChange}
            error={
              formik.touched.event_date && Boolean(formik.errors.event_date)
            }
            helperText={formik.touched.event_date && formik.errors.event_date}
            InputLabelProps={{
              shrink: true
            }}
            className={classes.formElements}
          />
          <FormControl
            fullWidth
            className={classes.formElements}
            error={formik.touched.area && Boolean(formik.errors.area)}
          >
            <InputLabel htmlFor="area">Area</InputLabel>
            <Select
              native
              value={formik.values.area}
              onChange={formik.handleChange}
              error={formik.touched.area && Boolean(formik.errors.area)}
              inputProps={{
                name: 'area',
                id: 'area'
              }}
            >
              <option aria-label="None" value="" />
              <option value={'control_room'}>Control room</option>
              <option value={'factory_floor'}>Factory floor</option>
              <option value={'expedition'}>Expedition</option>
            </Select>
            <FormHelperText>
              {formik.touched.area && formik.errors.area}
            </FormHelperText>
          </FormControl>

          <TextField
            fullWidth
            id="machine"
            name="machine"
            label="Machine"
            value={formik.values.machine}
            onChange={formik.handleChange}
            error={formik.touched.machine && Boolean(formik.errors.machine)}
            helperText={formik.touched.machine && formik.errors.machine}
            className={classes.formElements}
          />

          <TextField
            fullWidth
            id="operator"
            name="operator"
            label="Operator"
            value={formik.values.operator}
            onChange={formik.handleChange}
            error={formik.touched.operator && Boolean(formik.errors.operator)}
            helperText={formik.touched.operator && formik.errors.operator}
            className={classes.formElements}
          />
          <TextField
            fullWidth
            id="comment"
            name="comment"
            label="Comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            error={formik.touched.comment && Boolean(formik.errors.comment)}
            helperText={formik.touched.comment && formik.errors.comment}
            className={classes.formElements}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.status}
                onChange={formik.handleChange}
                name="status"
                color="primary"
              />
            }
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="default"
            variant="contained"
            onClick={handleClose}
          >
            Close
          </Button>
          {id ? (
            <>
              <DeleteButton
                size="small"
                color="secondary"
                variant="contained"
                onClick={handleDeleteClick}
              >
                Delete
              </DeleteButton>
              <Dialog
                open={confirmDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Delete Shift Log
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete the Shift Log?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleCancelDeleteClick}
                  >
                    Cancel
                  </Button>
                  <DeleteButton
                    size="small"
                    onClick={handleConfirmDeleteClick}
                    color="primary"
                    autoFocus
                  >
                    Yes
                  </DeleteButton>
                </DialogActions>
              </Dialog>
            </>
          ) : null}
        </DialogActions>
      </form>
    </Dialog>
  )
}
