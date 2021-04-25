import ActionCreator from "../models/client/ActionCreator";
import commonActionCreator from "./common";
import shiftLogActionCreator from "./shiftLog";

const actions: ActionCreator = {
    ...commonActionCreator,
    ...shiftLogActionCreator
};

export default actions;