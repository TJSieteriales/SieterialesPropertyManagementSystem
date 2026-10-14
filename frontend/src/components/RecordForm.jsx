import { useEffect, useState } from 'react'

const emptyRecord = {
  name: '',
  description: '',
  status: 'active',
}

function RecordForm({ selectedRecord, onSave, onCancel, busy }) {
  const [form, setForm] = useState(emptyRecord)

  useEffect(() => {
    setForm(selectedRecord || emptyRecord)
  }, [selectedRecord])

  function changeField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function submit(event) {
    event.preventDefault()
    await onSave(form)
    if (!selectedRecord) {
      setForm(emptyRecord)
    }
  }

  return (
    <form className="card form-card" onSubmit={submit}>
      <div className="card-heading">
        <div>
          <p className="eyebrow">{selectedRecord ? 'Update' : 'Create'}</p>
          <h2>{selectedRecord ? 'Edit record' : 'New record'}</h2>
        </div>
      </div>

      <label>
        Name
        <input
          name="name"
          value={form.name}
          onChange={changeField}
          placeholder="Example record"
          maxLength="120"
          required
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description || ''}
          onChange={changeField}
          placeholder="Short description"
          maxLength="1000"
          rows="5"
        />
      </label>

      <label>
        Status
        <select name="status" value={form.status} onChange={changeField}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>

      <div className="form-actions">
        <button className="primary-button" type="submit" disabled={busy}>
          {busy ? 'Saving...' : selectedRecord ? 'Update' : 'Create'}
        </button>
        {selectedRecord && (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default RecordForm