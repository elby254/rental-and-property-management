const BASE_URL = "http://localhost:3000";

  // GET ALL PROPERTIES
 export const getProperties = async () => {
  const res = await fetch(`${BASE_URL}/api/properties`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};

  // CREATE PROPERTY
  export const createProperty = async (data) => {
    const res = await fetch(`${BASE_URL}/api/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const responseBody = await res.json();
    if (!res.ok) {
      throw new Error(responseBody.message || JSON.stringify(responseBody));
    }

    return responseBody;
  };

  // UPDATE PROPERTY
  export const updateProperty = async (id, data) => {
    const res = await fetch(`${BASE_URL}/api/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const responseBody = await res.json();
    if (!res.ok) {
      throw new Error(responseBody.message || JSON.stringify(responseBody));
    }

    return responseBody;
  };

  // DELETE PROPERTY
  export const deleteProperty = async (id) => {
    const res = await fetch(`${BASE_URL}/api/properties/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const responseBody = await res.json();
    if (!res.ok) {
      throw new Error(responseBody.message || JSON.stringify(responseBody));
    }

    return responseBody;
  };

