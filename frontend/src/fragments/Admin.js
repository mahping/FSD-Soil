import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

function AdminPage() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      axios.get('/api/admin/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the users!", error);
        });
    }, []);
  
    return (
      <div className="admin-page">
        <h2>All Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Joining</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.date_of_joining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default AdminPage;