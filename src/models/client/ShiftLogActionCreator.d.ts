export default interface ShiftLogActionCreator {
  getShiftLogs(pageIndex: number, pageSize: number): any;
  addShiftLog(
    status: boolean,
    event_date: Date,
    area: ShiftLog.Area,
    operator: string,
    comment: string,
    machine?: string
  ): any;
  updateShiftLog(
    id: number,
    status: boolean,
    event_date: Date,
    area: ShiftLog.Area,
    operator: string,
    comment: string,
    machine?: string
  ): any;
  deleteShiftLog(id: number): any;
}
