import ShiftLogActionCreator from "../models/client/ShiftLogActionCreator";
import GetShiftLogsResponse from "../models/response/GetShiftLogsResponse";
import { Dispatch } from "redux";
import fetch from "../utils/fetch";
import actions from "./common";
import { getToast as toast } from "../utils/toast";
import ShiftLog from "../models/ShiftLog";
import { ShiftLog as ShiftLogModule } from "../models/ShiftLog";

export const GET_SHIFT_LOGS_START: string = "GET_SHIFT_LOGS_START";
export const GET_SHIFT_LOGS_SUCCESS: string = "GET_SHIFT_LOGS_SUCCESS";
export const GET_SHIFT_LOGS_FAILED: string = "GET_SHIFT_LOGS_FAILED";
export const ADD_SHIFT_LOG_START: string = "ADD_SHIFT_LOG_START";
export const ADD_SHIFT_LOG_SUCCESS: string = "ADD_SHIFT_LOG_SUCCESS";
export const ADD_SHIFT_LOG_FAILED: string = "ADD_SHIFT_LOG_FAILED";
export const UPDATE_SHIFT_LOG_START: string = "UPDATE_SHIFT_LOG_START";
export const UPDATE_SHIFT_LOG_SUCCESS: string = "UPDATE_SHIFT_LOG_SUCCESS";
export const UPDATE_SHIFT_LOG_FAILED: string = "UPDATE_SHIFT_LOG_FAILED";
export const REMOVE_SHIFT_LOG_START: string = "REMOVE_SHIFT_LOG_START";
export const REMOVE_SHIFT_LOG_SUCCESS: string = "REMOVE_SHIFT_LOG_SUCCESS";
export const REMOVE_SHIFT_LOG_FAILED: string = "REMOVE_SHIFT_LOG_FAILED";
export const RATE_SHIFT_LOG_SUCCESS: string = "RATE_SHIFT_LOG_SUCCESS";
export const RATE_SHIFT_LOG_FAILED: string = "RATE_SHIFT_LOG_FAILED";

const shiftLogActionCreator: ShiftLogActionCreator = {
  getShiftLogs(pageIndex: number, pageSize: number): any {
    return (dispatch: Dispatch<any>): void => {
      dispatch({ type: GET_SHIFT_LOGS_START });
      fetch(
        `/shift-log?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        undefined,
        "GET"
      )
        .then((json: GetShiftLogsResponse) => {
          if (json && json.data && json.totalCount >= 0) {
            dispatch({
              type: GET_SHIFT_LOGS_SUCCESS,
              shiftLogs: json.data,
              pageIndex: pageIndex,
              totalCount: json.totalCount,
            });
          } else {
            return Promise.reject({
              name: "500 Internal Server Error",
              message: "",
            });
          }
        })
        .catch((error: Error) => {
          dispatch(actions.handleFetchError(GET_SHIFT_LOGS_FAILED, error));
        });
    };
  },
  addShiftLog(
    status: boolean,
    event_date: Date,
    area: ShiftLogModule.Area,
    operator: string,
    comment: string,
    machine?: string
  ): any {
    return (dispatch: Dispatch<any>): void => {
      dispatch({ type: ADD_SHIFT_LOG_START });
      fetch(
        `/shift-log`,
        { status, event_date, area, machine, operator, comment },
        "POST"
      )
        .then((json: ShiftLog) => {
          if (json) {
            toast().success("toast.shiftLog.add_successfully");
            dispatch({
              type: ADD_SHIFT_LOG_SUCCESS,
              shiftLog: json,
            });
          } else {
            return Promise.reject({
              name: "500 Internal Server Error",
              message: "Broken data.",
            });
          }
        })
        .catch((error: Error) => {
          toast().error("toast.shiftLog.add_failed");
          return dispatch(
            actions.handleFetchError(ADD_SHIFT_LOG_FAILED, error)
          );
        });
    };
  },
  updateShiftLog(
    id: number,
    status: boolean,
    event_date: Date,
    area: ShiftLogModule.Area,
    operator: string,
    comment: string,
    machine?: string
  ): any {
    return (dispatch: Dispatch<any>): void => {
      dispatch({ type: ADD_SHIFT_LOG_START });
      fetch(
        `/shift-log`,
        { id, status, event_date, area, machine, operator, comment },
        "POST"
      )
        .then((json: ShiftLog) => {
          if (json) {
            toast().success("toast.shiftLog.add_successfully");
            dispatch({
              type: ADD_SHIFT_LOG_SUCCESS,
              shiftLog: json,
            });
          } else {
            return Promise.reject({
              name: "500 Internal Server Error",
              message: "Broken data.",
            });
          }
        })
        .catch((error: Error) => {
          toast().error("toast.shiftLog.add_failed");
          return dispatch(
            actions.handleFetchError(ADD_SHIFT_LOG_FAILED, error)
          );
        });
    };
  },
  deleteShiftLog(id: number): any {
    return (dispatch: Dispatch<any>): void => {
      dispatch({ type: REMOVE_SHIFT_LOG_START });
      fetch(`/shift-log/${id}`, undefined, "DELETE")
        .then((json: any) => {
          toast().success("toast.shiftLog.delete_successfully");
          dispatch({
            type: REMOVE_SHIFT_LOG_SUCCESS,
            redirectTask: {
              redirected: false,
              to: "/shiftLog",
            },
          });
        })
        .catch((error: Error) => {
          toast().error("toast.shiftLog.delete_failed");
          return dispatch(
            actions.handleFetchError(REMOVE_SHIFT_LOG_FAILED, error)
          );
        });
    };
  },
};

export default shiftLogActionCreator;
