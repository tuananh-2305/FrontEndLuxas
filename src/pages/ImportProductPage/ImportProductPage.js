import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ButtonComponent from "../../components/common/ButtonComponent/ButtonComponent";
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
import { Select } from "antd";
import SelectMui from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import TableComponent from "../../components/common/TableComponent/TableComponent";
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
  const [totalPage, setTotalPage] = useState(0);
  const [limitTable, setLimitTable] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const startYear = selectedYear - 5;
  const endYear = selectedYear + 5;

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const yearOptions = [];
  for (let year = startYear; year <= endYear; year++) {
    yearOptions.push(
      <MenuItem key={year} value={year}>
        {year}
      </MenuItem>
    );
  }
  const [startDateMonth, setStartDateMonth] = useState([]);
  const [endDateMonth, setEndDateMonth] = useState([]);
  useEffect(() => {
    if (selectedYear) {
      const monthStartDates = [];
      const monthEndDates = [];

      for (let month = 0; month < 12; month++) {
        const startDate = new Date(selectedYear, month, 1);
        const endDate = new Date(selectedYear, month + 1, 0);

        monthStartDates.push(startDate);
        monthEndDates.push(endDate);
      }
      setStartDateMonth(monthStartDates);
      setEndDateMonth(monthEndDates);
    }
  }, [selectedYear]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };
  const monthOptions = [];
  for (let month = 0; month <= monthNames.length; month++) {
    monthOptions.push(
      <MenuItem key={month} value={month}>
        {monthNames[month]}
      </MenuItem>
    );
  }

  //filter by month
  const [anchorEl, setAnchorEl] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [placement, setPlacement] = useState();

  const handleOpenFilter = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenFilter((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleClickFilter = () => {
    getAllProduct({
      startDate: startDateMonth[selectedMonth],
      endDate: endDateMonth[selectedMonth],
    });
  };
  //
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleChangeKey = (value) => {
    setKeySearch(value);
  };
  useEffect(() => {
    setValueSearch({
      search: search,
      keySearch: keySearch,
      limit: limitTable,
      currentPage: currentPage,
    });
  }, [search, keySearch, limitTable, currentPage]);

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

  const getAllProduct = async (
    keySearch,
    search,
    limitTable,
    currentPage,
    startDate,
    endDate
  ) => {
    let res = await ProductService.getAllProduct(
      keySearch,
      search,
      limitTable,
      currentPage,
      startDate,
      endDate
    );
    console.log(res);
    setTotalPage(res?.totalPage);
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

  const onChangeTable = (pagination, filters, sorter, extra) => {
    if (pagination) {
      setCurrentPage(pagination?.current);
    }
  };

  const dataTable =
    stateProduct?.length &&
    stateProduct?.map((product) => {
      return { ...product, key: product._id };
    });

  const columns = [
    {
      title: "",
      dataIndex: "",
      render: (text, record) => (
        <>
          {record?.quantity === 0 ? (
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
                  padding: "7px  10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <FileUploadIcon fontSize="small" />
                <Typography sx={{ marginLeft: "5px", fontSize: "15px" }}>
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
              paddingBtn="7px 10px"
              onClickBtn={() => handleOpenModalExport(record._id)}
            />
          )}
        </>
      ),
    },
    {
      title: "STT",
      dataIndex: "stt",
      render: (text, object, index) => {
        return index + 1;
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (record) => (
        <Avatar
          variant="rounded"
          sx={{
            width: 80,
            height: 80,
            boxShadow:
              "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
          src={
            record
              ? `${process.env.REACT_APP_UPLOAD_URL}/products/images/${record}`
              : null
          }
        />
      ),
    },
    {
      title: "Import Date",
      dataIndex: "importDate",
    },
    {
      title: "ImportNo_VatNo",
      dataIndex: "importNo_VatNo",
    },
    {
      title: "Luxas Code",
      dataIndex: "luxasCode",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Part Name",
      dataIndex: "partName",
      sorter: (a, b) => a.partName.length - b.partName.length,
    },
    {
      title: "Model",
      dataIndex: "model",
    },
    {
      title: "Supplies",
      dataIndex: "supplies",
    },
    {
      title: "Supplies Address",
      dataIndex: "suppliesAddress",
    },
    {
      title: "Maker",
      dataIndex: "maker",
    },
    {
      title: "ShCode",
      dataIndex: "shCode",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Limit Setting",
      dataIndex: "limitSetting",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Size",
      dataIndex: "size",
    },
    {
      title: "Import Tax",
      dataIndex: "importTax",
    },
    {
      title: "Vat Import",
      dataIndex: "vatImport",
    },
    {
      title: "Fee Shipping",
      dataIndex: "feeShipping",
    },
    {
      title: "Costoms Service",
      dataIndex: "costomsService",
    },
    {
      title: "Fines",
      dataIndex: "fines",
    },
    {
      title: "Cost Import / Unit",
      dataIndex: "costImportUnit",
    },
    {
      title: "Cost Import Tax",
      dataIndex: "costImportTax",
    },
    {
      title: "Total Fee Vat",
      dataIndex: "totalFeeVat",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Stock Local",
      dataIndex: "stockLocal",
    },
    {
      title: "Note",
      dataIndex: "note",
    },
    {
      title: "Document",
      dataIndex: "",
      render: (text, record) => (
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
            handleShowDocument(record.document, record.importNo_VatNo)
          }
        >
          Show
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "",
      render: (record) => (
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
            onClick={() => showDrawer(record._id)}
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
            onClick={() => handleShowModal(record._id)}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Stack>
      ),
    },
  ];
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
            borderInput="1px solid #d9d9d9"
            wInput="100%"
            bgInput="#fff"
            onChangeInput={handleSearch}
            inputRef={refSearch}
          />
        </Stack>
        <Stack>
          <Select
            defaultValue={keySearch}
            style={{
              width: 150,
              height: 50,
            }}
            onChange={handleChangeKey}
            options={[
              {
                value: "partName",
                label: "Part Name",
              },
              {
                value: "luxasCode",
                label: "Luxas Code",
              },
              {
                value: "model",
                label: "Model",
              },
              {
                value: "shCode",
                label: "SH Code",
              },
              {
                value: "importNo_VatNo",
                label: "Import N.0 / Vat N.0",
              },
            ]}
          />
        </Stack>
        <Stack
          onClick={handleOpenFilter("bottom-end")}
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
        <Popper
          sx={{ zIndex: 5 }}
          open={openFilter}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "10px",
                  marginRight: "auto",
                  background: "#FFFFFF",
                  padding: "15px",
                  border: "1px solid #b3b3b3",
                  borderRadius: "5px",
                }}
              >
                <SelectMui
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  sx={{ height: "40px" }}
                >
                  {monthOptions}
                </SelectMui>
                <SelectMui
                  value={selectedYear}
                  onChange={handleYearChange}
                  sx={{ height: "40px", marginLeft: "5px" }}
                >
                  {yearOptions}
                </SelectMui>
                <Typography
                  sx={{
                    padding: "8px",
                    background: "#1465C0",
                    borderRadius: "5px",
                    fontSize: "14px",
                    color: "#fff",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  onClick={handleClickFilter}
                >
                  Ok
                </Typography>
              </Stack>
            </Fade>
          )}
        </Popper>
      </Stack>
      <Stack sx={{ position: "relative" }}>
        <Stack
          sx={{
            position: "absolute",
            width: "100%",
            padding: "0 30px 50px",
          }}
        >
          <TableComponent
            data={dataTable}
            columns={columns}
            dataDefault={stateProduct}
            onChange={onChangeTable}
            totalPage={totalPage}
            pageSize={limitTable}
            currentPage={currentPage}
            typePage="import"
          />
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
