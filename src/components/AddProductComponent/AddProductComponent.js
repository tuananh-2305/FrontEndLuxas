import { InputBase, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import InputComponent from "../common/InputComponent/InputComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "mui-image";
import imgbg from "../../assets/images/bglogin.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ButtonComponent from "../common/ButtonComponent/ButtonComponent";
import ClearIcon from "@mui/icons-material/Clear";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as ProductService from "../../service/ProductService";
import * as message from "../common/MessageComponent/MessageComponent";
import ModalComponent from "../common/ModalComponent/ModalComponent";

const AddProductComponent = (props) => {
  const { openModalProduct, handleCloseAddProduct } = props;
  const [image, setImage] = useState("");
  const [selectStatus, setSelectStatus] = useState("Import");
  const [stateProduct, setStateProduct] = useState({
    image: "1",
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
    unit: "",
    price: "",
    amount: "",
    size: "",
    importTax: "",
    vatImport: "",
    feeShipping: "",
    costomsService: "",
    fines: "",
    totalFee: "",
    description: "",
    stockLocal: "",
    note: "",
  });

  const inputRef = useRef(null);

  const handleAddImgProduct = (e) => {
    setImage(e.target.files[0]);
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

  const mutation = useMutationHooks((data) => {
    const {
      image,
      importDate,
      importNo_VatNo,
      luxasCode,
      status,
      partName,
      model,
      supplies,
      suppliesAddress,
      maker,
      shCode,
      quantity,
      unit,
      price,
      amount,
      size,
      importTax,
      vatImport,
      feeShipping,
      costomsService,
      fines,
      totalFee,
      description,
      stockLocal,
      note,
    } = data;
    const res = ProductService.addProduct({
      image,
      importDate,
      importNo_VatNo,
      luxasCode,
      status,
      partName,
      model,
      supplies,
      suppliesAddress,
      maker,
      shCode,
      quantity,
      unit,
      price,
      amount,
      size,
      importTax,
      vatImport,
      feeShipping,
      costomsService,
      fines,
      totalFee,
      description,
      stockLocal,
      note,
    });
    return res;
  });

  const { data } = mutation;

  useEffect(() => {
    if (data?.status === "OK") {
      message.success("Add Product Success");
      handleCloseAddProduct();
    } else if (data?.status === "ERR") {
      message.error(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleAddProduct = () => {
    mutation.mutate(stateProduct);
  };

  return (
    <ModalComponent open={openModalProduct} onClose={handleCloseAddProduct}>
      <Stack
        sx={{
          position: "absolute",
          background: "#fff",
          width: "60%",
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
          <Stack sx={{ padding: "0 30px 0 0" }}>
            <Grid container spacing={4}>
              <Grid xs={3.4}>
                <Stack
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#3F0072",
                    padding: "35px 0 30px",
                    borderBottomRightRadius: "30%",
                  }}
                >
                  <Stack
                    sx={{
                      height: "130px",
                      width: "130px",
                      borderRadius: "15px",
                      overflow: "hidden",
                      border: "3px solid #fff",
                      boxShadow:
                        "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <Image src={image ? URL.createObjectURL(image) : imgbg} />
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
              <Grid xs={8.6}>
                <Stack sx={{ paddingTop: "20px" }}>
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
          <Stack sx={{ padding: "30px" }}>
            <Grid container spacing={4}>
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
                <InputComponent
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="quantity"
                  placeholder="Quantity ..."
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
                  Price:
                </Typography>
                <InputComponent
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                  Amount:
                </Typography>
                <InputComponent
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                  Size:
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
                  Import Tax:
                </Typography>
                <InputComponent
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="importTax"
                  placeholder="Import Tax ..."
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
                  Vat Import:
                </Typography>
                <InputComponent
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="vatImport"
                  placeholder="%"
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
                  Shipping Fee:
                </Typography>
                <InputComponent
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
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
                <InputComponent
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="fines"
                  placeholder="Fines ..."
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
                  Total Fee:
                </Typography>
                <InputComponent
                  vInput={stateProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="totalFee"
                  placeholder="Total Fee  ..."
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
