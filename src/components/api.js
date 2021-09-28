import axios from "axios";
export const apiUrl = "http://localhost:8000/api/hrboost/attendance/";
export class Attendances {
  constructor(info) {
    this.id = info.id;
    this.name = info.name;
    this.checkin = info.checkin;
    this.checkout = info.checkout;
  }
  static fromValues(values) {
    const info = {
      id: -1,
      name: values.name,
      checkin: values.checkin,
      checkout: values.checkout,
    };
    return new Attendances(info);
  }
}

export async function fetchAttendance(url, token) {
  const config = makeConfig(token);
  const response = await axios.get(url, config);
  console.log(response.data);
  const attendances = response.data.map((info) => new Attendances(info));
  attendances.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  // console.log(attendances);
  return attendances;
}
export async function postAttendance(token, values) {
  const body = {
    id: -1,
    name: values.name,
    checkin: values.checkin,
    checkout: values.checkout,
  };
  const config = makeConfig(token);
  const response = await axios.post(apiUrl, body, config);
  return response.data;
}
function makeConfig(token) {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}


