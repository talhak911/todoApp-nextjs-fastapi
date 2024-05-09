"use client"
import { useState, useEffect } from 'react';
import { UserType } from '../types/commontypes';
import { AddUserAction, GetUsersAction } from "../lib/crud";

export default function AddTodo() {
 
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetUsersAction();
      setUsers(data);
    };
  
    fetchData();
  
  }, []);


  

  return (
    <div>
      
      
      {/* Add todo section */}
      <div className="flex mt-4">
        <select

          id="countries"
          className="max-w-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option>Select user</option>
          {users?.map((user, index) => (
            <option key={index}>{user.username}</option>
          ))}
        </select>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Add Todo"
        />
        <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
       
        >
          Add
        </button>
      </div>
    </div>
  );
}
