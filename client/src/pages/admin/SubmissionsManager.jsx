import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const FORM_LABELS = {
  contact: 'Contact / Inquiry',
  'book-call': 'Book a Call',
  'project-inquiry': 'Project Discussion',
};

function SubmissionsManager() {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const res = await api.getSubmissions();
      setSubmissions(res.data);
    } catch {
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const filtered =
    filter === 'all' ? submissions : submissions.filter((s) => s.formType === filter);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this submission?')) return;
    await api.deleteSubmission(id);
    setSelected(null);
    loadSubmissions();
  };

  const counts = {
    all: submissions.length,
    contact: submissions.filter((s) => s.formType === 'contact').length,
    'book-call': submissions.filter((s) => s.formType === 'book-call').length,
    'project-inquiry': submissions.filter((s) => s.formType === 'project-inquiry').length,
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Form Submissions</h1>
      </div>

      <div className="admin-card">
        <div className="submission-filters">
          {[
            { key: 'all', label: 'All Forms' },
            { key: 'contact', label: 'Contact' },
            { key: 'book-call', label: 'Book a Call' },
            { key: 'project-inquiry', label: 'Project Inquiry' },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              className={`filter-btn ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              <span className="filter-count">{f.key === 'all' ? submissions.length : counts[f.key]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-7">
          <div className="admin-card">
            {loading ? (
              <p>Loading submissions...</p>
            ) : submissions.length === 0 ? (
              <p>No submissions yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Form</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub) => (
                      <tr key={sub._id} className={selected?._id === sub._id ? 'selected-row' : ''}>
                        <td>
                          <span className="admin-badge admin-badge-published">
                            {FORM_LABELS[sub.formType] || sub.formType}
                          </span>
                        </td>
                        <td>{sub.name}</td>
                        <td>{sub.email}</td>
                        <td>{new Date(sub.createdAt).toLocaleString()}</td>
                        <td>
                          <button
                            type="button"
                            className="admin-btn admin-btn-primary admin-btn-sm"
                            onClick={() => setSelected(sub)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="admin-card submission-detail">
            {selected ? (
              <>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h3>Submission Details</h3>
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => handleDelete(selected._id)}
                  >
                    Delete
                  </button>
                </div>
                <p>
                  <strong>Form:</strong> {FORM_LABELS[selected.formType]}
                </p>
                <p>
                  <strong>Name:</strong> {selected.name}
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${selected.email}`}>{selected.email}</a>
                </p>
                <p>
                  <strong>Phone:</strong> {selected.phone || '—'}
                </p>
                {['book-call', 'project-inquiry'].includes(selected.formType) ? (
                  <>
                    <p>
                      <strong>Company:</strong> {selected.company || '—'}
                    </p>
                    <p>
                      <strong>Services of Interest:</strong>
                    </p>
                    <div className="submission-message">{selected.servicesInterest || '—'}</div>
                    <p>
                      <strong>Marketing Challenges/Goals:</strong>
                    </p>
                    <div className="submission-message">{selected.marketingGoals || '—'}</div>
                    <p>
                      <strong>Budget:</strong> {selected.budget || '—'}
                    </p>
                    <p>
                      <strong>Additional Comments:</strong>
                    </p>
                    <div className="submission-message">{selected.comments || '—'}</div>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Country:</strong> {selected.country}
                    </p>
                    <p>
                      <strong>Message:</strong>
                    </p>
                    <div className="submission-message">{selected.message || '—'}</div>
                  </>
                )}
                <p className="text-muted mt-3" style={{ fontSize: '0.85rem' }}>
                  Submitted: {new Date(selected.createdAt).toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-muted">Select a submission to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmissionsManager;
