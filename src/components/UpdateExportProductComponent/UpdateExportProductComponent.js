import { Button, Drawer } from "antd";
import { Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputComponent from "../common/InputComponent/InputComponent";
import Image from "mui-image";
import imgbg from "../../assets/images/bg7.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutationHooks } from "../../hook/useMutationHook";
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
  const { open, idProduct, setOpenDrawer } = props;

  const [productDetails, setProductDetails] = useState(initial());

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
    }
  };

  useEffect(() => {
    if (idProduct && open) {
      fetchGetDetailsProduct(idProduct);
    }
  }, [idProduct, open]);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rest } = data;
    const res = ExportProductService.updateExportProduct(id, { ...rest });
    return res;
  });
  const { data: dataUpdate } = mutationUpdate;

  useEffect(() => {
    if (dataUpdate?.status === "OK") {
      message.success("Update Product Success");
      closeProductDrawer();
    } else if (dataUpdate?.status === "ERR") {
      message.error(dataUpdate?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdate]);

  const closeProductDrawer = () => {
    setOpenDrawer(false);
    setProductDetails(initial());
  };

  const handleOnChangeDetails = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpDateProduct = (idProduct) => {
    mutationUpdate.mutate({ id: idProduct, productDetails });
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
                    vInput={productDetails.saleForCompany}
                    // onChangeInput={handleOnChange}
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
                  // onChange={handleOnChangeQty}
                  value={Number(productDetails?.quantity)}
                  valueMax={Number(productDetails?.quantity)}
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
                // onChangeInput={handleOnChange}
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
                // onChangeInput={handleOnChange}
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
                // onChangeInput={handleOnChange}
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
                // onChangeInput={handleOnChange}
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
                // onChangeInput={handleOnChange}
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
                // onChangeInput={handleOnChange}
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
                // onChangeInput={handleOnChange}
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
                // onChangeInput={handleOnChange}
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
                // onChangeInput={handleOnChange}
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
