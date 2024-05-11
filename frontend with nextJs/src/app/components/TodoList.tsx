
import { DeleteTodoAction, GetTodosAction, } from "../lib/crud"
import { TodoType } from "../types/commontypes"
import TodoCrud from "../ui/todoCrud"

export default async function TodoList(){
  
const data:TodoType[]=await GetTodosAction()
const todos : TodoType[] = data.sort((a:TodoType,b:TodoType)=>a.id - b.id)

  
    return (
        <div>
        {todos?.map((todo,index)=>{
            return(
                <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold">{todo.title}</h2>
      <p className="text-gray-600">{todo.description}</p>
      <div className="flex items-center mt-2">
        <input type="checkbox" checked={todo.is_completed} readOnly className="mr-2" />
        <span className={todo.is_completed ? "line-through text-gray-500" : "text-gray-500"}>{todo.is_completed ? "Completed" : "Pending"}</span>
      </div>
      <p className="text-sm text-gray-400 mt-2">Added by user id: {todo.added_by}</p>
     <TodoCrud todo={todo}/>
    </div>
            )
        })}
        
      </div>
    )
}