import axios from "axios";
// import jwt from "jsonwebtoken";
export const apiUrl = "http://localhost:8000/api/hrboost/attendancelist/";
export class Attendances {
  constructor(info) {
    this.id = info.id;
    this.user_id = info.user_id;
    this.check_in = info.check_in;
    this.check_out = info.check_out;
  }
  static fromValues(values) {
    const info = {
      id: -1,
      user_id: values.user_id,
      check_in: values.check_in,
      check_out: values.check_out,
    };
    return new Attendances(info);
  }
}
// get a JSON Web Token from server
export async function getToken(values) {
  const url = "http://localhost:8000/api/token/";
  // console.log(values);
  const response = await axios.post(url, values);
  // console.log(response);
  const refreshUrl = "http://localhost:8000/api/token/refresh";
  const refreshResponse = await axios.post(refreshUrl, {
    refresh: response.data.refresh,
  });
  // const decodedAccess = jwt.decode(response.data.access);
  // const newState = {
  //   tokens: response.data,
  //   user: {
  //     username: decodedAccess.username,
  //     email: decodedAccess.email,
  //     id: decodedAccess.user_id,
  //   },
  // };
  // setState((prevState) => ({ ...prevState, ...newState }));
  return refreshResponse.data.access;
}
export async function fetchAttendance(url, token) {
  const config = makeConfig(token.access);
  // console.log(config);
  const response = await axios.get(url, config);
  // console.log(response);
  const attendances = response.data.map((info) => new Attendances(info));
  attendances.sort((a, b) => {
    if (a.user_id < b.user_id) return -1;
    if (a.user_id > b.user_id) return 1;
    return 0;
  });
  // console.log(attendances);
  return attendances;
}
export async function postAttendance(token, values) {
  const config = makeConfig(token);
  const lastattendance = await axios.get(
    "http://localhost:8000/api/hrboost/lastattendance/" + values.user_id + "/",
    config
  );
  console.log("lastattendance", lastattendance.data[0]);
  if (lastattendance.data[0].check_out) {
    const body = {
      id: -1,
      user_id: values.user_id,
      check_in: values.check_in,
    };
    console.log(body);

    const response = await axios.post(apiUrl, body, config);
    return response.data;
  } else {
    const body = {
      user_id: lastattendance.data[0].user_id,
      check_in: lastattendance.data[0].check_in,
      check_out: values.check_out,
    };
    // console.log(body);

    const response = await axios.put(
      "http://localhost:8000/api/hrboost/attendanceupdate/" +
        lastattendance.data[0].id +
        "/",
      body,
      config
    );
    return response.data;
  }
}
function makeConfig(token) {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}
