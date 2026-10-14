import { useEffect, useState } from 'react'
import AppHeader from '../components/AppHeader'
import RecordForm from '../components/RecordForm'
import RecordTable from '../components/RecordTable'
import {
  createRecord,
  deleteRecord,
  getRecords,
  updateRecord,
} from '../services/recordService'

function RecordsPage({ user, onLogout }) {
  const canManage = user.role === 'admin'
  const [records, setRecords] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecords()
  }, [])

  async function loadRecords() {
    setError('')
    try {
      setRecords(await getRecords())
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  async function saveRecord(form) {
    if (!canManage) return

    setBusy(true)
    setError('')
    setMessage('')

    try {
      if (selectedRecord) {
        await updateRecord(selectedRecord.id, form)
        setMessage('Record updated.')
      } else {
        await createRecord(form)
        setMessage('Record created.')
      }

      setSelectedRecord(null)
      await loadRecords()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  async function removeRecord(record) {
    if (!canManage || !window.confirm(`Delete "${record.name}"?`)) return

    setBusy(true)
    setError('')
    setMessage('')

    try {
      await deleteRecord(record.id)
      if (selectedRecord?.id === record.id) setSelectedRecord(null)
      setMessage('Record deleted.')
      await loadRecords()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="dashboard-shell">
      <AppHeader user={user} onLogout={onLogout} />

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      {!canManage && (
        <div className="alert success">
          User account: you can view records. Admin accounts can create, edit, and delete them.
        </div>
      )}

      <section className="dashboard-grid">
        {canManage && (
          <RecordForm
            selectedRecord={selectedRecord}
            onSave={saveRecord}
            onCancel={() => setSelectedRecord(null)}
            busy={busy}
          />
        )}

        <div className="card list-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">{canManage ? 'Read / Manage' : 'Read Only'}</p>
              <h2>Records</h2>
            </div>
            <span className="count-badge">{records.length}</span>
          </div>

          {loading ? (
            <div className="empty-state">Loading records...</div>
          ) : (
            <RecordTable
              records={records}
              onEdit={setSelectedRecord}
              onDelete={removeRecord}
              busy={busy}
              canManage={canManage}
            />
          )}
        </div>
      </section>
    </main>
  )
}

export default RecordsPage
