import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Attendace.css";
const URL = "https://jsonplaceholder.typicode.com/users";

const Table = (props) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(URL);
    setEmployees(response.data);
  };

  const removeData = (id) => {
    axios.delete(`${URL}/${id}`).then((res) => {
      const del = props.Attendance.filter((employee) => id !== employee.id);
      props.setAttendance(del);
    });
  };

  const renderHeader = () => {
    let headerElement = ["id", "name", "checkin", "checkout", "operation"];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      props.Attendance &&
      props.Attendance.map(({ id, name, checkin, checkout }) => {
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{checkin}</td>
            <td>{checkout}</td>
            <td className="opration">
              <button className="button" onClick={() => removeData(id)}>
                Delete
              </button>
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <>
      <h1 id="title">employee Table</h1>
      <table id="employee">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </>
  );
};

export default Table;
