import { Stack, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import * as ExportProductService from "../../service/ExportProductService";
import DeleteModalComponent from "../../components/common/DeleteModalComponent/DeleteModalComponent";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as message from "../../components/common/MessageComponent/MessageComponent";
import Avatar from "@mui/material/Avatar";
import UpdateExportProductComponent from "../../components/UpdateExportProductComponent/UpdateExportProductComponent";
import ShowExportDocument from "../../components/ShowExportDocument/ShowExportDocument";
import { useDebounce } from "../../hook/useDebounce";
import { Select } from "antd";
import TableComponent from "../../components/common/TableComponent/TableComponent";
import * as ProductService from "../../service/ProductService";

const ExportProductPage = () => {
  const [idProduct, setIdProduct] = useState("");
  const [luxasCode, setLuxasCode] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);
  const [document, setDocumnent] = useState([]);
  const [exportCode, setExportCode] = useState("");
  const refSearch = useRef();
  const [keySearch, setKeySearch] = useState("partName");
  const [search, setSearch] = useState("");
  const [stateExportProduct, setStateExportProduct] = useState([]);
  const [valueSearch, setValueSearch] = useState([]);
  const searchDebounce = useDebounce(valueSearch, 500);

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
    });
  }, [search, keySearch]);

  useEffect(() => {
    if (refSearch.current) {
      getAllExportProduct(searchDebounce);
    }
    refSearch.current = true;
  }, [searchDebounce]);

  const showUpdateExport = (id, luxasCode) => {
    setOpenUpdate(true);
    setIdProduct(id);
    setLuxasCode(luxasCode);
  };
  const handleShowDocument = (document, exportCode) => {
    setDocumnent(document);
    setOpenDocument(true);
    setExportCode(exportCode);
  };
  const handleCloseDocument = () => {
    setOpenDocument(false);
  };

  const getAllExportProduct = async (search) => {
    const res = await ExportProductService.getAllExportProduct(search);
    if (search?.length > 0 || refSearch.current) {
      setStateExportProduct(res?.data);
      return [];
    } else {
      return res;
    }
  };

  const { data: exportProducts } = useQuery({
    queryKey: ["exportProducts"],
    queryFn: getAllExportProduct,
  });

  useEffect(() => {
    if (exportProducts?.data?.length > 0) {
      setStateExportProduct(exportProducts?.data);
    }
  }, [exportProducts]);
  const [importProduct, setImportProduct] = useState({
    _id: "",
    price: 0,
    quantity: 0,
    importTax: 0,
    vatImport: 0,
    feeShipping: 0,
    costomsService: 0,
    fines: 0,
  });
  const [newDataImport, setNewDataImport] = useState({
    quantity: 0,
    amount: 0,
    costImportUnit: 0,
    costImportTax: 0,
    totalFeeVat: 0,
  });
  const [qtyExportProduct, setQtyExportProduct] = useState(0);
  const fetchGetExportProduct = async (idProduct) => {
    const res = await ExportProductService.getDetailsExportProduct(idProduct);
    if (res?.data) {
      setQtyExportProduct(res?.data.quantity);
    }
  };
  const fetchGetImportProduct = async (luxasCode) => {
    const res = await ProductService.getDetailsProductByCode(luxasCode);
    if (res?.data) {
      setImportProduct({
        _id: res?.data._id,
        price: res?.data.price,
        quantity: res?.data.quantity,
        importTax: res?.data.importTax,
        vatImport: res?.data.vatImport,
        feeShipping: res?.data.feeShipping,
        costomsService: res?.data.costomsService,
        fines: res?.data.fines,
      });
    }
  };
  const [idExportProduct, setIdExportProduct] = useState("");
  const [openModalDeLete, setOpenModalDeLete] = useState(false);

  const handleOpenModal = (id, luxasCode) => {
    if (luxasCode) {
      fetchGetImportProduct(luxasCode);
    }
    if (id) {
      fetchGetExportProduct(id);
    }
    setOpenModalDeLete(true);
    setIdExportProduct(id);
  };
  const handleCloseModal = () => {
    setOpenModalDeLete(false);
    setIdExportProduct("");
  };
  useEffect(() => {
    if (importProduct.price && newDataImport.quantity) {
      const amountImport =
        Number(newDataImport.quantity) * Number(importProduct.price);
      newDataImport.amount = amountImport.toFixed(2);
    }
    if (
      importProduct.price &&
      newDataImport.quantity &&
      importProduct.importTax &&
      importProduct.feeShipping &&
      importProduct.costomsService &&
      importProduct.fines
    ) {
      const newCostImport =
        Number(newDataImport.quantity) * Number(importProduct.price) +
        Number(importProduct.feeShipping) +
        Number(importProduct.costomsService) +
        Number(importProduct.fines);
      const newCostImportTax =
        Number(newCostImport) +
        (Number(newCostImport) * Number(importProduct.importTax)) / 100;
      const newCostImportUnit =
        Number(newCostImportTax) / newDataImport.quantity;
      newDataImport.costImportTax = newCostImportTax.toFixed(2);
      newDataImport.costImportUnit = newCostImportUnit.toFixed(2);
    }
    if (
      importProduct.price &&
      newDataImport.quantity &&
      importProduct.importTax &&
      importProduct.feeShipping &&
      importProduct.costomsService &&
      importProduct.fines &&
      importProduct.vatImport
    ) {
      const newCostImport =
        Number(newDataImport.quantity) * Number(importProduct.price) +
        Number(importProduct.feeShipping) +
        Number(importProduct.costomsService) +
        Number(importProduct.fines);
      const newCostImportTax =
        Number(newCostImport) +
        (Number(newCostImport) * Number(importProduct.importTax)) / 100;
      const newTotalFeeVat =
        Number(newCostImportTax) +
        (Number(newCostImportTax) * Number(importProduct.vatImport)) / 100;
      newDataImport.totalFeeVat = newTotalFeeVat.toFixed(2);
    }
  }, [importProduct, newDataImport]);

  const mutationDelete = useMutationHooks((data) => {
    const { id } = data;
    const res = ExportProductService.deleteExportProduct(id);
    return res;
  });
  const { data: dataDelete } = mutationDelete;

  const mutationUpdateImport = useMutationHooks((data) => {
    const { id, ...rest } = data;
    const res = ProductService.updateProduct(id, { ...rest });
    return res;
  });
  const handleUpDateImportProduct = () => {
    const formData = new FormData();

    for (const key in newDataImport) {
      const value = newDataImport[key];
      formData.append(key, value);
    }
    mutationUpdateImport.mutate({
      id: importProduct?._id,
      formData,
    });
  };
  useEffect(() => {
    if (dataDelete?.status === "OK") {
      handleUpDateImportProduct();
      handleCloseModal();
      message.success("Delete Product Success");
      getAllExportProduct();
    } else if (dataDelete?.status === "ERR") {
      message.error(dataDelete?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDelete]);

  const handleDeleteExportProduct = () => {
    if (qtyExportProduct && importProduct.quantity) {
      setNewDataImport({
        ...newDataImport,
        quantity: Number(qtyExportProduct) + Number(importProduct.quantity),
      });
    }
    mutationDelete.mutate({ id: idExportProduct });
  };

  const dataTable =
    stateExportProduct?.length &&
    stateExportProduct?.map((product) => {
      return { ...product, key: product._id };
    });
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (text, object, index) => {
        return index + 1;
      },
    },
    {
      title: "Implementer",
      dataIndex: "implementer",
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
      title: "Export Date",
      dataIndex: "exportDate",
    },
    {
      title: "Export Code",
      dataIndex: "exportCode",
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
      title: "Luxas Code",
      dataIndex: "luxasCode",
    },
    {
      title: "SH Code",
      dataIndex: "shCode",
    },
    {
      title: "Sales for copany Name",
      dataIndex: "saleForCompany",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
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
      title: "Customer sevice",
      dataIndex: "customerSevice",
    },
    {
      title: "Vat %",
      dataIndex: "vat",
    },
    {
      title: "Shipping fee",
      dataIndex: "shippingFee",
    },
    {
      title: "Commission",
      dataIndex: "commission",
    },
    {
      title: "Fees incurred (if any)",
      dataIndex: "feesIncurred",
    },
    {
      title: "Cost Import /Unit",
      dataIndex: "costImportUnit",
    },
    {
      title: "Total Sale Price/Unit",
      dataIndex: "salePriceUnit",
    },
    {
      title: "Total Export Fee",
      dataIndex: "totalExportFee",
    },
    {
      title: "Export Fee Vat",
      dataIndex: "exportFeeVat",
    },
    {
      title: "Profit",
      dataIndex: "profit",
    },
    {
      title: "Profit No Vat",
      dataIndex: "profitNoVat",
    },
    {
      title: "Note",
      dataIndex: "note",
    },
    {
      title: "Document",
      dataIndex: "document",
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
            handleShowDocument(record?.document, record?.exportCode)
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
            onClick={() => showUpdateExport(record?._id, record?.luxasCode)}
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
            onClick={() => handleOpenModal(record._id, record?.luxasCode)}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Stack>
      ),
    },
  ];

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
              width: 125,
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
                value: "exportCode",
                label: "Export Code",
              },
            ]}
          />
        </Stack>
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
            dataDefault={stateExportProduct}
            typePage="export"
          />
        </Stack>
        <ShowExportDocument
          openModal={openDocument}
          handleCloseModal={() => handleCloseDocument()}
          document={document}
          exportCode={exportCode}
        />
        <UpdateExportProductComponent
          luxasCode={luxasCode}
          open={openUpdate}
          setOpenDrawer={setOpenUpdate}
          idProduct={idProduct}
          getAllExportProduct={() => getAllExportProduct()}
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
