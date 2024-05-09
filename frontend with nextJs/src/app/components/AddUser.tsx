"use client"
import {useRouter} from 'next/navigation'
import { useState } from "react";
import { AddUserAction, GetUsersAction } from "../lib/crud";
export default function AddUser(){
    const [showAddUserField, setShowAddUserField] = useState(false);
    const [addUserField, setAddUserField] = useState("");
    const [response, setResponse] = useState('');
    const router =useRouter()
    const AddUserFunction = async () => {
        try {
            
          const response = await AddUserAction(addUserField);
          setResponse(response.message);
          console.log(response);
          if (response) {
            setAddUserField(''); // Clear input field
            
            setShowAddUserField(!showAddUserField); // Hide the add user field
           
            router.push("/") // Fetch users again to update the list
            
          }
        } catch (error) {
            
          console.error('Error adding user:', error);
        }
      };
    return (
       
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
    )
}