import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Fragment } from "react";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const Layout = route.isShowHeader ? DefaultComponent : Fragment;
          const Page = route.page;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
