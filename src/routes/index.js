import AddUserPage from "../pages/AddUserPage/AddUserPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ImportProductPage from "../pages/ImportProductPage/ImportProductPage";
import UserPage from "../pages/UserPage/UserPage";
import ExportProductPage from "../pages/ExportProductPage/ExportProductPage";
import AddImportProductPage from "../pages/AddImportProductPage/AddImportProductPage";
import AddExportProductPage from "../pages/AddExportProductPage/AddExportProductPage";

export const routes = [
  { path: "/", page: HomePage, isShowHeader: true },
  { path: "/import-product", page: ImportProductPage, isShowHeader: true },
  { path: "/export-product", page: ExportProductPage, isShowHeader: true },
  { path: "/user", page: UserPage, isShowHeader: true },
  { path: "/sign-in", page: LoginPage, isShowHeader: false },
  {
    path: "/add-import-product",
    page: AddImportProductPage,
    isShowHeader: true,
  },
  {
    path: "/add-export-product",
    page: AddExportProductPage,
    isShowHeader: true,
  },
  { path: "/add-user", page: AddUserPage, isShowHeader: true },
  { path: "*", page: NotFoundPage },
];
