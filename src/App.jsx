// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./lib/pages/Home";
import About from "./lib/pages/About";
import Layout from "./lib/layout";
import BlogDetails from "./lib/pages/BlogDetails";

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
          path: "blog/:id",
          element: <BlogDetails />,
        },
      ],
    },
  ]);
  return (
    // <Router>
    //   <Layout>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/about" element={<About />} />
    //       <Route path="/blog/:id" element={<BlogDetails />} />
    //     </Routes>
    //   </Layout>
    // </Router>
    <RouterProvider router={router} />
  );
};

export default App;
