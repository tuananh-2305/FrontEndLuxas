import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Fragment, useEffect } from "react";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isJsonString } from "./untils";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
import * as UserService from "./service/UserService";

function App() {
  const queryClient = new QueryClient();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const { decode, storageData } = handleDecoded();
    if (decode?.id) {
      handleGetDetailsUser(decode?.id, storageData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decode = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decode = jwtDecode(storageData);
    }
    return { decode, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decode } = handleDecoded();
      if (decode?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Beare ${data?.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const isCheckAuth = !route.isPrivate || user?.isAdmin;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={isCheckAuth ? route.path : undefined}
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
    </QueryClientProvider>
  );
}

export default App;
