const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong with the API request');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Authentication
  auth: {
    login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    getMe: () => request('/auth/me'),
    updateProfile: (profile) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(profile) }),
  },

  // Rooms
  rooms: {
    getAll: (params = '') => request(`/rooms${params ? `?${params}` : ''}`),
    getById: (id) => request(`/rooms/${id}`),
    create: (roomData) => request('/rooms', { method: 'POST', body: JSON.stringify(roomData) }),
    update: (id, updates) => request(`/rooms/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
    delete: (id) => request(`/rooms/${id}`, { method: 'DELETE' }),
  },

  // Residents (Admin)
  residents: {
    getAll: () => request('/residents'),
    getById: (id) => request(`/residents/${id}`),
    assignRoom: (payload) => request('/residents/assign-room', { method: 'POST', body: JSON.stringify(payload) }),
    checkout: (payload) => request('/residents/checkout', { method: 'POST', body: JSON.stringify(payload) }),
    updatePayment: (id, paymentStatus) => request(`/residents/${id}/payment`, { method: 'PUT', body: JSON.stringify({ paymentStatus }) }),
  },

  // Bookings / Check-ins
  bookings: {
    selfBook: (payload) => request('/bookings/book', { method: 'POST', body: JSON.stringify(payload) }),
    getMyStay: () => request('/bookings/my-stay'),
    getAll: () => request('/bookings'),
  },

  // Maintenance & Facility Tickets
  maintenance: {
    create: (ticket) => request('/maintenance', { method: 'POST', body: JSON.stringify(ticket) }),
    getMyTickets: () => request('/maintenance/my-tickets'),
    getAll: (params = '') => request(`/maintenance${params ? `?${params}` : ''}`),
    updateStatus: (id, updates) => request(`/maintenance/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  },

  // Stats, Specifications & Notices
  stats: {
    getAdminStats: () => request('/stats/admin'),
    getHostelInfo: () => request('/stats/hostel-info'),
    getNotices: () => request('/stats/notices'),
    createNotice: (notice) => request('/stats/notices', { method: 'POST', body: JSON.stringify(notice) }),
  },
};
