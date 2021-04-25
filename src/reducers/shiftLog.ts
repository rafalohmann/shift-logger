import ShiftLogState from "../models/client/ShiftLogState";
import { AnyAction as Action } from "redux";
import {
  GET_SHIFT_LOGS_START,
  GET_SHIFT_LOGS_SUCCESS,
  GET_SHIFT_LOGS_FAILED,
  REMOVE_SHIFT_LOG_START,
  REMOVE_SHIFT_LOG_SUCCESS,
  REMOVE_SHIFT_LOG_FAILED,
  ADD_SHIFT_LOG_START,
  ADD_SHIFT_LOG_SUCCESS,
  ADD_SHIFT_LOG_FAILED,
} from "../actions/shiftLog";

const initialState: ShiftLogState = {
  loading: false,
  valid: false,
  data: [],
  pageIndex: 0,
  totalCount: 0,
};

const shiftLog = (
  state: ShiftLogState = initialState,
  action: Action
): ShiftLogState => {
  switch (action.type) {
    case GET_SHIFT_LOGS_START:
    case REMOVE_SHIFT_LOG_START:
    case ADD_SHIFT_LOG_START:
      return { ...state, loading: true };
    case GET_SHIFT_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        valid: true,
        data: action.shiftLogs,
        pageIndex: action.pageIndex,
        totalCount: action.totalCount,
      };
    case REMOVE_SHIFT_LOG_SUCCESS:
    case ADD_SHIFT_LOG_SUCCESS:
      return { ...state, valid: false, loading: false };
    case GET_SHIFT_LOGS_FAILED:
    case REMOVE_SHIFT_LOG_FAILED:
    case ADD_SHIFT_LOG_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default shiftLog;
