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

  getSuccessStories: (admin = false) => request(`/success-stories${admin ? '?admin=true' : ''}`),

  previewSuccessStory: (url) =>
    request('/success-stories/preview', { method: 'POST', body: JSON.stringify({ url }) }),

  createSuccessStory: (payload) =>
    request('/success-stories', { method: 'POST', body: JSON.stringify(payload) }),

  updateSuccessStory: (id, payload) =>
    request(`/success-stories/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),

  deleteSuccessStory: (id) => request(`/success-stories/${id}`, { method: 'DELETE' }),

  uploadSuccessStoryImage: async (file) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE}/upload/success-story-image`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data;
  },
};
