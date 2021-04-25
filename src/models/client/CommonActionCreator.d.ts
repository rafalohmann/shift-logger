import { AnyAction as Action } from "redux";
export default interface CommonActionCreator {
    handleFetchError(type: string, error: Error): Action;
}