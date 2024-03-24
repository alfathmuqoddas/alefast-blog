import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./lib/pages/Home";
import About from "./lib/pages/About";
import Layout from "./lib/layout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
