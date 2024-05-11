import { GetUsersAction } from "../lib/crud";
import AddTodo from "../ui/Addtodo";

export default async function AddTodoWithUsers(){
    const data = await GetUsersAction()
    return (
        <AddTodo myusers={data}/>
    )
}