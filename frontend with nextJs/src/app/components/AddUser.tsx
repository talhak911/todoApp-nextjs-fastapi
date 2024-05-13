"use client"
import { useState } from "react";
import { AddUserAction, GetUsersAction } from "../lib/crud";

export default function AddUser(){ 
  const [pending,setPending]=useState(false)
    const [showAddUserField, setShowAddUserField] = useState(false);
    const [addUserField, setAddUserField] = useState("");
    const [response, setResponse] = useState('');
   
    const AddUserFunction = async () => {
        try {
            setPending(true)
          const res = await AddUserAction(addUserField);
          setResponse(res.message);
          console.log(res);
          if (res) {
            setAddUserField(''); // Clear input field
            
            setShowAddUserField(!showAddUserField); // Hide the add user field
           
            
          }
        } catch (error) {
            
          console.error('Error adding user:', error);
        }
        finally { 
          setPending(false)
        }
      };
     
    return (
       
      <div>
      <div className="flex flex-col max-h-15 mt-2 items-center justify-center gap-2">
        <button 
          onClick={() => {
            setResponse("")
            setShowAddUserField(!showAddUserField)}}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded "
        >
          Add user
        </button>
        {showAddUserField && 
          <>
            <input
              className="shadow border rounded py-2 px-3 text-grey-darker flex-grow"
              placeholder="Enter username"
              onChange={(e) => setAddUserField(e.target.value)}
              value={addUserField}
            /> 
            {pending && <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>}
            <button 
              onClick={AddUserFunction}
              disabled={pending}
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