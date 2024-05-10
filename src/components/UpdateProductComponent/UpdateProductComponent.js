import { Button, Drawer } from "antd";
import { InputBase, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import InputComponent from "../common/InputComponent/InputComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "mui-image";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as ProductService from "../../service/ProductService";
import * as message from "../common/MessageComponent/MessageComponent";
import InputNumberComponent from "../common/InputNumberComponent/InputNumberComponent";
const UpdateProductComponent = (props) => {
  const initial = () => ({
    image: "",
    importDate: "",
    importNo_VatNo: "",
    luxasCode: "",
    status: "Import",
    partName: "",
    model: "",
    supplies: "",
    suppliesAddress: "",
    maker: "",
    shCode: "",
    quantity: "",
    limitSetting: "",
    unit: "",
    price: "",
    amount: "",
    size: "",
    importTax: 0,
    vatImport: "",
    feeShipping: 0,
    costomsService: 0,
    fines: 0,
    costImportTax: 0,
    costImportUnit: 0,
    totalFeeVat: 0,
    description: 0,
    stockLocal: 0,
    note: "",
  });
  const { open, idProduct, setOpenDrawer, getAllProduct } = props;
  const [image, setImage] = useState("");
  const [productDetails, setProductDetails] = useState(initial());
  const inputRef = useRef(null);
  const handleAddImgProduct = (e) => {
    setImage(e.target.files[0]);
    setProductDetails({
      ...productDetails,
      image: e.target.files[0],
    });
  };
  const fetchGetDetailsProduct = async (idProduct) => {
    const res = await ProductService.getDetailsProduct(idProduct);
    if (res?.data) {
      setProductDetails({
        image: res?.data.image,
        importDate: res?.data.importDate,
        importNo_VatNo: res?.data.importNo_VatNo,
        luxasCode: res?.data.luxasCode,
        status: res?.data.status,
        partName: res?.data.partName,
        model: res?.data.model,
        supplies: res?.data.supplies,
        suppliesAddress: res?.data.suppliesAddress,
        maker: res?.data.maker,
        shCode: res?.data.shCode,
        quantity: res?.data.quantity,
        limitSetting: res?.data.limitSetting,
        unit: res?.data.unit,
        price: res?.data.price,
        amount: res?.data.amount,
        size: res?.data.size,
        importTax: res?.data.importTax,
        vatImport: res?.data.vatImport,
        feeShipping: res?.data.feeShipping,
        costomsService: res?.data.costomsService,
        fines: res?.data.fines,
        costImportTax: res?.data.costImportTax,
        costImportUnit: res?.data.costImportUnit,
        totalFeeVat: res?.data.totalFeeVat,
        description: res?.data.description,
        stockLocal: res?.data.stockLocal,
        note: res?.data.note,
      });
      setVatImport(res?.data.vatImport);
      setImportTax(res?.data.importTax);
      setCostImportTax(res?.data.costImportTax);
      setAmount(res?.data.amount);
      setTotalFeeVat(res?.data.totalFeeVat);
      setCostImportUnit(res?.data.costImportUnit);
    }
  };
  const [vatImport, setVatImport] = useState(0);
  const [importTax, setImportTax] = useState(0);
  const [costImportTax, setCostImportTax] = useState(0);
  const [amount, setAmount] = useState(0);
  const [totalFeeVat, setTotalFeeVat] = useState(0);
  const [costImportUnit, setCostImportUnit] = useState(0);
  const handleSelectImportTax = (value) => {
    setImportTax(value);
    setProductDetails({
      ...productDetails,
      importTax: value,
    });
  };

  const handleSelectVatImport = (e) => {
    setVatImport(e.target.value);
    setProductDetails({
      ...productDetails,
      vatImport: e.target.value,
    });
  };
  const handleAmount = (qty, price) => {
    const amount = Number(qty) * Number(price);
    return amount;
  };
  const handleCostImportUnit = (costImport, qty) => {
    const costImportUnit = Number(costImport) / Number(qty);
    return costImportUnit;
  };
  const handleCostImport = (amount, feeShipping, costomsService, fines) => {
    const costImport =
      Number(amount) +
      Number(feeShipping) +
      Number(costomsService) +
      Number(fines);
    return costImport;
  };

  const handleCostImportTax = (constImport, importTax) => {
    const costImportTax =
      Number(constImport) + (Number(constImport) * Number(importTax)) / 100;
    return costImportTax;
  };
  const handleTotalFeeVat = (costImportTax, vatImport) => {
    const totalFeeVat =
      Number(costImportTax) + (Number(costImportTax) * Number(vatImport)) / 100;
    return totalFeeVat;
  };
  useEffect(() => {
    if (idProduct && open) {
      fetchGetDetailsProduct(idProduct);
    }
  }, [idProduct, open]);
  useEffect(() => {
    if (importTax === null) {
      message.warning("Import Tax Must Be Number");
    }
    if (!productDetails.quantity || !productDetails.price) {
      setAmount(0);
      setTotalFeeVat(0);
      setCostImportUnit(0);
      setCostImportTax(0);
      setTotalFeeVat(0);
    }
    if (productDetails.quantity && productDetails.price) {
      const amount = handleAmount(
        Number(productDetails.quantity),
        Number(productDetails.price)
      );
      setAmount(amount);
    }
    if (productDetails.quantity !== 0 && costImportTax) {
      const costImport = handleCostImportUnit(
        costImportTax,
        productDetails.quantity
      );
      setCostImportUnit(costImport.toFixed(2));
    }
    if (amount !== 0 && productDetails && importTax) {
      const constImport = handleCostImport(
        amount,
        productDetails.feeShipping,
        productDetails.costomsService,
        productDetails.fines
      );
      const costImportTax = handleCostImportTax(constImport, importTax);

      setCostImportTax(costImportTax.toFixed(2));
    }
    if (costImportTax && vatImport) {
      const totalFeeVat = handleTotalFeeVat(costImportTax, vatImport);
      setTotalFeeVat(Number(totalFeeVat).toFixed(2));
    }
    if (
      amount !== 0 ||
      totalFeeVat !== 0 ||
      costImportUnit !== 0 ||
      costImportTax !== 0
    ) {
      productDetails.amount = amount;
      productDetails.totalFeeVat = totalFeeVat;
      productDetails.costImportUnit = costImportUnit;
      productDetails.costImportTax = costImportTax;
    }
  }, [
    amount,
    totalFeeVat,
    costImportUnit,
    productDetails,
    vatImport,
    importTax,
    costImportTax,
  ]);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rest } = data;
    const res = ProductService.updateProduct(id, { ...rest });
    return res;
  });
  const { data: dataUpdate } = mutationUpdate;

  useEffect(() => {
    if (dataUpdate?.status === "OK") {
      closeProductDrawer();
      message.success("Update Product Success");
      getAllProduct();
    } else if (dataUpdate?.status === "ERR") {
      message.error(dataUpdate?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdate]);

  const closeProductDrawer = () => {
    setOpenDrawer(false);
    setProductDetails(initial());
  };

  // const handleShippingFee = (value) => {
  //   setProductDetails({
  //     ...productDetails,
  //     feeShipping: value,
  //   });
  // };
  // const handleCostomsService = (value) => {
  //   setProductDetails({
  //     ...productDetails,
  //     costomsService: value,
  //   });
  // };
  // const handleFines = (value) => {
  //   setProductDetails({
  //     ...productDetails,
  //     fines: value,
  //   });
  // };

  const handleDescription = (e) => {
    setProductDetails({
      ...productDetails,
      description: e.target.value,
    });
  };
  const handleSelectStatus = (e) => {
    setProductDetails({
      ...productDetails,
      status: e.target.value,
    });
  };

  const handleOnChangeDetails = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpDateProduct = () => {
    const formData = new FormData();

    for (const key in productDetails) {
      const value = productDetails[key];
      formData.append(key, value);
    }
    mutationUpdate.mutate({
      id: idProduct,
      formData,
    });
  };

  return (
    <Stack>
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
          <Grid container spacing={4}>
            <Grid xs={2.9}>
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#3F0072",
                  padding: "30px 0",
                  borderBottomRightRadius: "35%",
                }}
              >
                <Stack
                  sx={{
                    height: "120px",
                    width: "120px",
                    borderRadius: "25px",
                    overflow: "hidden",
                    border: "5px solid #fff",
                    boxShadow:
                      "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                  }}
                >
                  {image ? (
                    <Image src={URL.createObjectURL(image)} />
                  ) : (
                    <Image
                      src={
                        productDetails?.image
                          ? `${process.env.REACT_APP_UPLOAD_URL}/products/images/${productDetails?.image}`
                          : ""
                      }
                    />
                  )}
                </Stack>
                <Stack
                  sx={{
                    position: "relative",
                    width: "100px",
                    height: "40px",
                    cursor: "pointer",
                    background: "#fff",
                    borderRadius: "5px",
                    marginTop: "15px",
                  }}
                >
                  <Stack
                    sx={{
                      position: "absolute",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      zIndex: "10",
                      cursor: "pointer",
                      opacity: "0",
                    }}
                  >
                    <InputBase
                      type="file"
                      ref={inputRef}
                      onChange={handleAddImgProduct}
                    />
                  </Stack>
                  <Stack
                    sx={{
                      position: "absolute",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      flexDirection: "row",
                      zIndex: "1",
                      cursor: "pointer",
                    }}
                  >
                    <CloudUploadIcon />
                    <Typography sx={{ marginLeft: "5px" }}>Upload</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={9.1}>
              <Stack
                sx={{
                  padding: "40px 0 0  10px",
                }}
              >
                <Grid container spacing={4}>
                  <Grid xs={4}>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      Import Date:
                    </Typography>
                    <InputComponent
                      vInput={productDetails?.importDate}
                      placeholder="Import Date ..."
                      bgInput="#fff"
                      borderInput="1px solid #3F0072"
                      typeInput="date"
                      nameInput="importDate"
                      onChangeInput={handleOnChangeDetails}
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
                      IMPORT N.0 / VAT N.0:
                    </Typography>
                    <InputComponent
                      onChangeInput={handleOnChangeDetails}
                      vInput={productDetails?.importNo_VatNo}
                      nameInput="importNo_VatNo"
                      placeholder="Import N.0 / VAT N.0 ..."
                      bgInput="#fff"
                      borderInput="1px solid #3F0072"
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
                      onChangeInput={handleOnChangeDetails}
                      vInput={productDetails?.luxasCode}
                      nameInput="luxasCode"
                      placeholder="Luxas Code ..."
                      bgInput="#fff"
                      borderInput="1px solid #3F0072"
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
                      Status:
                    </Typography>
                    <Stack sx={{ width: "100%" }}>
                      <Select
                        onChange={handleSelectStatus}
                        value={productDetails?.status}
                        displayEmpty
                        sx={{
                          height: "50px",
                          border: "1px solid #3F0072",
                          textAlign: "center",
                          background: "#fff",
                        }}
                      >
                        <MenuItem value="Import">Import</MenuItem>
                        <MenuItem value="VietNam">Viet Nam</MenuItem>
                      </Select>
                    </Stack>
                  </Grid>
                  <Grid xs={8}>
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
                      onChangeInput={handleOnChangeDetails}
                      vInput={productDetails?.partName}
                      nameInput="partName"
                      placeholder="Part Name ..."
                      bgInput="#fff"
                      borderInput="1px solid #3F0072"
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
          <Stack sx={{ padding: "30px 0" }}>
            <Grid container spacing={4}>
              <Grid xs={6}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Supplies:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.supplies}
                  nameInput="supplies"
                  placeholder="Supplies ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
                />
              </Grid>
              <Grid xs={6}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Supplies Address:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.suppliesAddress}
                  nameInput="suppliesAddress"
                  placeholder="Supplies Address ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
                />
              </Grid>
              <Grid xs={6}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Maker:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.maker}
                  nameInput="maker"
                  placeholder="Maker ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
                />
              </Grid>
              <Grid xs={6}>
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
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.model}
                  nameInput="model"
                  placeholder="Model ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  Limit Setting:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.limitSetting}
                  nameInput="limitSetting"
                  placeholder="Limit ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.shCode}
                  nameInput="shCode"
                  placeholder="SH Code ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  Quantity:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.quantity}
                  nameInput="quantity"
                  placeholder="Quantity..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  Unit:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.unit}
                  nameInput="unit"
                  placeholder="Unit ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  Price: USD
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.price}
                  nameInput="price"
                  placeholder="Price ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  Amount: USD
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.amount}
                  nameInput="amount"
                  placeholder="Amount ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  Size: Cm
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.size}
                  nameInput="size"
                  placeholder="( L , W, H , Kg )"
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  Import Tax: {importTax}
                </Typography>
                <Stack sx={{ width: "100%" }}>
                  <InputNumberComponent
                    defaultValue={importTax}
                    border="1px solid #3F0072"
                    height="50px"
                    width="100%"
                    min={1}
                    max={30}
                    onChange={handleSelectImportTax}
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
                  Vat Import: %
                </Typography>
                <Stack sx={{ width: "100%" }}>
                  <Select
                    onChange={handleSelectVatImport}
                    value={vatImport}
                    displayEmpty
                    sx={{
                      height: "50px",
                      border: "1px solid #3F0072",
                      textAlign: "center",
                      background: "#fff",
                    }}
                  >
                    <MenuItem value="10">10 %</MenuItem>
                    <MenuItem value="8">8 %</MenuItem>
                  </Select>
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
                  Shipping Fee:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.feeShipping}
                  nameInput="feeShipping"
                  placeholder="Fee shipping ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  Costoms Service:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.costomsService}
                  nameInput="costomsService"
                  placeholder="Costoms Service ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  Fines (If any):
                </Typography>
                <Stack sx={{ width: "100%" }}>
                  <InputComponent
                    onChangeInput={handleOnChangeDetails}
                    vInput={productDetails?.fines}
                    nameInput="fines"
                    placeholder="Finez..."
                    bgInput="#fff"
                    borderInput="1px solid #3F0072"
                  />
                </Stack>
              </Grid>
              <Grid xs={4}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Cost Import/Unit:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={costImportUnit}
                  nameInput="costImportUnit"
                  placeholder="Cost /Unit ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  Cost Import No Vat:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.costImportTax}
                  nameInput="costImportTax"
                  placeholder="Cost Import Tax..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
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
                  Total Fee Include Vat:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={totalFeeVat}
                  nameInput="totalFeeVat"
                  placeholder="Total Fee Vat ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
                />
              </Grid>
              <Grid xs={12}>
                <Stack sx={{ width: "100%" }}>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    Description:
                  </Typography>
                  <TextField
                    onChange={handleDescription}
                    value={productDetails?.description}
                    placeholder="Description ..."
                    multiline={false}
                    variant="outlined"
                    sx={{
                      border: "1px solid #3F0072",
                      borderRadius: "5px",
                      background: "#fff",
                    }}
                  />
                </Stack>
              </Grid>
              <Grid xs={6}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Stock Local:
                </Typography>
                <InputComponent
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.stockLocal}
                  nameInput="stockLocal"
                  placeholder="Stock Local  ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
                />
              </Grid>
              <Grid xs={6}>
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
                  onChangeInput={handleOnChangeDetails}
                  vInput={productDetails?.note}
                  nameInput="note"
                  placeholder="Note  ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Drawer>
    </Stack>
  );
};
export default UpdateProductComponent;
