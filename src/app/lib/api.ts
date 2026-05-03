const API_BASE = '/.netlify/functions';

async function apiFetch(path: string, options?: RequestInit) {
  const token = localStorage.getItem('ff_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options?.headers,
  };

  const res = await fetch(`${API_BASE}/${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMsg = 'An error occurred';
    try {
      const err = await res.json();
      errorMsg = err.error || errorMsg;
    } catch (e) {
      errorMsg = await res.text();
    }
    throw new Error(errorMsg);
  }

  // Handle 204 No Content
  if (res.status === 204) return null;

  return res.json();
}

export const api = {
  // Auth
  login: (data: any) => apiFetch('auth-login', { method: 'POST', body: JSON.stringify(data) }),
  signup: (data: any) => apiFetch('auth-signup', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => apiFetch('auth-me'),

  // Dashboard Stats
  getDashboardStats: () => apiFetch('dashboard-stats'),

  // Food Posts
  getFoodPosts: () => apiFetch('food-posts'),
  createFoodPost: (data: any) => apiFetch('food-posts', { method: 'POST', body: JSON.stringify(data) }),
  updateFoodPost: (id: string, data: any) => apiFetch(`food-posts-id?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteFoodPost: (id: string) => apiFetch(`food-posts-id?id=${id}`, { method: 'DELETE' }),

  // Food Requests
  getFoodRequests: () => apiFetch('food-requests'),
  createFoodRequest: (data: any) => apiFetch('food-requests', { method: 'POST', body: JSON.stringify(data) }),
  updateFoodRequest: (id: string, data: any) => apiFetch(`food-requests-id?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteFoodRequest: (id: string) => apiFetch(`food-requests-id?id=${id}`, { method: 'DELETE' }),

  // Transports
  getTransports: () => apiFetch('transports'),
  createTransport: (data: any) => apiFetch('transports', { method: 'POST', body: JSON.stringify(data) }),
  updateTransport: (id: string, data: any) => apiFetch(`transports-id?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTransport: (id: string) => apiFetch(`transports-id?id=${id}`, { method: 'DELETE' }),

  // Contracts
  getContracts: () => apiFetch('contracts'),
  createContract: (data: any) => apiFetch('contracts', { method: 'POST', body: JSON.stringify(data) }),
  updateContract: (id: string, data: any) => apiFetch(`contracts-id?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteContract: (id: string) => apiFetch(`contracts-id?id=${id}`, { method: 'DELETE' }),

  // Reviews
  getReviews: () => apiFetch('reviews'),
  createReview: (data: any) => apiFetch('reviews', { method: 'POST', body: JSON.stringify(data) }),
  updateReview: (id: string, data: any) => apiFetch(`reviews-id?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteReview: (id: string) => apiFetch(`reviews-id?id=${id}`, { method: 'DELETE' }),
};
