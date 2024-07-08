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