import axios from "axios";
import jwt_decode from "jwt-decode";

import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString
  };

  const [token, setToken] = useState(getToken());



  const saveToken = userToken => {
    localStorage.setItem('token', userToken);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}


// Set logged in user
export const setCurrentUser = (decoded, setUserData) => {
  // set the current user
  localStorage.setItem('userData', JSON.stringify(decoded));
  setUserData(decoded)
  return 
};

// Login - get user token
export const loginUser = (userData, history, setToken, setUserData) => {
  axios
    .post("/api/users/login", userData)
    .then(res => {

      //Save to localStorage
      const { token } = res.data;
      localStorage.setItem("token", token);
      //setAuthToken(token);
      const decoded = jwt_decode(token);

      // Set current user
      setCurrentUser(decoded, setUserData);

      setToken(token)

      history.push("/dash");

      window.location.reload();
    })
    .catch(err =>
      console.log(err)
    );
};



// Register User
export const registerUser = (userData, history)  => {

  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/signin"))
    .catch(err =>
      console.log(err)
    );
};


// Log user out
export const logoutUser = (history) => () => {
  // Remove token from local storage
  localStorage.removeItem("token");
  history.push("/signin")
  window.location.reload();
};

export const setAuthToken = (token) => {
    if (token) {
      // Apply authorization token to every request if logged in
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
  };