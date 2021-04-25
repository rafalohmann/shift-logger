import AppState from "../models/client/AppState";
import { RouteComponentProps } from "react-router";
import ActionCreator from "../models/client/ActionCreator";
export interface ComponentProps extends RouteComponentProps<any> {
    state: AppState;
    actions: ActionCreator;
}
