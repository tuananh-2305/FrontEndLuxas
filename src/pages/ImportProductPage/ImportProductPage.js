import { Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Context } from "../../hook/useConText";
import Button from "@mui/material/Button";
import ButtonComponent from "../../components/common/ButtonComponent/ButtonComponent";
import Pagination from "@mui/material/Pagination";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Avatar from "@mui/material/Avatar";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../service/ProductService";
import AddProductPage from "../AddProductPage/AddProductPage";
import DrawerProductComponent from "../../components/common/DrawerProductComponent/DrawerProductComponent";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as message from "../../components/common/MessageComponent/MessageComponent";
import AddExportProduct from "../AddExportProduct/AddExportProduct";
import DeleteModalComponent from "../../components/common/DeleteModalComponent/DeleteModalComponent";

const ImportProductPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalDeLete, setOpenModalDeLete] = useState(false);
  const [idProduct, setIdProduct] = useState("");

  const [openModalExport, setOpenModalExport] = useState(false);

  const handleOpenModalExport = (id) => {
    setOpenModalExport(true);
    setIdProduct(id);
  };
  const handleCloseModalExport = () => {
    setOpenModalExport(false);
  };

  const [openModalProduct, setOpenModelProduct] = useState(false);
  const handleOpenAddProduct = () => setOpenModelProduct(true);

  const showDrawer = (id) => {
    setOpenDrawer(true);
    setIdProduct(id);
  };
  const handleCloseAddProduct = () => {
    setOpenModelProduct(false);
  };
  const { headerTableImportName } = useContext(Context);

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    return res.data;
  };

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProduct(),
  });

  const handleShowModal = (id) => {
    setIdProduct(id);
    setOpenModalDeLete(true);
  };
  const handleCloseModal = () => {
    setOpenModalDeLete(false);
    setIdProduct("");
  };

  const mutationDelete = useMutationHooks((data) => {
    const { id } = data;
    const res = ProductService.deteleProduct(id);
    return res;
  });
  const { data: dataDelete } = mutationDelete;

  useEffect(() => {
    if (dataDelete?.status === "OK") {
      message.success("Delete Product Success");
      handleCloseModal();
    } else if (dataDelete?.status === "ERR") {
      message.error(dataDelete?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDelete]);

  const handleDeleteProduct = () => {
    mutationDelete.mutate({ id: idProduct });
  };

  return (
    <Stack
      sx={{
        position: "relative",
      }}
    >
      <AddProductPage
        openModalProduct={openModalProduct}
        handleCloseAddProduct={handleCloseAddProduct}
      />
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          margin: "30px",
        }}
      >
        <Typography
          sx={{ fontSize: "30px", fontWeight: "bold", color: "#3F0071" }}
        >
          Product
        </Typography>
        <Typography
          sx={{
            color: "#ff6600",
            fontSize: "28px",
            fontWeight: "bold",
            textDecoration: "underline",
            marginLeft: "10px",
          }}
        >
          Import
        </Typography>
        <Stack sx={{ marginLeft: "auto" }}>
          <ButtonComponent
            iconButton={<AddIcon />}
            textButton="Add Product"
            bgButton="#3F0071"
            hoverBtn="#1465C0"
            paddingBtn="10px"
            onClickBtn={() => handleOpenAddProduct()}
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          backgroundColor: "#F2F3F5",
          padding: "30px",
          flexDirection: "row",
          alignItems: "center",
          borderTopRightRadius: "15px",
          borderTopLeftRadius: "15px",
          margin: "30px",
        }}
      >
        <InputComponent
          placeholder="Search"
          iconInput={<SearchIcon />}
          borderInput=".1px solid #333"
          wInput="30%"
          bgInput="#fff"
        />
        <Stack
          sx={{
            marginLeft: "auto",
            padding: "5px",
            borderRadius: "5px",
            background: "#3F0071",
            color: "#fff",
            cursor: "pointer",
            boxShadow:
              "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <TuneIcon />
        </Stack>
      </Stack>
      <Stack
        sx={{
          position: "absolute",
          width: "100%",
          top: "40vh",
          flexDirection: "column",
          padding: "0 30px 50px",
        }}
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {headerTableImportName.map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      textAlign:
                        header.headerImportName === "STT" ? "center" : "left",
                    }}
                  >
                    <Typography
                      sx={{
                        width: header.wHeader,
                        fontWeight: "bold",
                        color: "#3F0071",
                      }}
                    >
                      {header.headerImportName}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {products?.map((product, index) => (
              <TableBody sx={{ background: "#f2f2f2" }} key={index}>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <ButtonComponent
                      fontSizeBtn="15px"
                      bgButton="#004225"
                      iconButton={<FileUploadIcon fontSize="small" />}
                      textButton="Export"
                      hoverBtn="#3F0072"
                      paddingBtn="10px"
                      onClickBtn={() => handleOpenModalExport(product._id)}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <Avatar variant="rounded" sx={{ width: 80, height: 80 }} />
                  </TableCell>
                  <TableCell>{product.importDate}</TableCell>
                  <TableCell>{product.importNo_VatNo}</TableCell>
                  <TableCell>{product.luxasCode}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>{product.partName}</TableCell>
                  <TableCell>{product.model}</TableCell>
                  <TableCell>{product.supplies}</TableCell>
                  <TableCell>{product.suppliesAddress}</TableCell>
                  <TableCell>{product.maker}</TableCell>
                  <TableCell>{product.shCode}</TableCell>
                  <TableCell>{product.quality}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.amount}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.importTax}</TableCell>
                  <TableCell>{product.vatImport}</TableCell>
                  <TableCell>{product.feeShipping}</TableCell>
                  <TableCell>{product.costomsService}</TableCell>
                  <TableCell>{product.fines}</TableCell>
                  <TableCell>{product.totalFee}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.stockLocal}</TableCell>
                  <TableCell>{product.note}</TableCell>
                  <TableCell
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Button
                      sx={{
                        padding: "12px ",
                        background: "#fff",
                        borderRadius: " 8px",
                        marginBottom: "10px",
                        boxShadow:
                          "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                        "&:hover": {
                          background: "#1465C0",
                          color: "#fff",
                        },
                      }}
                      onClick={() => showDrawer(product._id)}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button
                      sx={{
                        padding: "12px 0",
                        background: "#fff",
                        borderRadius: " 8px",
                        boxShadow:
                          "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                        color: "#FF5630",
                        "&:hover": {
                          background: "#FF5630",
                          color: "#fff",
                        },
                      }}
                      onClick={() => handleShowModal(product._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
        <Stack sx={{ margin: "8vh 0 0 auto" }}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </Stack>
      <DrawerProductComponent
        open={openDrawer}
        setOpenDrawer={setOpenDrawer}
        idProduct={idProduct}
      />
      <AddExportProduct
        openModalExport={openModalExport}
        handleCloseModalExport={() => handleCloseModalExport()}
        idProduct={idProduct}
      />
      <DeleteModalComponent
        openModalDeLete={openModalDeLete}
        handleCloseModalDelete={() => handleCloseModal()}
        handleDelete={() => handleDeleteProduct()}
        titleDelete="Delete Product"
        alertDelete="Do you want to delete product ?"
        bgDelete="#3F0072"
      />
    </Stack>
  );
};

export default ImportProductPage;
