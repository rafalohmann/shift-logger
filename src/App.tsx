import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ShiftLogs from "./pages/ShiftLogs";
import Footer from "./components/Footer";
import { ComponentProps as Props } from "./utils/ComponentProps";
import connectAllProps from "./utils/connect";

import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

interface States {}

class App extends React.Component<Props, States> {
  render(): React.ReactElement<any> {
    return (
      <Route
        render={(props) => (
          <div>
            <CssBaseline />
            <main>
              <Container maxWidth="lg">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => <Home {...props} />}
                  />
                  <Route
                    path="/shift-log"
                    render={(props) => <ShiftLogs {...props} />}
                  />
                </Switch>
                <Box pt={4}>
                  <Footer />
                </Box>
              </Container>
            </main>
          </div>
        )}
      />
    );
  }
}

export default connectAllProps(App);
