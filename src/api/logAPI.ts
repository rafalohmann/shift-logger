import axios from 'axios'
import sleep from "../utils/sleep";

const TEST_FOR_LOADING: boolean = false

export interface Log {
  id: number
  status: boolean
  event_date: Date
  area: 'control_room' | 'factory_floor' | 'expedition'
  machine?: string
  operator: string
  comment: string
}

export interface LogListResult {
  data: Log[]
  pagination: {
    page: number
    pageSize: number
    rowCount: number
    pageCount: number
  }
}

export async function getLogList(
  page = 1,
  pageSize = 10
): Promise<LogListResult> {
  if (TEST_FOR_LOADING) {
    await sleep(2000)
  }

  const url = `http://localhost:3001/log`

  try {
    const { data } = await axios.get<LogListResult>(url, {
      params: {
        page,
        pageSize
      }
    })
    return data
  } catch (err) {
    throw err
  }
}
