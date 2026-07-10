import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BlogManager from './BlogManager';
import EventManager from './EventManager';
import SubmissionsManager from './SubmissionsManager';
import './admin.css';

function AdminDashboard() {
  const { admin, logout } = useAuth();
  const [tab, setTab] = useState('blogs');

  return (
    <div className="admin-page">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2>MIS Admin</h2>
          <button
            type="button"
            className={`admin-nav-item ${tab === 'blogs' ? 'active' : ''}`}
            onClick={() => setTab('blogs')}
          >
            <i className="fas fa-blog me-2"></i> Blogs
          </button>
          <button
            type="button"
            className={`admin-nav-item ${tab === 'events' ? 'active' : ''}`}
            onClick={() => setTab('events')}
          >
            <i className="fas fa-calendar me-2"></i> Events
          </button>
          <button
            type="button"
            className={`admin-nav-item ${tab === 'submissions' ? 'active' : ''}`}
            onClick={() => setTab('submissions')}
          >
            <i className="fas fa-inbox me-2"></i> Form Submissions
          </button>
          <Link to="/" className="admin-nav-item" style={{ textDecoration: 'none' }}>
            <i className="fas fa-globe me-2"></i> View Website
          </Link>
          <button type="button" className="admin-nav-item" onClick={logout} style={{ marginTop: 'auto' }}>
            <i className="fas fa-sign-out-alt me-2"></i> Logout
          </button>
        </aside>
        <main className="admin-main">
          <div style={{ marginBottom: '8px', color: '#666', fontSize: '14px' }}>
            Logged in as <strong>{admin?.email}</strong>
          </div>
          {tab === 'blogs' && <BlogManager />}
          {tab === 'events' && <EventManager />}
          {tab === 'submissions' && <SubmissionsManager />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
