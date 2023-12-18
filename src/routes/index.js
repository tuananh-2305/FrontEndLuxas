import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ImportProductPage from "../pages/ImportProductPage/ImportProductPage";
import UserPage from "../pages/UserPage/UserPage";
import ExportProductPage from "../pages/ExportProductPage/ExportProductPage";
import UserInfoPage from "../pages/UserInfoPage/UserInfoPage";

export const routes = [
  { path: "/", page: HomePage, isShowHeader: true },
  { path: "/import-product", page: ImportProductPage, isShowHeader: true },
  { path: "/export-product", page: ExportProductPage, isShowHeader: true },
  { path: "/user", page: UserPage, isShowHeader: true, isPrivate: true },
  { path: "/login", page: LoginPage, isShowHeader: false },
  { path: "/user-infor", page: UserInfoPage, isShowHeader: true },
  { path: "*", page: NotFoundPage },
];
