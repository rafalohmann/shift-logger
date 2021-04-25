import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import ShiftLogList from "../components/shiftLog/ShiftLogList";
import connectAllProps from "../utils/connect";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { ComponentProps as Props } from "../utils/ComponentProps";

interface States {}

class ShiftLogs extends React.Component<Props, States> {
  componentDidMount() {
    this.props.actions.getShiftLogs(
      this.props.state.shiftLogState.pageIndex,
      DEFAULT_PAGE_SIZE
    );
  }
  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.state.shiftLogState.valid &&
      !this.props.state.shiftLogState.valid
    ) {
      this.props.actions.getShiftLogs(0, DEFAULT_PAGE_SIZE);
    }
  }
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <ShiftLogList {...this.props} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default connectAllProps(ShiftLogs);
