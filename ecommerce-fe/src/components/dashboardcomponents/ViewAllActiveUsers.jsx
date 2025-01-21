import React, { useState,useEffect } from 'react';

const ViewAllActiveUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchActiveUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/getAllActiveUsers");
      const data = await response.json();
      if (data.status === "SUCCESS") {
        setUsers(data.data);
      } else {
        setError("Failed to fetch users");
      }
    } catch (error) {
      setError("An error occurred while fetching users");
    }
  };
    useEffect(() => {
    fetchActiveUsers();
  }, []);
  return (
    <>
        <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">View All Users</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Users Table */}
      {users.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">User ID</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Created At</th>
              <th className="border border-gray-200 px-4 py-2">Modified At</th>
          
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-200 px-4 py-2">{user.user_id}</td>
                <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Date(user.datetime).toLocaleString()}
                </td>
                <td className="border border-gray-200 px-4 py-2">{user.status}</td>

                <td className="border border-gray-200 px-4 py-2">
                  {user.modified_datetime
                    ? new Date(user.modified_datetime).toLocaleString()
                    : "Not Modified"}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No users found.</p>
      )}

    

    </div>
    </> 
  )
}

export default ViewAllActiveUsers