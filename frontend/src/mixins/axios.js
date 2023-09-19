import axios from "axios";
axios.defaults.headers.common["Content-Type"] = "application/json";

function setAuthToken() {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
    delete axios.defaults.headers.common["Authorization"];
  }
}

export { axios, setAuthToken };
