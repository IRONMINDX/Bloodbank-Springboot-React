const API_BASE_URL = 'http://localhost:8080/api/requests';

/**
 * Helper function to handle fetch responses and parse errors uniformly.
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (typeof errorData === 'string') {
        errorMessage = errorData;
      } else if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      try {
        const text = await response.text();
        if (text) {
          errorMessage = text;
        }
      } catch {
        // Fallback to default status message
      }
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
 * Fetch all blood requests.
 * GET /api/requests
 */
export async function getAllRequests() {
  const response = await fetch(API_BASE_URL);
  return handleResponse(response);
}

/**
 * Fetch a single blood request by ID.
 * GET /api/requests/{id}
 */
export async function getRequestById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return handleResponse(response);
}

/**
 * Create a new blood request.
 * POST /api/requests
 */
export async function createRequest(requestData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });
  return handleResponse(response);
}

/**
 * Update an existing blood request by ID.
 * PUT /api/requests/{id}
 */
export async function updateRequest(id, requestData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });
  return handleResponse(response);
}

/**
 * Delete a blood request by ID.
 * DELETE /api/requests/{id}
 */
export async function deleteRequest(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

