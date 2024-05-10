"use client"
import { useState, useEffect } from 'react';
import { TodoType, UserType } from '../types/commontypes';
import { AddTodoAction, AddUserAction, GetUsersAction } from "../lib/crud";

export default function AddTodo() {
 
  const [users, setUsers] = useState<UserType[]>([]);
  const [response,setResponse]=useState("")
  const [todo,setTodo]=useState<TodoType>(
    {title:"",
    description:"",
    is_completed: false,
    user_id: 0,
    added_by:""
}
  )
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetUsersAction();
      console.log(AddTodoAction)
      setUsers(data);
    };
  
    fetchData();
  
},[GetUsersAction]);

const addTodoFunction =async ()=>{
  
  try {
            
    const response = await AddTodoAction(todo);
    setResponse(response.message);
  
    if (response) {
      setTodo({title:"",
      description:"",
      is_completed: false,
      user_id: 0,
      added_by:""}); // Clear input field
      
    
     
      
    }
  } catch (error) {
      
    console.error('Error adding user:', error);
  }
};

  

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-2">
  
    {/* Add todo section */}
    <div className="flex items-center justify-center space-x-4">
      <select
        id="users"
        className="max-w-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        onChange={(e)=>{
          setTodo({...todo,user_id:parseFloat(e.target.value.split(":")[1]),
          added_by:e.target.value.split(":")[0]})
          }}
      >
        <option>Select user</option>
        {users?.map((user, index) => (
          <option key={index}>{user.username}:{user.id}</option>
        ))}
      </select>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        placeholder="Add Todo title"
        onChange={(e)=>{
          setTodo({...todo,title:e.target.value})
        }}
      />
    </div>
    
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
      placeholder="Add Todo description"
      onChange={(e)=>{
        setTodo({...todo,description:e.target.value})
      }}
    />
    <button 
    onClick={()=>{addTodoFunction()}}
    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
      Add
    </button>
    <h1>{response}</h1>
    {todo.user_id}
  </div>
  
  );
}
