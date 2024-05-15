import { QueryClientProvider } from "react-query";
import { queryClient } from "./constants";
import TodoPage from "./pages/todo";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="w-max-70w mx-auto">
        <TodoPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
