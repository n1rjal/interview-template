import { useQuery } from "react-query";
import AddTodoForm from "../components/TodoForm";
import TodoCard from "../components/TodoCard";
import { axiosInstance } from "../constants";

export interface Todo {
  id: number;
  title: string;
  is_completed: boolean;
  description: string;
  attend_at: string;
}

function TodoPage() {
  const { isLoading, error, data } = useQuery("todos", async () => {
    const res = await axiosInstance.get<{ data: Todo[] }>("/todos");
    return res.data;
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: Error occurred {error.toString()}</div>;

  return (
    <div className="m-auto w-[70vw]">
      <AddTodoForm />
      <hr />
      <div className="mt-[30px]">
        {data &&
          data.data.map((todo: Todo) => <TodoCard key={todo.id} {...todo} />)}
      </div>
    </div>
  );
}

export default TodoPage;
