const API_BASE = '/api';

const getToken = () => localStorage.getItem('adminToken');

const request = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const api = {
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  getMe: () => request('/auth/me'),

  getBlogs: (admin = false) => request(`/blogs${admin ? '?admin=true' : ''}`),

  getBlog: (slug) => request(`/blogs/${slug}`),

  createBlog: (payload) => request('/blogs', { method: 'POST', body: JSON.stringify(payload) }),

  updateBlog: (id, payload) => request(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),

  deleteBlog: (id) => request(`/blogs/${id}`, { method: 'DELETE' }),

  getEvents: (admin = false) => request(`/events${admin ? '?admin=true' : ''}`),

  getEvent: (id) => request(`/events/${id}`),

  createEvent: (payload) => request('/events', { method: 'POST', body: JSON.stringify(payload) }),

  updateEvent: (id, payload) => request(`/events/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),

  deleteEvent: (id) => request(`/events/${id}`, { method: 'DELETE' }),

  getSubmissions: (query = '') => request(`/contact${query}`),

  deleteSubmission: (id) => request(`/contact/${id}`, { method: 'DELETE' }),
};
