import { Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
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

const ImportProductPage = () => {
  const { headerTableImportName } = useContext(Context);
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
          sx={{ fontSize: "30px", fontWeight: "bold", color: "#3F0071" }}
        >
          Product ( Import )
        </Typography>
        <Stack sx={{ marginLeft: "auto" }}>
          <Link to="/add-import-product">
            <ButtonComponent
              iconButton={<AddIcon />}
              textButton="Add Product"
              bgButton="#3F0071"
              hoverBtn="#1465C0"
              paddingBtn="10px"
            />
          </Link>
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
                {headerTableImportName.map((header, index) => (
                  <TableCell key={index}>
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
            <TableBody sx={{ background: "#f2f2f2" }}>
              <TableRow sx={{ minHeight: "10rem" }}>
                <TableCell component="th" scope="row">
                  <Link to="/add-export-product">
                    <ButtonComponent
                      bgButton="#004225"
                      iconButton={<FileUploadIcon />}
                      textButton="Export"
                      hoverBtn="#3F0072"
                      paddingBtn="10px"
                    />
                  </Link>
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
                <TableCell>13</TableCell>
                <TableCell>14</TableCell>
                <TableCell>15</TableCell>
                <TableCell>16</TableCell>
                <TableCell>17</TableCell>
                <TableCell>18</TableCell>
                <TableCell>19</TableCell>
                <TableCell>20</TableCell>
                <TableCell>21</TableCell>
                <TableCell>22</TableCell>
                <TableCell>23</TableCell>
                <TableCell>24</TableCell>
                <TableCell>25</TableCell>
                <TableCell sx={{ position: "relative" }}>
                  <Button
                    onClick={handleShowEdit}
                    sx={{
                      color: "#333",
                      background: "#F2F2F2",
                      marginLeft: "20px",
                    }}
                  >
                    <MoreVertIcon />
                  </Button>
                  {showEdit && (
                    <Stack
                      sx={{
                        position: "absolute",
                        border: "0.5px solid #F2F3F5",
                        right: "80px",
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

export default ImportProductPage;
