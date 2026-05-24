import axios from "axios";

export const signupUser = async (userData) => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/signup",
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/login",
    userData
  );
  return response.data;
};