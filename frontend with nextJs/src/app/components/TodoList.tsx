"use client"
import { useEffect, useState} from "react"
import { GetTodosAction, } from "../lib/crud"
import { TodoType } from "../types/commontypes"

export default function TodoList(){
    const [todos,setTodos]=useState<TodoType[]>([])
    useEffect(()=>{
        const fetchTodos =async()=>{ 
       const todosData:TodoType[]=await GetTodosAction()
    
       setTodos(todosData)
    }
    fetchTodos()
    },[])
    return (
        <div>
        {todos.map((todo,index)=>{
            return(
                <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold">{todo.title}</h2>
      <p className="text-gray-600">{todo.description}</p>
      <div className="flex items-center mt-2">
        <input type="checkbox" checked={todo.is_completed} readOnly className="mr-2" />
        <span className={todo.is_completed ? "line-through text-gray-500" : "text-gray-500"}>{todo.is_completed ? "Completed" : "Pending"}</span>
      </div>
      <p className="text-sm text-gray-400 mt-2">Added by user id: {todo.user_id}</p>
      <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-2" >Remove</button>
    </div>
            )
        })}
        
      </div>
    )
}