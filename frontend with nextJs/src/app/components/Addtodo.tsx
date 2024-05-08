"use client"
import { useState, useEffect } from 'react';
import { UserType } from '../types/commontypes';

export default function AddTodo() {
  const [users, setUsers] = useState<UserType[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/get_users');
        const data = await response.json();
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle potential errors gracefully (e.g., display a fallback message)
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex mt-4">
      <select
        id="countries"
        className="max-w-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      >
        <option >Select user</option>
        {users.map((user,index) => (
          <option key={index}>{user.username}</option>
        ))}
      </select>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
        placeholder="Add Todo"
      />
      <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
        Add
      </button>
    </div>
  );
}
