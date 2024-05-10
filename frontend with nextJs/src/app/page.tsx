import AddTodo from "@/app/components/Addtodo";
import Image from "next/image";
import TodoList from "./components/TodoList";
import AddUser from "./components/AddUser";

export default function Home() {
  return (
    <div className="w-full flex items-center justify-center bg-teal-lightest font-sans">
    <div className="bg-white rounded shadow-lg p-6 m-4 max-w-sm w-full">
      <div className="mb-4">
        <h1 className="text-grey-darkest text-3xl font-bold">Todo List</h1>
        <div className="mt-4">
          <AddUser />
          <AddTodo />
        </div>
      </div>
      <TodoList />
    </div>
  </div>
  

  );
}
