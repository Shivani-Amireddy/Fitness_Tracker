import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082/api/",
});

export const UserSignUp = async (data) => {
  try {
    const response = await API.post("/user/signup", data);
    console.log("Sign up response:", response.data);
    return response;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const UserSignIn = async (data) => {
  try {
    const response = await API.post("/user/signin", data);
    console.log("Sign in response:", response.data);
    return response;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await API.get("/user/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log("Get profile response:", response.data);
    return response;
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
};

export const updateUserProfile = async (data) => {
  try {
    const response = await API.put("/user/profile", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log("Update profile response:", response.data);
    return response;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const logFood = async (data) => {
  try {
    const response = await API.post('/food/log', data);
    return response.data;
  } catch (error) {
    console.error('Log food error:', error);
    throw error;
  }
};

export const getFoodLogs = async () => {
  try {
    const response = await API.get('/food/logs');
    return response.data;
  } catch (error) {
    console.error('Get food logs error:', error);
    throw error;
  }
};

export const updateFoodLog = async (data) => {
  try {
    const response = await API.put('/food/log', data);
    return response.data;
  } catch (error) {
    console.error('Update food log error:', error);
    throw error;
  }
};

export const deleteFoodLog = async (id) => {
  try {
    const response = await API.delete(`/food/log/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete food log error:', error);
    throw error;
  }
};

export const logActivity = async (data) => {
  try {
    const response = await API.post('/activity/log', data);
    return response.data;
  } catch (error) {
    console.error('Log activity error:', error);
    throw error;
  }
};

export const getActivityLogs = async () => {
  try {
    const response = await API.get('/activity/logs');
    return response.data;
  } catch (error) {
    console.error('Get activity logs error:', error);
    throw error;
  }
};

export const updateActivityLog = async (data) => {
  try {
    const response = await API.put('/activity/log', data);
    return response.data;
  } catch (error) {
    console.error('Update activity log error:', error);
    throw error;
  }
};

export const deleteActivityLog = async (id) => {
  try {
    const response = await API.delete(`/activity/log/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete activity log error:', error);
    throw error;
  }
};