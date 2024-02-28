import { Button, Drawer } from "antd";
import { Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputComponent from "../common/InputComponent/InputComponent";
import Image from "mui-image";
import imgbg from "../../assets/images/bg7.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as ProductService from "../../service/ProductService";
import * as ExportProductService from "../../service/ExportProductService";
import * as message from "../common/MessageComponent/MessageComponent";
import InputNumberComponent from "../common/InputNumberComponent/InputNumberComponent";
const UpdateExportProductComponent = (props) => {
  const initial = () => ({
    implementer: "",
    luxasCode: "",
    partName: "",
    model: "",
    shCode: "",
    image: "",
    saleForCompany: "",
    quantity: 0,
    unit: 0,
    price: 0,
    amount: 0,
    customerSevice: 0,
    vat: 0,
    shippingFee: 0,
    commission: 0,
    feesIncurred: 0,
    profit: 0,
    note: "",
  });
  const { open, idProduct, setOpenDrawer, luxasCode, getAllExportProduct } =
    props;

  const [productDetails, setProductDetails] = useState(initial());
  const [qtyExportProduct, setQtyExportProduct] = useState(0);
  const [quantityProduct, setQuantityProduct] = useState({
    quantity: 0,
  });

  const fetchGetDetailsProduct = async (idProduct) => {
    const res = await ExportProductService.getDetailsExportProduct(idProduct);
    if (res?.data) {
      setProductDetails({
        implementer: res?.data.implementer,
        luxasCode: res?.data.luxasCode,
        partName: res?.data.partName,
        model: res?.data.model,
        shCode: res?.data.shCode,
        image: res?.data.image,
        saleForCompany: res?.data.saleForCompany,
        quantity: res?.data.quantity,
        unit: res?.data.unit,
        price: res?.data.price,
        amount: res?.data.amount,
        customerSevice: res?.data.customerSevice,
        vat: res?.data.vat,
        shippingFee: res?.data.shippingFee,
        commission: res?.data.commission,
        feesIncurred: res?.data.feesIncurred,
        profit: res?.data.profit,
        note: res?.data.note,
      });
      setQtyExportProduct(res?.data.quantity);
    }
  };

  const fetchGetQuantityProduct = async (luxasCode) => {
    const res = await ProductService.getDetailsProductByCode(luxasCode);
    if (res?.data) {
      setQuantityProduct({
        quantity: res?.data.quantity,
      });
    }
  };
  const [valueInputOnChange, setValueInputOnChange] = useState(0);

  useEffect(() => {
    if (idProduct && open && luxasCode) {
      fetchGetDetailsProduct(idProduct);
      fetchGetQuantityProduct(luxasCode);
    }
  }, [idProduct, open, luxasCode]);

  const maxQuantity =
    Number(quantityProduct?.quantity) + Number(qtyExportProduct);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rest } = data;
    const res = ExportProductService.updateExportProduct(id, { ...rest });
    return res;
  });
  const { data: dataUpdate } = mutationUpdate;

  useEffect(() => {
    if (dataUpdate?.status === "OK") {
      closeProductDrawer();
      message.success("Update Product Success");
      getAllExportProduct();
    } else if (dataUpdate?.status === "ERR") {
      message.error(dataUpdate?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdate]);

  const closeProductDrawer = () => {
    setOpenDrawer(false);
    setProductDetails(initial());
  };

  const handleOnChangeQty = (event, val) => {
    setValueInputOnChange(event.target.value ? event.target.value : val);
    setProductDetails({
      ...productDetails,
      quantity: val ? val : event.target.value,
    });
  };

  const handleOnChangeDetails = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpDateProduct = (idProduct) => {
    if (valueInputOnChange < 1 || valueInputOnChange > maxQuantity) {
      message.warning(
        `Quantity of products must be less than or equal to ${maxQuantity}`
      );
      setValueInputOnChange(maxQuantity);
    } else {
      mutationUpdate.mutate({ id: idProduct, productDetails });
    }
  };

  return (
    <Drawer
      title="Update Product"
      placement="right"
      width={1000}
      onClose={closeProductDrawer}
      closable={false}
      open={open}
      extra={
        <>
          <Button
            onClick={() => closeProductDrawer()}
            style={{ height: "40px", marginRight: "20px" }}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: "70px",
              height: "40px",
              background: "#3F0072",
              color: "#fff",
            }}
            onClick={() => handleUpDateProduct(idProduct)}
          >
            OK
          </Button>
        </>
      }
    >
      <Stack sx={{ position: "relative" }}>
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
                <Image
                  src={
                    productDetails?.image
                      ? `${process.env.REACT_APP_UPLOAD_URL}/images/products/${productDetails?.image}`
                      : imgbg
                  }
                />
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
                    vInput={productDetails.saleForCompany}
                    onChangeInput={handleOnChangeDetails}
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
                    vInput={productDetails?.luxasCode}
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
                    vInput={productDetails?.implementer}
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
                    vInput={productDetails?.partName}
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
        <Stack sx={{ paddingTop: "20px" }}>
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
                vInput={productDetails?.model}
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
                vInput={productDetails?.shCode}
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
                  name="quantity"
                  onChange={handleOnChangeQty}
                  value={Number(productDetails?.quantity)}
                  valueMax={maxQuantity}
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
                vInput={productDetails?.unit}
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
                vInput={productDetails?.price}
                onChangeInput={handleOnChangeDetails}
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
                vInput={productDetails?.amount}
                onChangeInput={handleOnChangeDetails}
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
                vInput={productDetails?.customerSevice}
                onChangeInput={handleOnChangeDetails}
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
                vInput={productDetails?.vat}
                onChangeInput={handleOnChangeDetails}
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
                vInput={productDetails?.shippingFee}
                onChangeInput={handleOnChangeDetails}
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
                vInput={productDetails?.commission}
                onChangeInput={handleOnChangeDetails}
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
                vInput={productDetails?.feesIncurred}
                onChangeInput={handleOnChangeDetails}
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
                vInput={productDetails?.profit}
                onChangeInput={handleOnChangeDetails}
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
                vInput={productDetails?.note}
                onChangeInput={handleOnChangeDetails}
                nameInput="note"
                placeholder="Note  ..."
                bgInput="#fff"
                borderInput="1px solid #004225"
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Drawer>
  );
};
export default UpdateExportProductComponent;
