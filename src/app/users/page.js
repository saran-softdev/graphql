"use client";

import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import client from "@/lib/apolloClient";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      age
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $age: Int) {
    createUser(name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String, $email: String, $age: Int) {
    updateUser(id: $id, name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default function UsersPage() {
  const { loading, error, data, refetch } = useQuery(GET_USERS, { client });

  const [createUser] = useMutation(CREATE_USER, {
    client,
    onCompleted: () => {
      refetch();
      setNewUser({ name: "", email: "", age: "" });
    }
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    client,
    onCompleted: () => {
      refetch();
      setEditingUser(null);
    }
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    client,
    onCompleted: () => refetch()
  });

  const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });
  const [editingUser, setEditingUser] = useState(null);

  const handleCreateUser = (e) => {
    e.preventDefault();
    createUser({
      variables: {
        name: newUser.name,
        email: newUser.email,
        age: newUser.age ? parseInt(newUser.age) : null
      }
    });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    updateUser({
      variables: {
        id: editingUser.id,
        name: editingUser.name,
        email: editingUser.email,
        age: editingUser.age ? parseInt(editingUser.age) : null
      }
    });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser({ variables: { id } });
    }
  };

  if (loading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5">Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            User Management
          </h1>

          {/* Create User Form */}
          <form onSubmit={handleCreateUser} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Add New User
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={newUser.age}
                onChange={(e) =>
                  setNewUser({ ...newUser, age: e.target.value })
                }
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition duration-150"
              >
                Add User
              </button>
            </div>
          </form>

          {/* Users List */}
          <ul className="space-y-4">
            {data.users.map((user) => (
              <li key={user.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
                {editingUser && editingUser.id === user.id ? (
                  // Edit Form
                  <form onSubmit={handleUpdateUser}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            name: e.target.value
                          })
                        }
                        className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
                        required
                      />
                      <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            email: e.target.value
                          })
                        }
                        className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
                        required
                      />
                      <input
                        type="number"
                        value={editingUser.age}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            age: e.target.value
                          })
                        }
                        className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
                      />
                    </div>
                    <div className="mt-4 flex space-x-4">
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-150"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingUser(null)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-150"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // Display User Info
                  <div className="flex flex-col md:flex-row md:justify-between items-start">
                    <div>
                      <p className="text-xl font-semibold text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-gray-600">{user.age} years old</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-4">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition duration-150"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-150"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
