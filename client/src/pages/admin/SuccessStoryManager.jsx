import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { getDisplayImage } from '../../utils/imageUrl';

const emptyStory = {
  title: '',
  challenge: '',
  solution: '',
  benefits: '',
  websiteUrl: '',
  previewImage: '',
  logoImage: '',
  published: false,
  order: 0,
};

function SuccessStoryManager() {
  const [stories, setStories] = useState([]);
  const [form, setForm] = useState(emptyStory);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewLoading, setPreviewLoading] = useState(false);

  const loadStories = async () => {
    setLoading(true);
    try {
      const res = await api.getSuccessStories(true);
      setStories(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFetchPreview = async () => {
    if (!form.websiteUrl) {
      alert('Please enter a website URL first');
      return;
    }
    setPreviewLoading(true);
    try {
      const res = await api.previewSuccessStory(form.websiteUrl);
      const preview = res.data;
      setForm((prev) => ({
        ...prev,
        previewImage: preview.previewImage,
        websiteUrl: preview.websiteUrl || prev.websiteUrl,
        title: prev.title || preview.title || prev.title,
        _fallbacks: preview.fallbacks || [],
      }));
    } catch (err) {
      alert(err.message || 'Could not fetch preview. You can paste an image URL manually.');
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleEdit = (story) => {
    setForm({
      title: story.title,
      challenge: story.challenge,
      solution: story.solution,
      benefits: story.benefits,
      websiteUrl: story.websiteUrl,
      previewImage: story.previewImage,
      logoImage: story.logoImage,
      published: story.published,
      order: story.order,
    });
    setEditingId(story._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this success story?')) return;
    await api.deleteSuccessStory(id);
    loadStories();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _fallbacks, ...payload } = form;
    if (editingId) {
      await api.updateSuccessStory(editingId, payload);
    } else {
      await api.createSuccessStory(payload);
    }
    setForm(emptyStory);
    setEditingId(null);
    setShowForm(false);
    loadStories();
  };

  const handleCancel = () => {
    setForm(emptyStory);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Success Stories</h1>
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm(emptyStory);
          }}
        >
          + Add Story
        </button>
      </div>

      {showForm && (
        <div className="admin-card">
          <h3>{editingId ? 'Edit Success Story' : 'New Success Story'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Website URL (click opens this link)</label>
                <input
                  name="websiteUrl"
                  value={form.websiteUrl}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>
              <div className="admin-form-group d-flex align-items-end">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={handleFetchPreview}
                  disabled={previewLoading}
                >
                  {previewLoading ? 'Fetching...' : 'Fetch Preview Image'}
                </button>
              </div>
            </div>

            {form.previewImage && (
              <div className="admin-form-group">
                <label>Preview Image</label>
                <div className="preview-image-wrap">
                  <img
                    src={getDisplayImage(form.previewImage)}
                    alt="Preview"
                    className="story-preview-img"
                    onError={(e) => {
                      const fallbacks = form._fallbacks || [];
                      const current = form.previewImage;
                      const next = fallbacks.find((f) => f !== current);
                      if (next) {
                        setForm((prev) => ({ ...prev, previewImage: next }));
                      } else {
                        e.currentTarget.style.display = 'none';
                      }
                    }}
                  />
                </div>
                <input
                  name="previewImage"
                  value={form.previewImage}
                  onChange={handleChange}
                  placeholder="Or paste image URL manually"
                  className="mt-2"
                />
                <small className="text-muted">
                  WordPress sites ke liye pehle og:image / featured image try hota hai, warna screenshot.
                </small>
              </div>
            )}

            <div className="admin-form-group">
              <label>Logo Image URL (optional)</label>
              <input name="logoImage" value={form.logoImage} onChange={handleChange} placeholder="/images/logo.png" />
            </div>

            <div className="admin-form-group">
              <label>Challenge</label>
              <textarea name="challenge" value={form.challenge} onChange={handleChange} rows={3} />
            </div>
            <div className="admin-form-group">
              <label>Solution</label>
              <textarea name="solution" value={form.solution} onChange={handleChange} rows={3} />
            </div>
            <div className="admin-form-group">
              <label>Benefits</label>
              <textarea name="benefits" value={form.benefits} onChange={handleChange} rows={3} />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Display Order</label>
                <input type="number" name="order" value={form.order} onChange={handleChange} min="0" />
              </div>
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
          <p>Loading stories...</p>
        ) : stories.length === 0 ? (
          <p>No success stories yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Title</th>
                <th>Website</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story) => (
                <tr key={story._id}>
                  <td>
                    {story.previewImage ? (
                      <img src={getDisplayImage(story.previewImage)} alt="" className="story-thumb" />
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>{story.title}</td>
                  <td>
                    {story.websiteUrl ? (
                      <a href={story.websiteUrl} target="_blank" rel="noreferrer">
                        Link
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    <span className={`admin-badge ${story.published ? 'admin-badge-published' : 'admin-badge-draft'}`}>
                      {story.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button
                        type="button"
                        className="admin-btn admin-btn-primary admin-btn-sm"
                        onClick={() => handleEdit(story)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(story._id)}
                      >
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

export default SuccessStoryManager;
