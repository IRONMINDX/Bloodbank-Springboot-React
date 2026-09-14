const API_BASE_URL = 'http://localhost:8080/api/inventory';

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
 * Fetch all blood inventory records.
 * GET /api/inventory
 */
export async function getAllInventory() {
  const response = await fetch(API_BASE_URL);
  return handleResponse(response);
}

/**
 * Fetch a single blood inventory record by ID.
 * GET /api/inventory/{id}
 */
export async function getInventoryById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return handleResponse(response);
}

/**
 * Create a new blood inventory record.
 * POST /api/inventory
 */
export async function createInventory(inventoryData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inventoryData),
  });
  return handleResponse(response);
}

/**
 * Update an existing blood inventory record by ID.
 * PUT /api/inventory/{id}
 */
export async function updateInventory(id, inventoryData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inventoryData),
  });
  return handleResponse(response);
}

/**
 * Delete a blood inventory record by ID.
 * DELETE /api/inventory/{id}
 */
export async function deleteInventory(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

