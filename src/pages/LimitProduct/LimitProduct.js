import { Stack, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import { useQuery } from "@tanstack/react-query";
import * as LimitProductService from "../../service/LimitProductService";
import Avatar from "@mui/material/Avatar";
import { useDebounce } from "../../hook/useDebounce";
import { Select } from "antd";
import TableComponent from "../../components/common/TableComponent/TableComponent";

const LimitProduct = () => {
  const refSearch = useRef();
  const [stateLimitProduct, setStateLimitProduct] = useState([]);
  const [keySearch, setKeySearch] = useState("partName");
  const [search, setSearch] = useState("");
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
      getAllLimitProduct(searchDebounce);
    }
    refSearch.current = true;
  }, [searchDebounce]);

  const getAllLimitProduct = async (search) => {
    let res = await LimitProductService.getAllLimitProduct(search);
    if (search?.length > 0 || refSearch.current) {
      setStateLimitProduct(res?.data);
      return [];
    } else {
      return res;
    }
  };

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getAllLimitProduct,
  });

  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateLimitProduct(products?.data);
    }
  }, [products]);
  const dataTable =
    stateLimitProduct?.length &&
    stateLimitProduct?.map((product) => {
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
      title: "Cost Import /Unit",
      dataIndex: "costImportUnit",
    },
    {
      title: "Total Fee",
      dataIndex: "totalFee",
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
          sx={{ fontSize: "30px", fontWeight: "bold", color: "#C70039" }}
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
          Limit
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
          sx={{
            marginLeft: "auto",
            padding: "5px",
            borderRadius: "5px",
            background: "#C70039",
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
            rowClassName={(record, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            }
            data={dataTable}
            columns={columns}
            dataDefault={stateLimitProduct}
            typePage="limit"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LimitProduct;
