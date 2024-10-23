// users api
export const updateUserApi = async (data) => {
  const response = await fetch("/api/users", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createUserApi = async (data) => {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getSingleUserApi = async (id) => {
  const response = await fetch(`/api/users?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getUsersApi = async () => {
  const response = await fetch("/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const deleteUserApi = async (id) => {
  const response = await fetch(`/api/users?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// company api
export const updateCompanyApi = async (data) => {
  const response = await fetch("/api/company", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createCompanyApi = async (data) => {
  const response = await fetch("/api/company", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getSingleCompanyApi = async (id) => {
  const response = await fetch(`/api/company?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getCompanyApi = async () => {
  const response = await fetch("/api/company", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const deleteCompanyApi = async (id) => {
  const response = await fetch(`/api/company?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
