import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const emptyEvent = {
  title: '',
  description: '',
  image: '',
  eventDate: '',
  location: '',
  published: false,
};

function EventManager() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyEvent);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await api.getEvents(true);
      setEvents(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      image: event.image,
      eventDate: event.eventDate ? event.eventDate.slice(0, 16) : '',
      location: event.location,
      published: event.published,
    });
    setEditingId(event._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    await api.deleteEvent(id);
    loadEvents();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.updateEvent(editingId, form);
    } else {
      await api.createEvent(form);
    }
    setForm(emptyEvent);
    setEditingId(null);
    setShowForm(false);
    loadEvents();
  };

  const handleCancel = () => {
    setForm(emptyEvent);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Events</h1>
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm(emptyEvent);
          }}
        >
          + Add Event
        </button>
      </div>

      {showForm && (
        <div className="admin-card">
          <h3>{editingId ? 'Edit Event' : 'New Event'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div className="admin-form-group">
              <label>Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={4} />
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Event Date *</label>
                <input type="datetime-local" name="eventDate" value={form.eventDate} onChange={handleChange} required />
              </div>
              <div className="admin-form-group">
                <label>Location</label>
                <input name="location" value={form.location} onChange={handleChange} placeholder="Delhi, India" />
              </div>
            </div>
            <div className="admin-form-group">
              <label>Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
            </div>
            <label className="admin-checkbox">
              <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
              Publish on website
            </label>
            <div className="admin-actions">
              <button type="submit" className="admin-btn admin-btn-success">
                {editingId ? 'Update' : 'Create'}
              </button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events yet. Add your first event!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{new Date(event.eventDate).toLocaleString()}</td>
                  <td>{event.location || '-'}</td>
                  <td>
                    <span className={`admin-badge ${event.published ? 'admin-badge-published' : 'admin-badge-draft'}`}>
                      {event.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button type="button" className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleEdit(event)}>
                        Edit
                      </button>
                      <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(event._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EventManager;
