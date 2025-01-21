import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline"; // Importing icons from Heroicons
import { toast } from "react-toastify";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({
    id: "",
    user_id: "",
    email: "",
    role: "",
  });


  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/getAllUsers");
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

  // Handle Edit: Open Modal with User Data
  const handleEdit = (user) => {
    setUserToEdit({
      id: user.id,
      user_id: user.user_id,
      email: user.email,
      role: user.ecmUsersRoless.roles,
    });
    setModalOpen(true);
  };

  // Handle Delete User
  const handleDelete = async (email) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/users/deleteUserByEmail/${email}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        if (result.status === "SUCCESS") {
            fetchUsers();
          return toast.success("User deleted successfully!");
        } else {
          return toast.error("Failed to delete user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };

  // Handle Update User
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, role } = userToEdit;

    const updatedUser = { name, email, role };

    try {
      const response = await fetch(`http://localhost:5000/users/updateUser/${userToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      const result = await response.json();
      if (result.status === "SUCCESS") {
        fetchUsers();
        setUsers(users.map(user =>
          user.id === userToEdit.id ? { ...user, name, email, role } : user
        ));
        setModalOpen(false);
        return toast.success("User updated successfully!");
      } else {
        return toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
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
              <th className="border border-gray-200 px-4 py-2">Role</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Created At</th>
              <th className="border border-gray-200 px-4 py-2">Modified At</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-200 px-4 py-2">{user.user_id}</td>
                <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                <td className="border border-gray-200 px-4 py-2">{user.ecmUsersRoless.roles}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Date(user.datetime).toLocaleString()}
                </td>
                <td className="border border-gray-200 px-4 py-2">{user.status}</td>

                <td className="border border-gray-200 px-4 py-2">
                  {user.modified_datetime
                    ? new Date(user.modified_datetime).toLocaleString()
                    : "Not Modified"}
                </td>
                <td className="border border-gray-200 px-4 py-2 flex justify-center items-center space-x-2">
                  {/* Edit Icon */}
                  <PencilIcon
                    className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600"
                    onClick={() => handleEdit(user)}
                  />
                  {/* Delete Icon */}
                  <TrashIcon
                    className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600"
                    onClick={() => handleDelete(user.email)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No users found.</p>
      )}

      {/* Modal for Editing User */}
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <input
                  type="text"
                  id="user_id"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={userToEdit.user_id}
                  onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={userToEdit.email}
                  onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-gray-500 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllUsers;
