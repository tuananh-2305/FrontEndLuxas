import { Stack, Typography, InputBase } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import Image from "mui-image";
import imgbg from "../../assets/images/bglogin.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import ButtonComponent from "../../components/common/ButtonComponent/ButtonComponent";
import ClearIcon from "@mui/icons-material/Clear";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as ProductService from "../../service/ProductService";
import * as ExportProductService from "../../service/ExportProductService";
import * as message from "../../components/common/MessageComponent/MessageComponent";
import ModalComponent from "../../components/common/ModalComponent/ModalComponent";
import { useSelector } from "react-redux";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const AddExportProduct = (props) => {
  const initial = () => ({
    implementer: "",
    luxasCode: "",
    partName: "",
    model: "",
    shCode: "",
    image: "1",
    saleForCompany: "",
    quality: "",
    unit: "",
    price: "",
    amount: "",
    customerSevice: "",
    vat: "",
    shippingFee: "",
    commission: "",
    feesIncurred: "",
    profit: "",
    note: "",
  });
  const { openModalExport, handleCloseModalExport, idProduct } = props;

  const user = useSelector((state) => state.user);
  const [stateExportProduct, setStateExportProduct] = useState(initial());
  const fetchGetDetailsProduct = async (idProduct) => {
    const res = await ProductService.getDetailsProduct(idProduct);
    if (res?.data) {
      setStateExportProduct({
        implementer: user?.name,
        luxasCode: res?.data.luxasCode,
        partName: res?.data.partName,
        model: res?.data.model,
        shCode: res?.data.shCode,
        image: "1",
        saleForCompany: "",
        quality: res?.data.quality,
        unit: res?.data.unit,
        price: "",
        amount: "",
        customerSevice: "",
        vat: "",
        shippingFee: "",
        commission: "",
        feesIncurred: "",
        profit: "",
        note: "",
      });
      setQualityProduct(res?.data.quality);
    }
  };
  useEffect(() => {
    if (idProduct && openModalExport) {
      fetchGetDetailsProduct(idProduct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProduct, openModalExport]);
  const [qualityProduct, setQualityProduct] = useState("");
  const handleOnChange = (e) => {
    setStateExportProduct({
      ...stateExportProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeQty = (e) => {
    setQualityProduct(e.target.value);
    setStateExportProduct({
      ...stateExportProduct,
      quality: e.target.value,
    });
  };

  const incrementQty = () => {
    if (Number(qualityProduct) >= stateExportProduct.quality) {
      setQualityProduct(stateExportProduct.quality);
    } else {
      setQualityProduct((prev) => prev + 1);
    }
  };
  const decrementQty = () => {
    if (Number(qualityProduct) <= 1) {
      setQualityProduct("1");
    } else {
      setQualityProduct((prev) => prev - 1);
    }
  };

  const mutation = useMutationHooks((data) => {
    const {
      implementer,
      luxasCode,
      image,
      saleForCompany,
      quality,
      unit,
      price,
      amount,
      customerSevice,
      vat,
      shippingFee,
      commission,
      feesIncurred,
      profit,
      note,
    } = data;
    const res = ExportProductService.exportProduct({
      implementer,
      luxasCode,
      image,
      saleForCompany,
      quality,
      unit,
      price,
      amount,
      customerSevice,
      vat,
      shippingFee,
      commission,
      feesIncurred,
      profit,
      note,
    });
    return res;
  });

  const { data } = mutation;

  useEffect(() => {
    if (data?.status === "OK") {
      message.success("Export Product Success");
      handleCloseModalExport();
    } else if (data?.status === "ERR") {
      message.error(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleExportProduct = () => {
    mutation.mutate(stateExportProduct);
    console.log(stateExportProduct);
  };
  return (
    <ModalComponent isOpen={openModalExport} onClose={handleCloseModalExport}>
      <Stack
        sx={{
          position: "absolute",
          background: "#fff",
          width: "60%",
          height: "80%",
          overflow: "hidden",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
        }}
      >
        <Stack
          sx={{
            margin: "30px 30px 20px auto",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              marginRight: "20px",
              cursor: "pointer",
              padding: "5px",
              borderRadius: "5px",
              background: "#F2F3F5",
              zIndex: "1",
              "&:hover": {
                background: "#3F0073",
                color: "#fff",
              },
            }}
            onClick={() => handleCloseModalExport()}
          >
            <ClearIcon />
          </Stack>
          <Stack>
            <ButtonComponent
              textButton="Export Product"
              bgButton="#004225"
              hoverBtn="#1465C0"
              paddingBtn="5px 15px"
              onClickBtn={() => handleExportProduct()}
            />
          </Stack>
        </Stack>
        <Stack sx={{ position: "relative", overflow: "scroll" }}>
          <Stack sx={{ padding: "10px 30px  0" }}>
            <Grid container spacing={3}>
              <Grid xs={3}>
                <Stack
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "40px",
                  }}
                >
                  <Stack
                    sx={{
                      height: "130px",
                      width: "130px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "5px solid #004225",
                      boxShadow:
                        "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <Image src={imgbg} />
                  </Stack>
                </Stack>
              </Grid>
              <Grid xs={9}>
                <Stack>
                  <Grid container spacing={3}>
                    <Grid xs={8}>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          marginBottom: "8px",
                        }}
                      >
                        Sale For Company:
                      </Typography>
                      <InputComponent
                        vInput={stateExportProduct.type}
                        onChangeInput={handleOnChange}
                        nameInput="saleForCompany"
                        placeholder="Sale For Company ..."
                        bgInput="#fff"
                        borderInput="1px solid #004225"
                      />
                    </Grid>
                    <Grid xs={4}>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          marginBottom: "8px",
                        }}
                      >
                        Luxas Code:
                      </Typography>
                      <InputComponent
                        vInput={stateExportProduct?.luxasCode}
                        nameInput="luxasCode"
                        placeholder="Luxas Code ..."
                        bgInput="#fff"
                        borderInput="1px solid #004225"
                      />
                    </Grid>
                    <Grid xs={8}>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          marginBottom: "8px",
                        }}
                      >
                        Implementer:
                      </Typography>
                      <InputComponent
                        vInput={user?.name}
                        nameInput="implementer"
                        placeholder="Implementer ..."
                        bgInput="#fff"
                        borderInput="1px solid #004225"
                      />
                    </Grid>
                    <Grid xs={4}>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          marginBottom: "8px",
                        }}
                      >
                        Part Name:
                      </Typography>
                      <InputComponent
                        vInput={stateExportProduct?.partName}
                        nameInput="partName"
                        placeholder="Part Name ..."
                        bgInput="#fff"
                        borderInput="1px solid #004225"
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
          <Stack sx={{ padding: "20px 30px 30px" }}>
            <Grid container spacing={3}>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Model:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct?.model}
                  nameInput="model"
                  placeholder="Model ..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  SH Code:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.shCode}
                  nameInput="shCode"
                  placeholder="SH Code ..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Quailty:
                </Typography>
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <InputBase
                    value={qualityProduct}
                    onChange={handleOnChangeQty}
                    alt=""
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      padding: "8px 15px",
                      border: "1px solid #004225",
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                    }}
                  />
                  <Stack sx={{ flexDirection: "column" }}>
                    <Stack
                      onClick={() => incrementQty()}
                      sx={{
                        padding: "0 8px",
                        borderTopRightRadius: "5px",
                        cursor: "pointer",
                        background: "#004225",
                        color: "#fff",
                        border: "0.5px solid #004225",
                      }}
                    >
                      <ArrowDropUpIcon />
                    </Stack>
                    <Stack
                      sx={{
                        background: "#fff",
                        height: "0.6px",
                        width: "100%",
                      }}
                    ></Stack>
                    <Stack
                      onClick={() => decrementQty()}
                      sx={{
                        padding: "0 8px",
                        borderBottomRightRadius: "5px",
                        cursor: "pointer",
                        background: "#004225",
                        color: "#fff",
                        border: "0.5px solid #004225",
                      }}
                    >
                      <ArrowDropDownIcon />
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Unit:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct?.unit}
                  nameInput="unit"
                  placeholder="Unit ..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Price:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="price"
                  placeholder="Price ..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Amount:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="amount"
                  placeholder="Amount ..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Customer Sevice:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="customerSevice"
                  placeholder="Customer Sevice ..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Vat:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="vat"
                  placeholder="Vat ..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Shipping Fee:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="shippingFee"
                  placeholder="Shipping Fee ..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Commission:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="commission"
                  placeholder="Commission..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Fees Incurred:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="feesIncurred"
                  placeholder="Fees Incurred ..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
              <Grid xs={3}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Profit:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="profit"
                  placeholder="Profit..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
              <Grid xs={12}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Note:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="note"
                  placeholder="Note  ..."
                  bgInput="#fff"
                  borderInput="1px solid #004225"
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    </ModalComponent>
  );
};

export default AddExportProduct;
