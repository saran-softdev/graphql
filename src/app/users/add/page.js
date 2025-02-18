"use client";

import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import addUser from "@/lib/createUser";

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

export default function UsersPage() {
  const [createUser] = useMutation(CREATE_USER, {
    addUser,
    onCompleted: () => {
      setNewUser({ name: "", email: "", age: "" });
    }
  });

  const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });

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
        </div>
      </div>
    </div>
  );
}
