const API_BASE_URL = 'http://localhost:8080/api/auth';

/**
 * Helper function to handle fetch responses and parse errors uniformly.
 */
async function handleResponse(response) {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid email or password.');
    }

    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const text = await response.text();
      if (text) {
        try {
          const errorData = JSON.parse(text);
          if (typeof errorData === 'string') {
            errorMessage = errorData;
          } else if (errorData && errorData.message) {
            errorMessage = errorData.message;
          } else {
            errorMessage = text;
          }
        } catch {
          errorMessage = text;
        }
      }
    } catch {
      // Fallback to default status message
    }
    throw new Error(errorMessage);
  }

  // 204 No Content has no response body
  if (response.status === 204) {
    return null;
  }

  return await response.json();
}

/**
 * Register a new user account.
 * POST /api/auth/signup
 */
export async function signup(userData) {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

/**
 * Authenticate and log in a user.
 * POST /api/auth/login
 */
export async function login(userData) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}
