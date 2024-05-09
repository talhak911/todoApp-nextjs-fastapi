import AddTodo from "@/app/components/Addtodo";
import Image from "next/image";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div className=" h-screen w-full flex items-center justify-center bg-teal-lightest font-sans">
  <div className="bg-white rounded shadow-lg p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
    <div className="mb-4">
      <h1 className="text-grey-darkest text-3xl  font-bold">Todo List</h1>

    <AddTodo/>
    </div>
   <TodoList/>
  </div>
</div>

  );
}
