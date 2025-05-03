const BASE_URL = 'http://localhost:3000'; // Change this to your actual API base URL

export const useApi = () => {
  const getToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return token;
  };

  const get = async (endpoint) => {
    const token = getToken();
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('authToken');
        window.location.href = '/signin';
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const post = async (endpoint, data) => {
    const token = getToken();
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/signin';
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const put = async (endpoint, data) => {
    const token = getToken();
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/signin';
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const del = async (endpoint) => {
    const token = getToken();
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/signin';
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return { get, post, put, del };
}; 