import CommonActionCreator from "../models/client/CommonActionCreator";
import { AnyAction as Action } from "redux";
import { getToast as toast } from "../utils/toast";

const actions: CommonActionCreator = {
    handleFetchError(type: string, error: Error): Action {
        if (error.message) {
            toast().error(error.message);
        } else if (error.name) {
            toast().error(error.name);
        }
        return { type };
    }
};

export default actions;