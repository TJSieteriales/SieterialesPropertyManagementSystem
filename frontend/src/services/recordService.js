import { apiRequest } from './api'

export async function getRecords() {
  const data = await apiRequest('/records')
  return data.records
}

export async function createRecord(record) {
  const data = await apiRequest('/records', {
    method: 'POST',
    body: JSON.stringify(record),
  })
  return data.record
}

export async function updateRecord(id, record) {
  const data = await apiRequest(`/records/${id}`, {
    method: 'PUT',
    body: JSON.stringify(record),
  })
  return data.record
}

export async function deleteRecord(id) {
  return apiRequest(`/records/${id}`, {
    method: 'DELETE',
  })
}