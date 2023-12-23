import { Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputComponent from "../common/InputComponent/InputComponent";
import Image from "mui-image";
import imgbg from "../../assets/images/bglogin.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import ButtonComponent from "../common/ButtonComponent/ButtonComponent";
import ClearIcon from "@mui/icons-material/Clear";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as ProductService from "../../service/ProductService";
import * as ExportProductService from "../../service/ExportProductService";
import * as message from "../common/MessageComponent/MessageComponent";
import ModalComponent from "../common/ModalComponent/ModalComponent";
import { useSelector } from "react-redux";
import InputNumberComponent from "../common/InputNumberComponent/InputNumberComponent";

const AddExportProductComponent = (props) => {
  const initial = () => ({
    implementer: "",
    luxasCode: "",
    partName: "",
    model: "",
    shCode: "",
    image: "1",
    saleForCompany: "",
    quantity: "",
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
  const [productDetails, setProductDetails] = useState({
    quantity: "",
  });

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
        quantity: res?.data.quantity,
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
      setProductDetails({
        quantity: res?.data.quantity,
      });
      setQuantityProduct(res?.data.quantity);
    }
  };
  useEffect(() => {
    if (idProduct && openModalExport) {
      fetchGetDetailsProduct(idProduct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProduct, openModalExport]);
  const [quantityProduct, setQuantityProduct] = useState("");
  const [valueNumberInput, setValueNumberInput] = useState();
  const [valueInputOnChage, setValueInputOnChage] = useState();
  const handleOnChange = (e) => {
    setStateExportProduct({
      ...stateExportProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeQty = (event, val) => {
    setValueInputOnChage(event.target.value ? event.target.value : val);
    setValueNumberInput(val ? val : event.target.value);
    setStateExportProduct({
      ...stateExportProduct,
      quantity: val ? val : event.target.value,
    });
    setProductDetails({
      ...productDetails,
      quantity:
        Number(productDetails.quantity) -
        Number(val ? val : event.target.value),
    });
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rest } = data;
    const res = ProductService.updateProduct(id, { ...rest });
    return res;
  });

  const mutation = useMutationHooks((data) => {
    const {
      implementer,
      luxasCode,
      image,
      partName,
      model,
      shCode,
      saleForCompany,
      quantity,
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
      partName,
      model,
      shCode,
      saleForCompany,
      quantity,
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

  const mutationDelete = useMutationHooks((data) => {
    const { id } = data;
    const res = ProductService.deteleProduct(id);
    return res;
  });

  useEffect(() => {
    if (data?.status === "OK") {
      if (Number(data?.data.quantity) === Number(quantityProduct)) {
        mutationDelete.mutate({ id: idProduct });
      } else {
        mutationUpdate.mutate({ id: idProduct, productDetails });
      }
      handleCloseModalExport();
      message.success("Export Product Success");
    } else if (data?.status === "ERR") {
      message.error(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleExportProduct = () => {
    if (valueInputOnChage < 1 && valueInputOnChage > quantityProduct) {
      message.warning(
        `Quantity of products must be less than or equal to ${quantityProduct}`
      );
      setValueInputOnChage(quantityProduct);
    } else {
      mutation.mutate(stateExportProduct);
    }
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
        <Stack sx={{ position: "relative", overflow: "auto" }}>
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
                <Stack>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    Quailty:
                  </Typography>
                  <InputNumberComponent
                    onChange={handleOnChangeQty}
                    value={
                      valueNumberInput
                        ? valueNumberInput
                        : Number(quantityProduct)
                    }
                    valueMax={Number(quantityProduct)}
                    valueMin={1}
                  />
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

export default AddExportProductComponent;
