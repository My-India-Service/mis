import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { getDisplayImage, isUploadedImage } from '../../utils/imageUrl';

const emptyEvent = {
  title: '',
  description: '',
  image: '',
  eventDate: '',
  location: '',
  published: false,
};

const MARKDOWN_HINT =
  'Supports Markdown: blank lines for paragraphs, * or - for bullets, **bold**, [text](https://url). Paste from Gemini as Markdown.';

function getImageMode(image) {
  if (!image) return 'url';
  if (isUploadedImage(image)) return 'upload';
  return 'url';
}

function EventManager() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyEvent);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageMode, setImageMode] = useState('url');

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

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP, etc.)');
      e.target.value = '';
      return;
    }

    setUploadLoading(true);
    try {
      const res = await api.uploadImage(file, 'events');
      setForm((prev) => ({ ...prev, image: res.data.url }));
    } catch (err) {
      alert(err.message || 'Image upload failed');
    } finally {
      setUploadLoading(false);
      e.target.value = '';
    }
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
    setImageMode(getImageMode(event.image));
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
    setSaving(true);
    try {
      if (editingId) {
        await api.updateEvent(editingId, form);
      } else {
        await api.createEvent(form);
      }
      setForm(emptyEvent);
      setImageMode('url');
      setEditingId(null);
      setShowForm(false);
      loadEvents();
    } catch (err) {
      alert(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(emptyEvent);
    setImageMode('url');
    setEditingId(null);
    setShowForm(false);
  };

  const openNewForm = () => {
    setShowForm(true);
    setEditingId(null);
    setForm(emptyEvent);
    setImageMode('url');
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Events</h1>
        <button type="button" className="admin-btn admin-btn-primary" onClick={openNewForm}>
          + Add Event
        </button>
      </div>

      {showForm && (
        <div className="admin-card">
          <h3>{editingId ? 'Edit Event' : 'New Event'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required disabled={saving} />
            </div>
            <div className="admin-form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={10}
                disabled={saving}
              />
              <small className="text-muted d-block mt-1">{MARKDOWN_HINT}</small>
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Event Date *</label>
                <input
                  type="datetime-local"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  required
                  disabled={saving}
                />
              </div>
              <div className="admin-form-group">
                <label>Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Delhi, India"
                  disabled={saving}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Image</label>
              <div className="image-mode-toggle">
                <button
                  type="button"
                  className={`image-mode-btn ${imageMode === 'url' ? 'active' : ''}`}
                  onClick={() => setImageMode('url')}
                  disabled={saving}
                >
                  Image URL
                </button>
                <button
                  type="button"
                  className={`image-mode-btn ${imageMode === 'upload' ? 'active' : ''}`}
                  onClick={() => setImageMode('upload')}
                  disabled={saving}
                >
                  Upload Image
                </button>
              </div>

              {imageMode === 'url' ? (
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="mt-2"
                  disabled={saving}
                />
              ) : (
                <div className="mt-2">
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadLoading || saving} />
                  <small className="text-muted d-block mt-1">JPG, PNG, WebP — max 5MB</small>
                  {uploadLoading && <p className="text-muted mt-1 mb-0">Uploading...</p>}
                </div>
              )}

              {form.image ? (
                <div className="preview-image-wrap mt-3">
                  <img src={getDisplayImage(form.image)} alt="Preview" className="story-preview-img" />
                </div>
              ) : null}
            </div>

            <label className="admin-checkbox">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                disabled={saving}
              />
              Publish on website
            </label>
            <div className="admin-actions">
              <button type="submit" className="admin-btn admin-btn-success" disabled={saving || uploadLoading}>
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin me-2"></i>
                    Saving...
                  </>
                ) : editingId ? (
                  'Update'
                ) : (
                  'Create'
                )}
              </button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={handleCancel} disabled={saving}>
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
                <th>Preview</th>
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
                  <td>
                    {event.image ? (
                      <img src={getDisplayImage(event.image)} alt="" className="story-thumb" />
                    ) : (
                      '—'
                    )}
                  </td>
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
