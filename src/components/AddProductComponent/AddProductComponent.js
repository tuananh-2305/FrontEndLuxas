import { InputBase, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import InputComponent from "../common/InputComponent/InputComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "mui-image";
import productDefault from "../../assets/images/productdefault.png";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ButtonComponent from "../common/ButtonComponent/ButtonComponent";
import ClearIcon from "@mui/icons-material/Clear";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as ProductService from "../../service/ProductService";
import * as message from "../common/MessageComponent/MessageComponent";
import ModalComponent from "../common/ModalComponent/ModalComponent";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import folder from "../../assets/images/folder.png";
import InputNumberComponent from "../common/InputNumberComponent/InputNumberComponent";
import DescriptionIcon from "@mui/icons-material/Description";

const AddProductComponent = (props) => {
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
    quantity: 0,
    limitSetting: "",
    unit: "",
    price: 0,
    amount: 0,
    size: "",
    importTax: 1,
    vatImport: "10",
    feeShipping: 0,
    costomsService: 0,
    fines: 0,
    costImportUnit: 0,
    costImportTax: 0,
    totalFeeVat: 0,
    description: "",
    stockLocal: "",
    note: "",
  });
  const { openModalProduct, setOpenModelProduct, getAllProduct } = props;
  const [image, setImage] = useState("");
  const [stateProduct, setStateProduct] = useState(initial());
  const [selectStatus, setSelectStatus] = useState(stateProduct.status);
  const [vatImport, setVatImport] = useState(stateProduct.vatImport);
  const [importTax, setImportTax] = useState(stateProduct.importTax);
  const [costImportTax, setCostImportTax] = useState(
    stateProduct.costImportTax
  );

  const inputRef = useRef(null);
  const inputFileRef = useRef(null);
  const [fileDocumentList, setFileDocumentList] = useState([]);
  const [amount, setAmount] = useState(parseInt(stateProduct.amount));
  const [totalFeeVat, setTotalFeeVat] = useState(
    parseInt(stateProduct.totalFeeVat)
  );
  const [costImportUnit, setCostImportUnit] = useState(
    parseInt(stateProduct.costImportUnit)
  );

  const handleCloseAddProduct = () => {
    setOpenModelProduct(false);
    setFileDocumentList("");
  };

  const handleUploadDocument = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updateList = [...fileDocumentList, newFile];
      setFileDocumentList(updateList);
    }
  };
  useEffect(() => {
    if (!openModalProduct) {
      setStateProduct(initial());
      setAmount(0);
      setTotalFeeVat(0);
      setCostImportUnit(0);
      setCostImportTax(0);
    }
  }, [openModalProduct]);
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
    if (importTax === null) {
      message.warning("Import Tax Must Be Number");
    }
    if (!stateProduct.quantity || !stateProduct.price) {
      setAmount(0);
      setTotalFeeVat(0);
      setCostImportUnit(0);
      setCostImportTax(0);
    }
    if (stateProduct.quantity && stateProduct.price) {
      const amount = handleAmount(
        Number(stateProduct.quantity),
        Number(stateProduct.price)
      );
      setAmount(amount);
    }
    if (stateProduct.quantity !== 0 && costImportTax) {
      const costImport = handleCostImportUnit(
        costImportTax,
        stateProduct.quantity
      );
      setCostImportUnit(costImport.toFixed(2));
    }
    if (amount !== 0 && stateProduct && importTax) {
      const constImport = handleCostImport(
        amount,
        stateProduct.feeShipping,
        stateProduct.costomsService,
        stateProduct.fines
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
      stateProduct.amount = amount;
      stateProduct.totalFeeVat = totalFeeVat;
      stateProduct.costImportUnit = costImportUnit;
      stateProduct.costImportTax = costImportTax;
    }
  }, [
    amount,
    totalFeeVat,
    costImportUnit,
    stateProduct,
    vatImport,
    importTax,
    costImportTax,
  ]);

  const fileRemove = (file) => {
    const updatedList = [...fileDocumentList];
    updatedList.splice(fileDocumentList.indexOf(file), 1);
    setFileDocumentList(updatedList);
  };

  const handleAddImgProduct = (e) => {
    setImage(e.target.files[0]);
    setStateProduct({
      ...stateProduct,
      image: e.target.files[0],
    });
  };

  const handleOnChangeQty = (value) => {
    setStateProduct({
      ...stateProduct,
      quantity: value,
    });
  };
  const handleOnChangePrice = (value) => {
    setStateProduct({
      ...stateProduct,
      price: value,
    });
  };
  const handleShippingFee = (value) => {
    setStateProduct({
      ...stateProduct,
      feeShipping: value,
    });
  };
  const handleCostomsService = (value) => {
    setStateProduct({
      ...stateProduct,
      costomsService: value,
    });
  };
  const handleFines = (value) => {
    setStateProduct({
      ...stateProduct,
      fines: value,
    });
  };

  const handleDescription = (e) => {
    setStateProduct({
      ...stateProduct,
      description: e.target.value,
    });
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectStatus = (e) => {
    setSelectStatus(e.target.value);
    setStateProduct({
      ...stateProduct,
      status: e.target.value,
    });
  };

  const handleSelectImportTax = (value) => {
    setImportTax(value);
    setStateProduct({
      ...stateProduct,
      importTax: value,
    });
  };

  const handleSelectVatImport = (e) => {
    setVatImport(e.target.value);
    setStateProduct({
      ...stateProduct,
      vatImport: e.target.value,
    });
  };

  const mutation = useMutationHooks((data) => {
    const res = ProductService.addProduct(data);
    return res;
  });
  const { data } = mutation;

  useEffect(() => {
    if (data?.status === "OK") {
      handleCloseAddProduct();
      message.success("Add Product Success");
      getAllProduct();
    } else if (data?.status === "ERR") {
      message.error(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleAddProduct = () => {
    const formData = new FormData();

    for (let i = 0; i < fileDocumentList.length; i++) {
      formData.append("documentFile", fileDocumentList[i]);
    }

    for (const key in stateProduct) {
      const value = stateProduct[key];
      formData.append(key, value);
    }
    mutation.mutate(formData);
  };

  return (
    <ModalComponent open={openModalProduct} onClose={handleCloseAddProduct}>
      <Stack
        sx={{
          position: "absolute",
          background: "#fff",
          width: "65%",
          overflow: "hidden",
          height: "80%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
        }}
      >
        <Stack
          sx={{
            margin: "30px 30px 10px auto",
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
            onClick={() => handleCloseAddProduct()}
          >
            <ClearIcon />
          </Stack>
          <Stack>
            <ButtonComponent
              textButton="Add Product"
              bgButton="#3F0072"
              hoverBtn="#3C416F"
              paddingBtn="5px 15px"
              onClickBtn={() => handleAddProduct()}
            />
          </Stack>
        </Stack>
        <Stack sx={{ overflow: "auto", position: "relative" }}>
          <Stack sx={{ padding: "0 20px 0 0" }}>
            <Grid container spacing={3}>
              <Grid xs={3.2}>
                <Stack
                  sx={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#3F0072",
                    borderBottomRightRadius: "30%",
                  }}
                >
                  <Stack
                    sx={{
                      background: "#fff",
                      height: "110px",
                      width: "110px",
                      borderRadius: "15px",
                      overflow: "hidden",
                      border: "3px solid #fff",
                      boxShadow:
                        "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <Image
                      src={image ? URL.createObjectURL(image) : productDefault}
                    />
                  </Stack>
                  <Stack
                    sx={{
                      position: "relative",
                      width: "50px",
                      height: "40px",
                      cursor: "pointer",
                      background: "#fff",
                      color: "",
                      borderRadius: "5px",
                      margin: "-25px auto 0 20px",
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
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid xs={8.8}>
                <Stack sx={{ paddingTop: "20px" }}>
                  <Grid container spacing={3}>
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
                        placeholder="Import Date ..."
                        bgInput="#fff"
                        borderInput="1px solid #3F0072"
                        typeInput="date"
                        vInput={stateProduct.type}
                        onChangeInput={handleOnChange}
                        nameInput="importDate"
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
                        vInput={stateProduct.type}
                        onChangeInput={handleOnChange}
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
                        vInput={stateProduct.type}
                        onChangeInput={handleOnChange}
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
                          value={selectStatus}
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
                        vInput={stateProduct.type}
                        onChangeInput={handleOnChange}
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
          </Stack>
          <Stack sx={{ padding: "20px 20px 50px" }}>
            <Grid container spacing={3}>
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
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="model"
                  placeholder="Model ..."
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
                  SH Code:
                </Typography>
                <InputComponent
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                <Stack sx={{ width: "100%" }}>
                  <InputNumberComponent
                    name="quantity"
                    border="1px solid #3F0072"
                    height="50px"
                    width="100%"
                    min={0}
                    defaultValue={0}
                    onChange={handleOnChangeQty}
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
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                  Limit Setting:
                </Typography>
                <InputComponent
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                  Price: USD
                </Typography>
                <Stack sx={{ width: "100%" }}>
                  <InputNumberComponent
                    name="price"
                    border="1px solid #3F0072"
                    height="50px"
                    width="100%"
                    min={0}
                    defaultValue={0}
                    onChange={handleOnChangePrice}
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
                  Amount: USD
                </Typography>
                <InputComponent
                  vInput={amount}
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
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                  Import Tax: %
                </Typography>
                <Stack sx={{ width: "100%" }}>
                  <InputNumberComponent
                    border="1px solid #3F0072"
                    height="50px"
                    width="100%"
                    min={1}
                    max={30}
                    value={importTax}
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
                  Shipping Fee:
                </Typography>
                <Stack sx={{ width: "100%" }}>
                  <InputNumberComponent
                    name="feeShipping"
                    border="1px solid #3F0072"
                    height="50px"
                    width="100%"
                    min={0}
                    defaultValue={stateProduct.feeShipping}
                    onChange={handleShippingFee}
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
                  Costoms Service:
                </Typography>
                <Stack sx={{ width: "100%" }}>
                  <InputNumberComponent
                    name="costomsService"
                    border="1px solid #3F0072"
                    height="50px"
                    width="100%"
                    min={0}
                    defaultValue={stateProduct.costomsService}
                    onChange={handleCostomsService}
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
                  Fines (If any):
                </Typography>
                <Stack sx={{ width: "100%" }}>
                  <InputNumberComponent
                    name="fines"
                    border="1px solid #3F0072"
                    height="50px"
                    width="100%"
                    min={0}
                    defaultValue={stateProduct.fines}
                    onChange={handleFines}
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
                  Vat Import:
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
                  Cost Import / Unit:
                </Typography>
                <InputComponent
                  vInput={costImportUnit}
                  nameInput="costImportUnit"
                  placeholder="Const /Unit..."
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
                  Cost Import Not VAT:
                </Typography>
                <InputComponent
                  vInput={costImportTax}
                  nameInput="costImportTax"
                  placeholder="Cost Import Tax  ..."
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
                  Total Fee Include VAT:
                </Typography>
                <InputComponent
                  vInput={totalFeeVat}
                  nameInput="totalFeeVat"
                  placeholder="Total Fee ..."
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
                    placeholder="Description ..."
                    rows={5}
                    multiline
                    variant="outlined"
                    sx={{
                      border: "1px solid #3F0072",
                      borderRadius: "5px",
                      background: "#fff",
                    }}
                  />
                </Stack>
              </Grid>
              <Grid xs={2}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    height: "15vh",
                    width: "100%",
                  }}
                >
                  <Stack
                    sx={{
                      width: "100%",
                      background: "#F2F3F5",
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                      border: "1px dashed #3F0072",
                      boxShadow:
                        "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <Image
                      src={folder}
                      style={{ height: "35px", width: "35px" }}
                    />
                    <input
                      style={{
                        position: "absolute",
                        opacity: 0,
                        zIndex: "1",
                        cursor: "pointer",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                      }}
                      ref={inputFileRef}
                      type="file"
                      onChange={handleUploadDocument}
                      multiple
                    />
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Upload
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Document
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid xs={10}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    height: "15vh",
                    width: "100%",
                    overflow: "hidden",
                    border: "1px solid #3F0072",
                    borderRadius: "5px",
                  }}
                >
                  <Stack
                    sx={{
                      flexDirection: "row",
                      padding: "0 20px",
                      width: "100%",
                      alignItems: "center",
                      overflow: "auto",
                    }}
                  >
                    {fileDocumentList.length > 0 && (
                      <>
                        {fileDocumentList.map((file, index) => (
                          <Stack
                            sx={{
                              height: "8vh",
                              flexDirection: "row",
                              border: "0.1px solid #3F0072",
                              padding: "10px",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderRadius: "5px",
                              background: "#F2F3F5",
                              marginRight:
                                index === fileDocumentList.length - 1
                                  ? "0"
                                  : "10px",
                            }}
                            key={index}
                          >
                            <DescriptionIcon fontSize="large" />
                            <Typography
                              sx={{
                                fontSize: "12px",
                                padding: "10px",
                              }}
                            >
                              {file.name.split(".")[0].length > 10
                                ? file.name.split(".")[0].slice(0, 10) + "..."
                                : file.name}
                            </Typography>
                            <Stack
                              sx={{
                                marginLeft: "auto",
                                background: "#fff",
                                cursor: "pointer",
                                borderRadius: " 50%",
                              }}
                              onClick={() => fileRemove(file)}
                            >
                              <HighlightOffIcon />
                            </Stack>
                          </Stack>
                        ))}
                      </>
                    )}
                  </Stack>
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
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="note"
                  placeholder="Note  ..."
                  bgInput="#fff"
                  borderInput="1px solid #3F0072"
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    </ModalComponent>
  );
};

export default AddProductComponent;
