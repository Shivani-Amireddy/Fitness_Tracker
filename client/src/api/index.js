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

// export const getDashboardDetails = async (token) => {
//   try {
//     const response = await API.get("/user/dashboard", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log("Dashboard response:", response.data);
//     return response;
//   } catch (error) {
//     console.error("Dashboard error:", error);
//     throw error;
//   }
// };

// export const getWorkouts = async (token, date) => {
//   try {
//     const response = await API.get(`/user/workout${date}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log("Workouts response:", response.data);
//     return response;
//   } catch (error) {
//     console.error("Workouts error:", error);
//     throw error;
//   }
// };

// export const addWorkout = async (token, data) => {
//   try {
//     const response = await API.post(`/user/workout`, data, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log("Add workout response:", response.data);
//     return response;
//   } catch (error) {
//     console.error("Add workout error:", error);
//     throw error;
//   }
// };
