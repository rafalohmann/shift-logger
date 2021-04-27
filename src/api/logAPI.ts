import axios from 'axios'
import sleep from '../utils/sleep'

const TEST_FOR_LOADING: boolean = true

const url: string = `http://localhost:3001/log`

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
  if (TEST_FOR_LOADING) await sleep(2000)

  const { data } = await axios.get<LogListResult>(url, {
    params: {
      page,
      pageSize
    }
  })
  return data
}

export async function createLog(log: any) {
  if (TEST_FOR_LOADING) await sleep(2000)

  const { data } = await axios.post<Log>(`${url}`, log)
  return data
}

export async function updateLog(log: Log) {
  if (TEST_FOR_LOADING) await sleep(2000)

  const { data } = await axios.put<Log>(`${url}/${log.id}`, log)
  return data
}

export async function deleteLog(log: Log) {
  if (TEST_FOR_LOADING) await sleep(2000)

  await axios.delete(`${url}/${log.id}`)
}

export async function getLog(id: number): Promise<Log> {
  if (TEST_FOR_LOADING) await sleep(2000)

  const { data } = await axios.get<Log>(`${url}/${id}`)
  return data
}
