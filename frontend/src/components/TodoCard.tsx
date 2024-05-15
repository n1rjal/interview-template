import { axiosInstance, queryClient } from "../constants";
import { Todo } from "../pages/todo";
import { toast } from "react-hot-toast";

function TodoCard(todo: Todo) {
  const normalizeDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
  const onDelete = () => {
    axiosInstance.delete(`/todos/${todo.id}`).then(() => {
      toast.success("Todo deleted successfully");
      queryClient.invalidateQueries("todos");
    });
  };

  const onUpdate = () => {
    axiosInstance
      .put(`/todos/${todo.id}`, { is_completed: !todo.is_completed })
      .then(() => {
        toast.success("Todo updated successfully");
        queryClient.invalidateQueries("todos");
      });
  };

  return (
    <div className="flex justify-between my-[10px] p-[10px] border border-gray-300">
      <div>
        <h3 className="text-2xl">{todo.title}</h3>
        <p>{todo.description}</p>
        <p>{normalizeDate(todo.attend_at)}</p>
        <p>{todo.is_completed ? "Completed" : "Not Completed"}</p>
      </div>
      <div>
        <div className="mb-3 w-[80px]">
          <button
            onClick={onUpdate}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Update
          </button>
        </div>
        <div className="w-[80px]">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
