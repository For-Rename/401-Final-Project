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
async function leavesHandler(tokens, user) {
  if (!tokens) {
    return;
  }
  const response = await axios.get(
    "http://localhost:8000/api/hrboost/vacationsuser/" + user + "/",
    makeConfig(tokens)
  );
  console.log(response.data);
  const annuallyvac = response.data.filter(
    (item) => item.vacation_type > "annually"
  );
  const hourlyvac = response.data.filter(
    (item) => item.vacation_type > "hourly"
  );
  console.log("annuallyvac", annuallyvac);
  console.log("hourlyvac", hourlyvac);

  let sum_days_vac = annuallyvac.map((item) => {
    var date1 = new Date(item.start_date);
    var date2 = new Date(item.end_date);

    var Difference_In_Time = date2.getTime() - date1.getTime();
    return Difference_In_Time / (1000 * 3600 * 24);
  });
  console.log(sum_days_vac);
  return sum_days_vac;
}
export function AuthProvider(props) {
  const [state, setState] = useState({
    tokens: null,
    user: null,
    sum_days_vac: 0,
    login,
    logout,
  });
  async function login(username, password) {
    const obj = {
      username: username,
      password: password,
    };
    console.log(obj);
    const response = await axios.post(tokenUrl, obj);
    console.log(response);
    const decodedAccess = jwt.decode(response.data.access);
    localStorage.setItem("tokens", response.data.access);
    localStorage.setItem("user_id", decodedAccess.user_id);
    const userinfo = await axios.get(
      `http://localhost:8000/api/hrboost/userinfo/${decodedAccess.user_id}/`,
      makeConfig(response.data.access)
    );
    localStorage.setItem("userinfo", JSON.stringify(userinfo.data));

    const newState = {
      tokens: response.data[0],
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
  const tokensAccess = localStorage.getItem("tokens");
  console.log("tokensAccess", tokensAccess);

  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}
