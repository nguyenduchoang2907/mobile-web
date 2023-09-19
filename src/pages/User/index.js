import { getUsers } from "../../services/Api";
import React from "react";



const User=()=>{
 const[users,setUsers]=React.useState([]);
 React.useEffect(()=>{
    getUsers({}).then(({data})=>setUsers(data));
 },[]);
    return(
        <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {
            users.map((user)=>
            <tr>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
            </tr>)
        }
        </tbody>
      </table>
    )
}
export default User;