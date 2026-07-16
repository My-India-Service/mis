import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { getDisplayImage, isUploadedImage } from '../../utils/imageUrl';

const emptyBlog = { title: '', excerpt: '', content: '', image: '', author: 'My India Service', published: false };

function getImageMode(image) {
  if (!image) return 'url';
  if (isUploadedImage(image)) return 'upload';
  return 'url';
}

function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyBlog);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageMode, setImageMode] = useState('url');

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.getBlogs(true);
      setBlogs(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
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
      const res = await api.uploadImage(file, 'blogs');
      setForm((prev) => ({ ...prev, image: res.data.url }));
    } catch (err) {
      alert(err.message || 'Image upload failed');
    } finally {
      setUploadLoading(false);
      e.target.value = '';
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      published: blog.published,
    });
    setImageMode(getImageMode(blog.image));
    setEditingId(blog._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    await api.deleteBlog(id);
    loadBlogs();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.updateBlog(editingId, form);
    } else {
      await api.createBlog(form);
    }
    setForm(emptyBlog);
    setImageMode('url');
    setEditingId(null);
    setShowForm(false);
    loadBlogs();
  };

  const handleCancel = () => {
    setForm(emptyBlog);
    setImageMode('url');
    setEditingId(null);
    setShowForm(false);
  };

  const openNewForm = () => {
    setShowForm(true);
    setEditingId(null);
    setForm(emptyBlog);
    setImageMode('url');
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Blogs</h1>
        <button type="button" className="admin-btn admin-btn-primary" onClick={openNewForm}>
          + Add Blog
        </button>
      </div>

      {showForm && (
        <div className="admin-card">
          <h3>{editingId ? 'Edit Blog' : 'New Blog'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div className="admin-form-group">
              <label>Excerpt</label>
              <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} />
            </div>
            <div className="admin-form-group">
              <label>Content *</label>
              <textarea name="content" value={form.content} onChange={handleChange} required rows={6} />
            </div>

            <div className="admin-form-group">
              <label>Image</label>
              <div className="image-mode-toggle">
                <button
                  type="button"
                  className={`image-mode-btn ${imageMode === 'url' ? 'active' : ''}`}
                  onClick={() => setImageMode('url')}
                >
                  Image URL
                </button>
                <button
                  type="button"
                  className={`image-mode-btn ${imageMode === 'upload' ? 'active' : ''}`}
                  onClick={() => setImageMode('upload')}
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
                />
              ) : (
                <div className="mt-2">
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadLoading} />
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

            <div className="admin-form-group">
              <label>Author</label>
              <input name="author" value={form.author} onChange={handleChange} />
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
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs yet. Add your first blog!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    {blog.image ? (
                      <img src={getDisplayImage(blog.image)} alt="" className="story-thumb" />
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>{blog.title}</td>
                  <td>
                    <span className={`admin-badge ${blog.published ? 'admin-badge-published' : 'admin-badge-draft'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="admin-actions">
                      <button type="button" className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleEdit(blog)}>
                        Edit
                      </button>
                      <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(blog._id)}>
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

export default BlogManager;
