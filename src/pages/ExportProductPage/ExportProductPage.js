import { Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

const ExportProductPage = () => {
  const { headerTableExportName } = useContext(Context);
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <Stack sx={{ padding: "35px" }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "35px",
        }}
      >
        <Typography
          sx={{ fontSize: "30px", fontWeight: "bold", color: "#004225" }}
        >
          Product ( Export )
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
          }}
        >
          <TuneIcon />
        </Stack>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          width: "1068px",
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
            <TableBody sx={{ background: "#f2f2f2" }}>
              <TableRow sx={{ minHeight: "10rem" }}>
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell>Part Name</TableCell>
                <TableCell>Part Name</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
                <TableCell>5</TableCell>
                <TableCell>6</TableCell>
                <TableCell>7</TableCell>
                <TableCell>8</TableCell>
                <TableCell>9</TableCell>
                <TableCell>10</TableCell>
                <TableCell>11</TableCell>
                <TableCell>12</TableCell>
                <TableCell sx={{ position: "relative" }}>
                  <Button
                    onClick={handleShowEdit}
                    sx={{
                      color: "#333",
                      background: "#F2F2F2",
                    }}
                  >
                    <MoreVertIcon />
                  </Button>
                  {showEdit && (
                    <Stack
                      sx={{
                        position: "absolute",
                        right: "80px",
                        border: "0.5px solid #F2F3F5",
                        overflow: "hidden",
                        bottom: "0",
                        background: "#fff",
                        borderRadius: " 8px",
                        boxShadow:
                          "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                      }}
                    >
                      <Button
                        sx={{
                          padding: "10px 20px",
                          flexDirection: "row",
                          "&:hover": {
                            background: "#EDE9F6",
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                        <Typography
                          sx={{ marginLeft: "10px", fontSize: "14px" }}
                        >
                          Edit
                        </Typography>
                      </Button>
                      <Button
                        sx={{
                          padding: "10px 20px",
                          flexDirection: "row",
                          color: "#FF5630",
                          "&:hover": {
                            background: "#EDE9F6",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                        <Typography
                          sx={{ marginLeft: "10px", fontSize: "14px" }}
                        >
                          Delete
                        </Typography>
                      </Button>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Stack sx={{ margin: "40px 0 0 auto" }}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </Stack>
  );
};

export default ExportProductPage;
