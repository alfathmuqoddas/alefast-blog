import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./lib/pages/home";
import About from "./lib/pages/about";
import Layout from "./lib/layout";
import BlogDetails from "./lib/pages/blogDetails";
import CreateBlog from "./lib/pages/create-blog";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "create-blog",
          element: <CreateBlog />,
        },
        {
          path: "blog/:id",
          element: <BlogDetails />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
