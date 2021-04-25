import ShiftLog from "../ShiftLog";

export default interface ShiftLogState {
    loading: boolean;
    valid: boolean;
    data: ShiftLog[]; // current page, not all shift logs
    pageIndex: number;
    totalCount: number;
}