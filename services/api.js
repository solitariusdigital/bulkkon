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

// solutions api
export const updateSolutionApi = async (data) => {
  const response = await fetch("/api/solutions", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createSolutionApi = async (data) => {
  const response = await fetch("/api/solutions", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getSingleSolutionApi = async (id) => {
  const response = await fetch(`/api/solutions?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getSolutionsApi = async () => {
  const response = await fetch("/api/solutions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// controls api
export const updateControlApi = async (data) => {
  const response = await fetch("/api/controls", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createControlApi = async (data) => {
  const response = await fetch("/api/controls", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getControlsApi = async () => {
  const response = await fetch("/api/controls", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// charity api
export const updateCharityApi = async (data) => {
  const response = await fetch("/api/charity", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createCharityApi = async (data) => {
  const response = await fetch("/api/charity", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getCharityApi = async () => {
  const response = await fetch("/api/charity", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// covers api
export const updateCoverApi = async (data) => {
  const response = await fetch("/api/covers", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createCoverApi = async (data) => {
  const response = await fetch("/api/covers", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getCoversApi = async () => {
  const response = await fetch("/api/covers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const deleteCoverApi = async (id) => {
  const response = await fetch(`/api/covers?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// news api
export const updateNewsApi = async (data) => {
  const response = await fetch("/api/news", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createNewsApi = async (data) => {
  const response = await fetch("/api/news", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getSingleNewsApi = async (id) => {
  const response = await fetch(`/api/news?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getNewsApi = async () => {
  const response = await fetch("/api/news", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const deleteNewsApi = async (id) => {
  const response = await fetch(`/api/news?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// pages api
export const updatePageApi = async (data) => {
  const response = await fetch("/api/pages", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createPageApi = async (data) => {
  const response = await fetch("/api/pages", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getPagesApi = async () => {
  const response = await fetch("/api/pages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// Media api
export const updateMediaApi = async (data) => {
  const response = await fetch("/api/media", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createMediaApi = async (data) => {
  const response = await fetch("/api/media", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getMediaApi = async () => {
  const response = await fetch("/api/media", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
