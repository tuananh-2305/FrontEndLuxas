import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ImportProductPage from "../pages/ImportProductPage/ImportProductPage";
import ExportProductPage from "../pages/ExportProductPage/ExportProductPage";
import UserPage from "../pages/UserPage/UserPage";
import UserInfoPage from "../pages/UserInfoPage/UserInfoPage";
import FileStoragePage from "../pages/FileStoragePage/FileStoragePage";
import LimitProduct from "../pages/LimitProduct/LimitProduct";

export const routes = [
  { path: "/", page: HomePage, isShowHeader: true },
  { path: "/import-product", page: ImportProductPage, isShowHeader: true },
  { path: "/export-product", page: ExportProductPage, isShowHeader: true },
  { path: "/limit-product", page: LimitProduct, isShowHeader: true },
  { path: "/user", page: UserPage, isShowHeader: true, isPrivate: true },
  { path: "/login", page: LoginPage, isShowHeader: false },
  { path: "/user-infor", page: UserInfoPage, isShowHeader: true },
  { path: "/file-storage", page: FileStoragePage, isShowHeader: true },
  { path: "*", page: NotFoundPage },
];
