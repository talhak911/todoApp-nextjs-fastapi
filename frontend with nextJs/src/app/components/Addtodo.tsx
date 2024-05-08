"use client"
import { useState, useEffect } from 'react';
import { UserType } from '../types/commontypes';
import { AddUserAction } from "../lib/crud";

export default function AddTodo() {
  const [showAddUserField, setShowAddUserField] = useState(false);
  const [addUserField, setAddUserField] = useState("");
  const [response, setResponse] = useState('');
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/get_users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const AddUserFunction = async () => {
    try {
      const response = await AddUserAction(addUserField);
      setResponse(response.message);
      console.log(response);
      if (response) {
        setAddUserField(''); // Clear input field
        
        setShowAddUserField(!showAddUserField); // Hide the add user field
           
        await fetchUsers(); // Fetch users again to update the list
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      {/* Add user section */}
      <div>
        <div className="flex max-h-15">
          <button 
            onClick={() => {
              setResponse("")
              setShowAddUserField(!showAddUserField)}}
            className="py-2 px-3 bg-blue-500 rounded-l text-white "
          >
            Add user
          </button>
          {showAddUserField && 
            <>
              <input
                className="shadow border rounded py-2 px-3 mr-4 text-grey-darker flex-grow"
                placeholder="Enter username"
                onChange={(e) => setAddUserField(e.target.value)}
                value={addUserField}
              />
              <button 
                onClick={AddUserFunction}
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
              >
                Add
              </button>
            </>
          }
        </div>
        <h1>{response}</h1>
      </div>
      
      {/* Add todo section */}
      <div className="flex mt-4">
        <select

          id="countries"
          className="max-w-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option>Select user</option>
          {users.map((user, index) => (
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
