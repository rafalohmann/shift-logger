export default interface ShiftLog
{
    id: number;
    status: boolean;
    event_date: Date;
    area: ShiftLog.Area;
    machine?: string;
    operator: string;
    comment: string;
}

export namespace ShiftLog
{
    export enum Area
    {
        control_room,
        factory_floor,
        expedition
    }
}