import React, { Fragment } from "react";
import connectAllProps from "../../utils/connect";
import "../../css/shiftLog.css";
import { ComponentProps as Props } from "../../utils/ComponentProps";

interface States {}

class ShiftLogList extends React.Component<Props, States> {
  render(): React.ReactElement<any> {
    return (
      <Fragment>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Fragment>
    );
  }
}

export default connectAllProps(ShiftLogList);
