import axios from 'axios'

export interface Log {
  id: number
  status: boolean
  event_date: Date
  area: 'control_room' | 'factory_floor' | 'expedition'
  machine?: string
  operator: string
  comment: string
}

export interface LogsResult {
  data: Log[]
  pagination: {
    page: number
    pageSize: number
    rowCount: number
    pageCount: number
  }
}

export async function getLogs(
  page = 1,
  pageSize = 10
): Promise<LogsResult> {
  const url = `http://localhost:3001/log`

  try {
    const { data } = await axios.get<LogsResult>(url, {
      params: {
        page,
        pageSize
      }
    })
    return data;
  } catch (err) {
    throw err
  }
}