import { Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
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

const ExportProductPage = () => {
  const { headerTableExportName } = useContext(Context);
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
          borderInput=".1px solid #333"
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
                  <TableCell key={index}>
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
              <TableBody sx={{ background: "#f2f2f2" }} key={index}>
                <TableRow sx={{ minHeight: "10rem" }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{product?.implementer}</TableCell>
                  <TableCell>{product?.image}</TableCell>
                  <TableCell>{product?.createdAt}</TableCell>
                  <TableCell>{product?.luxasCode}</TableCell>
                  <TableCell>{product?.saleForCompany}</TableCell>
                  <TableCell>{product?.quality}</TableCell>
                  <TableCell>{product?.price}</TableCell>
                  <TableCell>{product?.amount}</TableCell>
                  <TableCell>{product?.customerSevice}</TableCell>
                  <TableCell>{product?.vat}</TableCell>
                  <TableCell>{product?.shippingFee}</TableCell>
                  <TableCell>{product?.commission}</TableCell>
                  <TableCell>{product?.feesIncurred}</TableCell>
                  <TableCell>{product?.profit}</TableCell>
                  <TableCell>{product?.note}</TableCell>
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
    </Stack>
  );
};

export default ExportProductPage;
