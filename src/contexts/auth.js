import { createContext, useContext, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
// const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const tokenUrl = "http://localhost:8000/api/token/";
const AuthContext = createContext();
export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("You forgot AuthProvider!");
  return auth;
}
export function AuthProvider(props) {
  const [state, setState] = useState({
    tokens: null,
    user: null,
    login,
    logout,
  });
  async function login(username, password) {
    const obj = {
      username: username,
      password: password,
    };
    const response = await axios.post(tokenUrl, obj);

    const decodedAccess = jwt.decode(response.data.access);

    const userinfo = await axios.get(
      `http://localhost:8000/api/hrboost/userinfo/${decodedAccess.user_id}/`,
      makeConfig(response.data.access)
    );

    localStorage.setItem("userinfo", JSON.stringify(userinfo.data[0]));

    const newState = {
      tokens: response.data,
      user: {
        username: decodedAccess.username,
        email: decodedAccess.email,
        id: decodedAccess.user_id,
      },
    };
    setState((prevState) => ({ ...prevState, ...newState }));
  }
  function logout() {
    const newState = {
      tokens: null,
      user: null,
    };
    setState((prevState) => ({ ...prevState, ...newState }));
  }
  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
}
function makeConfig(token) {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}
