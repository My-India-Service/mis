import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const PERMISSION_OPTIONS = [
  { key: 'manage_blogs', label: 'Manage blogs' },
  { key: 'manage_events', label: 'Manage events' },
  { key: 'manage_stories', label: 'Manage success stories' },
  { key: 'manage_submissions', label: 'Manage form submissions' },
  { key: 'manage_users', label: 'Manage users' },
  { key: 'manage_uploads', label: 'Manage uploads' },
];

const emptyPermissions = () =>
  Object.fromEntries(PERMISSION_OPTIONS.map((p) => [p.key, false]));

const emptyForm = () => ({
  name: '',
  email: '',
  password: '',
  permissions: emptyPermissions(),
});

function UserManager() {
  const { admin: currentAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getUsers();
      setUsers(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (key, checked) => {
    setForm((prev) => ({
      ...prev,
      permissions: { ...prev.permissions, [key]: checked },
    }));
  };

  const openCreate = () => {
    setForm(emptyForm());
    setEditingId(null);
    setShowForm(true);
    setError('');
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
      permissions: { ...emptyPermissions(), ...(user.permissions || {}) },
    });
    setEditingId(user.id);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (user) => {
    if (user.id === currentAdmin?.id) {
      alert('Cannot delete your own account');
      return;
    }
    if (!window.confirm(`Delete user ${user.email}?`)) return;
    try {
      await api.deleteUser(user.id);
      loadUsers();
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        permissions: form.permissions,
      };
      if (form.password) payload.password = form.password;

      if (editingId) {
        await api.updateUser(editingId, payload);
      } else {
        if (!form.password) {
          setError('Password is required for new users');
          setSaving(false);
          return;
        }
        payload.password = form.password;
        await api.createUser(payload);
      }

      setForm(emptyForm());
      setEditingId(null);
      setShowForm(false);
      loadUsers();
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const permissionSummary = (perms = {}) =>
    PERMISSION_OPTIONS.filter((p) => perms[p.key])
      .map((p) => p.label.replace(/^Manage /, ''))
      .join(', ') || 'None';

  return (
    <div>
      <div className="admin-header">
        <h1>Users</h1>
        <button type="button" className="admin-btn admin-btn-primary" onClick={openCreate}>
          Add User
        </button>
      </div>

      {error && !showForm && <p className="admin-error">{error}</p>}

      {showForm && (
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <h2 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>
            {editingId ? 'Edit User' : 'New User'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label htmlFor="user-name">Name</label>
              <input
                id="user-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="user-email">Email</label>
              <input
                id="user-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="user-password">
                Password {editingId ? '(leave blank to keep current)' : ''}
              </label>
              <input
                id="user-password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                minLength={editingId ? undefined : 6}
                required={!editingId}
              />
            </div>

            <fieldset className="admin-form-group">
              <legend style={{ fontWeight: 600, marginBottom: '8px' }}>Permissions</legend>
              <div className="permission-grid">
                {PERMISSION_OPTIONS.map((opt) => (
                  <label key={opt.key} className="permission-check">
                    <input
                      type="checkbox"
                      checked={Boolean(form.permissions[opt.key])}
                      onChange={(e) => handlePermissionChange(opt.key, e.target.checked)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {error && <p className="admin-error">{error}</p>}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? 'Saving...' : editingId ? 'Update User' : 'Create User'}
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setError('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Permissions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.name}
                    {user.id === currentAdmin?.id ? (
                      <span className="admin-badge admin-badge-published" style={{ marginLeft: 8 }}>
                        You
                      </span>
                    ) : null}
                  </td>
                  <td>{user.email}</td>
                  <td style={{ fontSize: '13px', color: '#555' }}>
                    {permissionSummary(user.permissions)}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-primary admin-btn-sm"
                      onClick={() => handleEdit(user)}
                      style={{ marginRight: 6 }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      onClick={() => handleDelete(user)}
                      disabled={user.id === currentAdmin?.id}
                    >
                      Delete
                    </button>
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

export default UserManager;
