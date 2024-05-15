import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "./Input";
import { axiosInstance, queryClient } from "../constants";
import { Todo } from "../pages/todo";
import { toast } from "react-hot-toast";

const initialValues: Omit<Todo, "id"> = {
  title: "",
  description: "",
  attend_at: "",
  is_completed: false,
};

const AddTodoValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  attend_at: Yup.string().required("Attend at is required"),
  is_completed: Yup.boolean().required("Completed is required"),
});

function AddTodoForm() {
  const { handleSubmit, setValues, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema: AddTodoValidationSchema,
    onSubmit: (values) => {
      axiosInstance
        .post("/todos", values)
        .then(() => {
          toast.success("Todo added successfully");
          queryClient.invalidateQueries("todos");
          //clear the form
          setValues(initialValues);
        })
        .catch(() => {
          toast.error("Error occurred while adding todo");
        });
    },
  });

  return (
    <div className="my-[20px]">
      <h1 className="text-2xl text-black-300 mb-[20px]">Add Todo Form</h1>

      <form
        className=" flex flex-row gap-[30px] # align items in center items-start"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label htmlFor="">Title</label>
          <br />
          <Input
            id=""
            type="text"
            value={values.title}
            onChange={handleChange}
            name="title"
            className="border border-gray-300"
            error={errors.title}
          />
        </div>
        <div>
          <label htmlFor="">Description</label>
          <br />
          <Input
            id=""
            type="text"
            value={values.description}
            onChange={handleChange}
            name="description"
            className="border border-gray-300"
            error={errors.description}
          />
        </div>
        <div>
          <label htmlFor="">Attent at</label>
          <br />
          <Input
            id=""
            type="date"
            value={values.attend_at}
            onChange={handleChange}
            name="attend_at"
            className="border border-gray-300"
            error={errors.attend_at}
          />
        </div>
        <div>
          <label htmlFor="">Completed</label>
          <br />
          <Input
            id=""
            info="Check if completed"
            type="checkbox"
            name="is_completed"
            value={values.is_completed}
            onChange={handleChange}
            className="border border-gray-300"
            error={errors.is_completed}
          />
        </div>
        <div className="h-[100px] flex items-center">
          <input
            type="submit"
            value="Submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default AddTodoForm;
