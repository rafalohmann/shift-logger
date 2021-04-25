import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { initToast } from "./utils/toast";
import { setHostUrl } from "./utils/fetch";
import ToastWrapper from "./components/ToastWrapper";
import { HOST_URL_PROD, HOST_URL_DEV } from "./models/HostUrl";

// Set host url for HTTP requests
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  setHostUrl(HOST_URL_DEV);
} else {
  setHostUrl(HOST_URL_PROD);
}

// Initialize toast provider
initToast(new ToastWrapper(store));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
