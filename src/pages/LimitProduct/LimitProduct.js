import { Stack, Typography } from "@mui/material";
import React, { useContext, useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Context } from "../../hook/useConText";
import Pagination from "@mui/material/Pagination";
import { useQuery } from "@tanstack/react-query";
import * as LimitProductService from "../../service/LimitProductService";
import Avatar from "@mui/material/Avatar";
import { useDebounce } from "../../hook/useDebounce";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const LimitProduct = () => {
  const { headerTableLimitName } = useContext(Context);
  const refSearch = useRef();
  const [stateLimitProduct, setStateLimitProduct] = useState([]);
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
  // const [offset, setOffset] = useState(0);

  // useEffect(() => {
  //   const onScroll = () => setOffset(window.pageYOffset);
  //   // clean up code
  //   window.removeEventListener("scroll", onScroll);
  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

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
            borderInput="1px solid #C70039"
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
              border: "1px solid #C70039",
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
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead sx={{ background: "#FFF", zIndex: "10" }}>
                <TableRow>
                  {headerTableLimitName.map((header, index) => (
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
                          color: "#C70039",
                        }}
                      >
                        {header.headerLimitName}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {stateLimitProduct?.map((product, index) => (
                <TableBody sx={{ backgroundColor: "#F2F3F5" }} key={index}>
                  <TableRow
                    sx={{
                      background:
                        product?.quantity <= 1
                          ? "#ff5050"
                          : product?.quantity === product.limitSetting
                          ? "#00E204"
                          : "#F9D801",
                    }}
                  >
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "16px",
                        borderRight: "0.1px solid #fff",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#FFF",
                        borderRight: "0.1px solid #fff",
                      }}
                    >
                      <Stack
                        sx={{ justifyContent: "center", alignItems: "center" }}
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
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.luxasCode}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.status}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.partName}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.model}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.supplies}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.suppliesAddress}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.maker}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.shCode}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.quantity}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.limitSetting}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.unit}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.price}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.amount}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.size}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.importTax}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.vatImport}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.feeShipping}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.costomsService}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.fines}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.totalFee}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.description}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.stockLocal}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "0.1px solid #fff",
                        textAlign: "center",
                      }}
                    >
                      {product?.note}
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
    </Stack>
  );
};

export default LimitProduct;
