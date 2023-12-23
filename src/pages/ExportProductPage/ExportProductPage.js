import { Stack, Typography } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputComponent from "../../components/common/InputComponent/InputComponent";
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
import Pagination from "@mui/material/Pagination";
import { useQuery } from "@tanstack/react-query";
import * as ExportProductService from "../../service/ExportProductService";
import DeleteModalComponent from "../../components/common/DeleteModalComponent/DeleteModalComponent";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as message from "../../components/common/MessageComponent/MessageComponent";
import Avatar from "@mui/material/Avatar";
import UpdateExportProductComponent from "../../components/UpdateExportProductComponent/UpdateExportProductComponent";

const ExportProductPage = () => {
  const { headerTableExportName } = useContext(Context);

  const [idProduct, setIdProduct] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);

  const showUpdateExport = (id) => {
    setOpenUpdate(true);
    setIdProduct(id);
  };
  const getAllExportProduct = async () => {
    const res = await ExportProductService.getAllExportProduct();
    return res.data;
  };

  const { data: exportProducts } = useQuery({
    queryKey: ["exportProducts"],
    queryFn: () => getAllExportProduct(),
  });

  // const convertDateTime = (date) => {
  //   var now = new Date(date);
  //   var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  //   return utc;
  // };

  const [idExportProduct, setIdExportProduct] = useState("");
  const [openModalDeLete, setOpenModalDeLete] = useState(false);

  const handleOpenModal = (id) => {
    setOpenModalDeLete(true);
    setIdExportProduct(id);
  };
  const handleCloseModal = () => {
    setOpenModalDeLete(false);
    setIdExportProduct("");
  };

  const mutationDelete = useMutationHooks((data) => {
    const { id } = data;
    const res = ExportProductService.deleteExportProduct(id);
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

  const handleDeleteExportProduct = () => {
    mutationDelete.mutate({ id: idExportProduct });
  };

  return (
    <Stack sx={{ position: "relative" }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          margin: "30px",
        }}
      >
        <Typography
          sx={{ fontSize: "30px", fontWeight: "bold", color: "#004225" }}
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
          Export
        </Typography>
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
          borderInput="1px solid #004225"
          wInput="30%"
          bgInput="#fff"
        />
        <Stack
          sx={{
            marginLeft: "auto",
            padding: "5px",
            borderRadius: "5px",
            background: "#004225",
            color: "#FFF",
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
                {headerTableExportName.map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        width: header.wHeader,
                        fontWeight: "bold",
                        color: "#004225",
                      }}
                    >
                      {header.headerExportName}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {exportProducts?.map((product, index) => (
              <TableBody
                sx={{
                  background: "#f2f2f2",
                }}
                key={index}
              >
                <TableRow sx={{ minHeight: "10rem" }}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "red",
                      fontSize: "16px",
                      borderRight: "0.1px solid #333",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.implementer}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                    }}
                  >
                    <Stack
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Avatar
                        variant="rounded"
                        sx={{ width: 80, height: 80 }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.createdAt}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.luxasCode}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.saleForCompany}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.quantity}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.price}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.amount}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.customerSevice}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.vat}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.shippingFee}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.commission}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.feesIncurred}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.profit}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "0.1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {product?.note}
                  </TableCell>
                  <TableCell>
                    <Stack
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
                        onClick={() => showUpdateExport(product._id)}
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
                        onClick={() => handleOpenModal(product._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
        <Stack sx={{ margin: "8vh 0 0 auto" }}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
        <UpdateExportProductComponent
          open={openUpdate}
          setOpenDrawer={setOpenUpdate}
          idProduct={idProduct}
        />
        <DeleteModalComponent
          openModalDeLete={openModalDeLete}
          handleCloseModalDelete={() => handleCloseModal()}
          handleDelete={() => handleDeleteExportProduct()}
          titleDelete="Delete Product"
          alertDelete="Do you want to delete product ?"
          bgDelete="#3F0072"
        />
      </Stack>
    </Stack>
  );
};

export default ExportProductPage;
