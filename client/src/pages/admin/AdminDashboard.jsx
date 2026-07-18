import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BlogManager from './BlogManager';
import EventManager from './EventManager';
import SubmissionsManager from './SubmissionsManager';
import SuccessStoryManager from './SuccessStoryManager';
import UserManager from './UserManager';
import './admin.css';

const TABS = [
  { id: 'blogs', label: 'Blogs', icon: 'fa-blog', permission: 'manage_blogs' },
  { id: 'events', label: 'Events', icon: 'fa-calendar', permission: 'manage_events' },
  {
    id: 'submissions',
    label: 'Form Submissions',
    icon: 'fa-inbox',
    permission: 'manage_submissions',
  },
  { id: 'stories', label: 'Success Stories', icon: 'fa-trophy', permission: 'manage_stories' },
  { id: 'users', label: 'Users', icon: 'fa-users', permission: 'manage_users' },
];

function AdminDashboard() {
  const { admin, logout, can } = useAuth();

  const visibleTabs = useMemo(() => TABS.filter((t) => can(t.permission)), [can]);

  const [tab, setTab] = useState(() => visibleTabs[0]?.id || '');

  useEffect(() => {
    if (!visibleTabs.some((t) => t.id === tab)) {
      setTab(visibleTabs[0]?.id || '');
    }
  }, [visibleTabs, tab]);

  return (
    <div className="admin-page">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2>MIS Admin</h2>
          {visibleTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`admin-nav-item ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <i className={`fas ${t.icon} me-2`}></i> {t.label}
            </button>
          ))}
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
          {visibleTabs.length === 0 && (
            <div className="admin-card">
              <p>
                Your account has no dashboard permissions. Ask a user with{' '}
                <strong>Manage users</strong> to grant access.
              </p>
            </div>
          )}
          {tab === 'blogs' && can('manage_blogs') && <BlogManager />}
          {tab === 'events' && can('manage_events') && <EventManager />}
          {tab === 'submissions' && can('manage_submissions') && <SubmissionsManager />}
          {tab === 'stories' && can('manage_stories') && <SuccessStoryManager />}
          {tab === 'users' && can('manage_users') && <UserManager />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
