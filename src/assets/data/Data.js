import CottageIcon from "@mui/icons-material/Cottage";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PeopleIcon from "@mui/icons-material/People";
import KeyIcon from "@mui/icons-material/Key";
import FolderIcon from "@mui/icons-material/Folder";

const Data = {
  sideBar: [
    {
      path: "/",
      sideBarName: "Dashboards",
      sideBarIcon: <CottageIcon fontSize="small" />,
    },
    {
      path: "",
      sideBarName: "Product",
      sideBarIcon: <LocalMallIcon fontSize="small" />,
      sideBarChild: [
        {
          path: "/import-product",
          sideBarChildName: "Import",
        },
        {
          path: "/export-product",
          sideBarChildName: "Export",
        },
      ],
    },
    {
      path: "/user",
      sideBarName: "User",
      sideBarIcon: <PeopleIcon fontSize="small" />,
    },
    {
      path: "/file-storage",
      sideBarName: "File Storage",
      sideBarIcon: <FolderIcon fontSize="small" />,
    },
    {
      path: "",
      sideBarName: "Authentication",
      sideBarIcon: <KeyIcon fontSize="small" />,
      sideBarChild: [
        {
          path: "",
          sideBarChildName: "Log Out",
          isLogout: true,
        },
      ],
    },
  ],
  headerTableImportName: [
    { headerImportName: "", wHeader: "150px" },
    { headerImportName: "STT", wHeader: "50px" },
    { headerImportName: "Image", wHeader: "180px" },
    { headerImportName: "Import Date", wHeader: "150px" },
    { headerImportName: "IMPORT N.0 / VAT N.0", wHeader: "170px" },
    { headerImportName: "Luxas Code", wHeader: "150px" },
    { headerImportName: "Status", wHeader: "100px" },
    { headerImportName: "Part Name", wHeader: "180px" },
    { headerImportName: "Model", wHeader: "150px" },
    { headerImportName: "Supplies", wHeader: "180px" },
    { headerImportName: "Supplies Address", wHeader: "180px" },
    { headerImportName: "Maker", wHeader: "150px" },
    { headerImportName: "SH Code", wHeader: "150px" },
    { headerImportName: "Quantity", wHeader: "80px" },
    { headerImportName: "Unit", wHeader: "80px" },
    { headerImportName: "Price", wHeader: "80px" },
    { headerImportName: "Amount", wHeader: "80px" },
    { headerImportName: "Size", wHeader: "150px" },
    { headerImportName: "Import Tax", wHeader: "100px" },
    { headerImportName: "Vat Import", wHeader: "100px" },
    { headerImportName: "Fee shipping", wHeader: "120px" },
    { headerImportName: "Costoms service", wHeader: "150px" },
    { headerImportName: "Fines", wHeader: "100px" },
    { headerImportName: "Total Fee", wHeader: "120px" },
    { headerImportName: "Description", wHeader: "180px" },
    { headerImportName: "Stock local", wHeader: "120px" },
    { headerImportName: "Note", wHeader: "150px" },
    { headerImportName: "", wHeader: "100px" },
  ],
  headerTableExportName: [
    { headerExportName: "STT", wHeader: "50px" },
    { headerExportName: "Implementer", wHeader: "150px" },
    { headerExportName: "Image", wHeader: "180px" },
    { headerExportName: "Export Date", wHeader: "150px" },
    { headerExportName: "Luxas Code", wHeader: "150px" },
    { headerExportName: "Sales for  copany Name", wHeader: "200px" },
    { headerExportName: "Quantity", wHeader: "100px" },
    { headerExportName: "Price", wHeader: "100px" },
    { headerExportName: "Amount", wHeader: "100px" },
    { headerExportName: "Customer sevice ", wHeader: "200px" },
    { headerExportName: "Vat %", wHeader: "100px" },
    { headerExportName: "Shipping fee", wHeader: "100px" },
    { headerExportName: "Commission", wHeader: "150px" },
    { headerExportName: "Fees incurred (if any)", wHeader: "200px" },
    { headerExportName: "Profit", wHeader: "150px" },
    { headerExportName: "Note", wHeader: "180px" },
    { headerImportName: "", wHeader: "80px" },
  ],
};
export default Data;
