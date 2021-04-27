import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { cloneDeep } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import moment from 'moment'

import { clear, createUpdateLog } from '../LogSlice'
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
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  })
)

export const LogForm = () => {
  const classes = styles()
  const dispatch = useDispatch()

  const { log } = useSelector((state: RootState) => state.Log)

  const handleClose = () => {
    dispatch(clear())
  }

  const formValues = { ...cloneDeep(log) }

  let {
    id,
    status,
    event_date,
    area,
    machine,
    operator,
    comment
  } = formValues

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

  return (
    <Dialog aria-labelledby="form-dialog-title" open={true}>
      <DialogTitle id="form-dialog-title">
        <Typography>Subscribe</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
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
          <Button color="primary" variant="contained" fullWidth type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
