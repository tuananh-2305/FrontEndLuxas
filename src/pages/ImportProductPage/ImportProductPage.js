import { Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState, useRef } from "react";
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
import TablePagination from "@mui/material/TablePagination";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Avatar from "@mui/material/Avatar";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../service/ProductService";
import AddProductComponent from "../../components/AddProductComponent/AddProductComponent";
import UpdateProductComponent from "../../components/UpdateProductComponent/UpdateProductComponent";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as message from "../../components/common/MessageComponent/MessageComponent";
import AddExportProduct from "../../components/AddExportProductComponent/AddExportProductComponent";
import DeleteModalComponent from "../../components/common/DeleteModalComponent/DeleteModalComponent";
import ShowImportDocument from "../../components/ShowImportDocument/ShowImportDocument";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useDebounce } from "../../hook/useDebounce";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
const ImportProductPage = () => {
  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: "16px",
      padding: "10px",
    },
  });
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalDeLete, setOpenModalDeLete] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [document, setDocumnent] = useState([]);
  const [importNo_VatNo, setImportNo_VatNo] = useState("");
  const [openModalExport, setOpenModalExport] = useState(false);
  const refSearch = useRef();
  const [stateProduct, setStateProduct] = useState([]);
  const [keySearch, setKeySearch] = useState("partName");
  const [search, setSearch] = useState("");
  const [valueSearch, setValueSearch] = useState([]);
  const searchDebounce = useDebounce(valueSearch, 500);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleChangeKey = (e) => {
    setKeySearch(e.target.value);
  };

  useEffect(() => {
    setValueSearch({
      search: search,
      keySearch: keySearch,
    });
  }, [search, keySearch]);

  useEffect(() => {
    if (refSearch.current) {
      getAllProduct(searchDebounce);
    }
    refSearch.current = true;
  }, [searchDebounce]);

  const handleOpenModalExport = (id) => {
    setOpenModalExport(true);
    setIdProduct(id);
  };
  const handleCloseModalExport = () => {
    setOpenModalExport(false);
  };

  const [openModalProduct, setOpenModelProduct] = useState(false);
  const handleOpenAddProduct = () => {
    setOpenModelProduct(true);
  };

  const showDrawer = (id) => {
    setOpenDrawer(true);
    setIdProduct(id);
  };

  const { headerTableImportName } = useContext(Context);

  const getAllProduct = async (keySearch, search) => {
    let res = await ProductService.getAllProduct(keySearch, search);
    if (search?.length > 0 || refSearch.current) {
      setStateProduct(res?.data);
      return [];
    } else {
      return res;
    }
  };

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });
  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProduct(products?.data);
    }
  }, [products]);

  const handleShowDocument = (document, importNo_VatNo) => {
    setDocumnent(document);
    setOpenDocument(true);
    setImportNo_VatNo(importNo_VatNo);
  };
  const handleCloseDocument = () => {
    setOpenDocument(false);
  };

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
      handleCloseModal();
      message.success("Delete Product Success");
      getAllProduct();
    } else if (dataDelete?.status === "ERR") {
      message.error(dataDelete?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDelete]);

  const handleDeleteProduct = () => {
    mutationDelete.mutate({ id: idProduct });
  };

  //pagination
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Stack
      sx={{
        position: "relative",
      }}
    >
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
            hoverBtn="#3C416F"
            paddingBtn="10px"
            onClickBtn={() => handleOpenAddProduct()}
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          padding: "30px",
          flexDirection: "row",
          alignItems: "center",
          borderTopRightRadius: "15px",
          borderTopLeftRadius: "15px",
          margin: "30px",
          background: "#F2F3F5",
        }}
      >
        <Stack sx={{ marginRight: "10px" }}>
          <InputComponent
            placeholder="Search"
            iconInput={<SearchIcon />}
            borderInput="1px solid #3F0071"
            wInput="100%"
            bgInput="#fff"
            onChangeInput={handleSearch}
            inputRef={refSearch}
          />
        </Stack>
        <Stack sx={{ width: "200px" }}>
          <Select
            displayEmpty
            value={keySearch}
            onChange={handleChangeKey}
            sx={{
              height: "50px",
              border: "1px solid #3F0072",
              textAlign: "center",
              background: "#fff",
            }}
          >
            <MenuItem value="partName">Part Name</MenuItem>
            <MenuItem value="luxasCode">Luxas Code</MenuItem>
            <MenuItem value="model">Model</MenuItem>
            <MenuItem value="shCode">SH Code</MenuItem>
            <MenuItem value="importNo_VatNo">Import N.0 / Vat N.0</MenuItem>
          </Select>
        </Stack>
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
      <Stack sx={{ position: "relative" }}>
        <Stack
          sx={{
            position: "absolute",
            width: "100%",
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
                        textAlign: "center",
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
              {stateProduct?.map((product, index) => (
                <TableBody sx={{ backgroundColor: "#F2F3F5" }} key={index}>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ borderRight: "0.1px solid #333" }}
                    >
                      <Stack
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {product?.quantity === 0 ? (
                          <CustomWidthTooltip
                            title="The quantity of product is 0"
                            placement="top"
                            followCursor
                            sx={{ padding: "10px", fontSize: "15px" }}
                          >
                            <Stack
                              sx={{
                                flexDirection: "row",
                                background: "#E94738",
                                color: "#FFF",
                                padding: "10px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                alignItems: "center",
                              }}
                            >
                              <FileUploadIcon fontSize="small" />
                              <Typography sx={{ marginLeft: "5px" }}>
                                Export
                              </Typography>
                            </Stack>
                          </CustomWidthTooltip>
                        ) : (
                          <ButtonComponent
                            fontSizeBtn="15px"
                            bgButton="#004225"
                            iconButton={<FileUploadIcon fontSize="small" />}
                            textButton="Export"
                            hoverBtn="#3F0072"
                            paddingBtn="10px"
                            onClickBtn={() =>
                              handleOpenModalExport(product._id)
                            }
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell
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
                      }}
                    >
                      <Stack
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: 80,
                            height: 80,
                            boxShadow:
                              "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                          }}
                          src={
                            product?.image
                              ? `${process.env.REACT_APP_UPLOAD_URL}/images/products/${product?.image}`
                              : null
                          }
                        />
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.importDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.importNo_VatNo}
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
                      {product?.status}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.partName}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.model}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.supplies}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.suppliesAddress}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.maker}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.shCode}
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
                      {product?.limitSetting}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.unit}
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
                      {product?.size}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.importTax}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.vatImport}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.feeShipping}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.costomsService}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.fines}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.productFee}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.totalFee}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.description}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.stockLocal}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      {product?.note}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #333",
                        textAlign: "center",
                      }}
                    >
                      <Button
                        sx={{
                          background: "#1465C0",
                          color: "#fff",
                          borderRadius: " 5px",
                          textTransform: "capitalize",
                          boxShadow:
                            "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                          "&:hover": {
                            background: "#3E006E",
                            color: "#fff",
                          },
                        }}
                        onClick={() =>
                          handleShowDocument(
                            product.document,
                            product.importNo_VatNo
                          )
                        }
                      >
                        Show
                      </Button>
                    </TableCell>
                    <TableCell
                      sx={{ justifiContent: "center", alignItems: "center" }}
                    >
                      <Stack sx={{ padding: "0 20px" }}>
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
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
          <Stack sx={{ margin: "8vh 0 0 auto" }}>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </Stack>
      </Stack>
      <AddProductComponent
        openModalProduct={openModalProduct}
        setOpenModelProduct={setOpenModelProduct}
        getAllProduct={() => getAllProduct()}
      />
      <UpdateProductComponent
        open={openDrawer}
        setOpenDrawer={setOpenDrawer}
        idProduct={idProduct}
        getAllProduct={() => getAllProduct()}
      />
      <AddExportProduct
        openModalExport={openModalExport}
        handleCloseModalExport={() => handleCloseModalExport()}
        idProduct={idProduct}
      />
      <ShowImportDocument
        importNo_VatNo={importNo_VatNo}
        openModal={openDocument}
        handleCloseModal={() => handleCloseDocument()}
        document={document}
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
