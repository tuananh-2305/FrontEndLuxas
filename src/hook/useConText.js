import { createContext } from "react";
import Data from "../assets/data/Data";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const {
    sideBar,
    headerTableImportName,
    headerTableExportName,
    headerTableLimitName,
  } = Data;
  const data = {
    sideBar,
    headerTableImportName,
    headerTableExportName,
    headerTableLimitName,
  };
  return <Context.Provider value={data}>{children}</Context.Provider>;
};
export { Context, ContextProvider };
