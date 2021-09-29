import React from "react";
const useUsers = () => {
    // 1
    const [users, usersSet] = React.useState([]);
  
    React.useEffect(() => {
      async function fetchUsers() {
        const fullResponse = await fetch('https://reqres.in/api/users');
        const responseJson = await fullResponse.json();
        usersSet(responseJson.data[0]);
      }
  
      fetchUsers();
    }, []);
  
    // 2
    return [users];
  };

export default useUsers;