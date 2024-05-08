"use client"
import { useState } from "react"
import { AddUserAction } from "../lib/crud"
export default function AddUser(){
    const [showAddUserField,setShowAddUserField]=useState(false)
    const [user,setUser]=useState("")
    return (
        <div className="flex max-h-15">
            <button 
            onClick={()=>{setShowAddUserField(!showAddUserField)}}
            className="py-2 px-3 bg-blue-500 rounded-l text-white ">Add user</button>
          {showAddUserField&& <>
            <input
        className="shadow border rounded py-2 px-3 mr-4 text-grey-darker flex-grow"
        placeholder="add username"
        onChange={(e)=>{setUser(e.target.value)}}
        value={user}
      />
      <button 
      onClick={()=>{AddUserAction(user)}}
      className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
        Add
      </button>
          </>
      }
      
        </div>
    )
}