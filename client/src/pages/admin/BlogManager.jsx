import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const emptyBlog = { title: '', excerpt: '', content: '', image: '', author: 'My India Service', published: false };

function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyBlog);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      published: blog.published,
    });
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
    setEditingId(null);
    setShowForm(false);
    loadBlogs();
  };

  const handleCancel = () => {
    setForm(emptyBlog);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Blogs</h1>
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm(emptyBlog);
          }}
        >
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
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
              </div>
              <div className="admin-form-group">
                <label>Author</label>
                <input name="author" value={form.author} onChange={handleChange} />
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
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs yet. Add your first blog!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
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
