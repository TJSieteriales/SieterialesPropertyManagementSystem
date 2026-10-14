function RecordTable({ records, onEdit, onDelete, busy, canManage }) {
  if (records.length === 0) {
    return <div className="empty-state">No records yet.</div>
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            {canManage && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td><strong>{record.name}</strong></td>
              <td>{record.description || 'â€”'}</td>
              <td>
                <span className={`status status-${record.status}`}>
                  {record.status}
                </span>
              </td>
              {canManage && (
                <td className="action-cell">
                  <button className="text-button" type="button" onClick={() => onEdit(record)}>
                    Edit
                  </button>
                  <button
                    className="text-button danger"
                    type="button"
                    disabled={busy}
                    onClick={() => onDelete(record)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecordTable
