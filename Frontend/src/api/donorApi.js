const API_BASE_URL = 'http://localhost:8080/api/donors';

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
 * Fetch all registered donors.
 * GET /api/donors
 */
export async function getAllDonors() {
  const response = await fetch(API_BASE_URL);
  return handleResponse(response);
}

/**
 * Fetch a single donor by ID.
 * GET /api/donors/{id}
 */
export async function getDonorById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return handleResponse(response);
}

/**
 * Register/create a new donor.
 * POST /api/donors
 */
export async function createDonor(donorData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(donorData),
  });
  return handleResponse(response);
}

/**
 * Update an existing donor by ID.
 * PUT /api/donors/{id}
 */
export async function updateDonor(id, donorData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(donorData),
  });
  return handleResponse(response);
}

/**
 * Delete a donor by ID.
 * DELETE /api/donors/{id}
 */
export async function deleteDonor(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

