import ShiftLog from "../ShiftLog";

export default interface GetShiftLogsResponse {
    data: ShiftLog [];
    totalCount: number;
}