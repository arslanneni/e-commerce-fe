// fetch.js

const API_BASE_URL = "http://localhost:5000/";

// Utility function for making requests
const fetchApi = async (url, method = "GET", body = null, headers = {}) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, options);

    // Handle HTTP errors (non-2xx responses)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// GET request
const getApi = async (url, headers = {}) => {
  return await fetchApi(url, "GET", null, headers);
};

// POST request
const postApi = async (url, body, headers = {}) => {
  return await fetchApi(url, "POST", body, headers);
};

// PUT request
const putApi = async (url, body, headers = {}) => {
  return await fetchApi(url, "PUT", body, headers);
};

// DELETE request
const deleteApi = async (url, headers = {}) => {
  return await fetchApi(url, "DELETE", null, headers);
};

export { getApi, postApi, putApi, deleteApi };
