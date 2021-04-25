import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

interface Props {}
interface States {}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Rafael Lohmann
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default class Footer extends React.Component<Props, States> {
  render(): React.ReactElement<any> {
    return (
      <footer>
        <Copyright />
      </footer>
    );
  }
}
