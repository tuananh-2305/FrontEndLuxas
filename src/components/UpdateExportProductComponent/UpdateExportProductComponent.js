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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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
    exportCode: "",
    price: 0,
    amount: 0,
    customerSevice: 0,
    vat: 0,
    shippingFee: 0,
    commission: 0,
    feesIncurred: 0,
    costImportUnit: 0,
    costImportTax: 0,
    totalExportFee: 0,
    exportFeeVat: 0,
    profit: 0,
    profitNoVat: 0,
    note: "",
  });
  const { open, idProduct, setOpenDrawer, luxasCode, getAllExportProduct } =
    props;

  const [productDetails, setProductDetails] = useState(initial());
  const [qtyExportProduct, setQtyExportProduct] = useState(0);
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
        costImportUnit: res?.data.costImportUnit,
        salePriceUnit: res?.data.salePriceUnit,
        totalExportFee: res?.data.totalExportFee,
        exportFeeVat: res?.data.exportFeeVat,
        profit: res?.data.profit,
        profitNoVat: res?.data.profitNoVat,
        exportCode: res?.data.exportCode,
        note: res?.data.note,
      });
      setVatImport(res?.data.vat);
      setQtyExportProduct(res?.data.quantity);
      setAmount(res?.data.amount);
      setTotalExportFee(res?.data.totalExportFee);
      setSalePriceUnit(res?.data.amount);
      setExportFeeVat(res?.data.exportFeeVat);
      setProfit(res?.data.profit);
      setProfitNoVat(res?.data.profitNoVat);
    }
  };

  const [vatImport, setVatImport] = useState(0);
  const [amount, setAmount] = useState(0);
  const [totalExportFee, setTotalExportFee] = useState(0);
  const [salePriceUnit, setSalePriceUnit] = useState(0);
  const [exportFeeVat, setExportFeeVat] = useState(0);
  const [profit, setProfit] = useState(0);
  const [profitNoVat, setProfitNoVat] = useState(0);

  const handleAmountProduct = (qty, price) => {
    const amount = Number(qty) * Number(price);
    return amount;
  };
  const handleTotalSalePriceUnit = (
    amount,
    shippingFee,
    customerSevice,
    commission,
    feesIncurred,
    quantity
  ) => {
    const totalSalePriceUnit =
      (Number(amount) +
        Number(shippingFee) +
        Number(customerSevice) +
        Number(commission) +
        Number(feesIncurred)) /
      Number(quantity);
    return totalSalePriceUnit;
  };

  const handleTotalExportFee = (
    amount,
    shippingFee,
    customerSevice,
    commission,
    feesIncurred
  ) => {
    const totalExportFee =
      Number(amount) +
      Number(shippingFee) +
      Number(customerSevice) +
      Number(commission) +
      Number(feesIncurred);
    return totalExportFee;
  };
  const handleExportFeeVat = (totalExportFee, vat) => {
    const exportFeeVat =
      Number(totalExportFee) + (Number(totalExportFee) * Number(vat)) / 100;
    return exportFeeVat;
  };

  const handleProfitNoVat = (salePriceUnit, quantity, costImportUnit) => {
    const profitNoVat =
      Number(salePriceUnit) * Number(quantity) -
      Number(costImportUnit) * Number(quantity);
    return profitNoVat;
  };
  const handleProfit = (profitNoVat, totalExportFee) => {
    const profit = (Number(profitNoVat) / Number(totalExportFee)) * 100;
    return profit;
  };
  useEffect(() => {
    if (
      !productDetails.quantity ||
      !productDetails.price ||
      productDetails.price === ""
    ) {
      setAmount(0);
      setSalePriceUnit(0);
      setTotalExportFee(0);
      setProfit(0);
      setProfitNoVat(0);
      setExportFeeVat(0);
    }
    if (productDetails.quantity && productDetails.price) {
      const amountProduct = handleAmountProduct(
        productDetails.quantity,
        productDetails.price
      );
      setAmount(amountProduct.toFixed(2));
    }
    if (
      amount !== 0 &&
      productDetails.quantity &&
      productDetails.quantity !== 0
    ) {
      const totalSalePriceUnit = handleTotalSalePriceUnit(
        amount,
        productDetails.shippingFee,
        productDetails.customerSevice,
        productDetails.commission,
        productDetails.feesIncurred,
        productDetails.quantity
      );
      setSalePriceUnit(totalSalePriceUnit.toFixed(2));
    }
    if (amount !== 0 && productDetails) {
      const totalExportFee = handleTotalExportFee(
        amount,
        productDetails.shippingFee,
        productDetails.customerSevice,
        productDetails.commission,
        productDetails.feesIncurred
      );
      setTotalExportFee(totalExportFee);
    }
    if (productDetails.vat && totalExportFee !== 0) {
      const exportFeeVat = handleExportFeeVat(
        totalExportFee,
        productDetails.vat
      );
      setExportFeeVat(exportFeeVat);
    }
    if (
      salePriceUnit !== 0 &&
      productDetails.quantity !== 0 &&
      productDetails.costImportUnit !== 0
    ) {
      const profitNoVat = handleProfitNoVat(
        salePriceUnit,
        productDetails.quantity,
        productDetails.costImportUnit
      );
      setProfitNoVat(profitNoVat.toFixed(2));
    }
    if (totalExportFee !== 0 && profitNoVat !== 0) {
      const profit = handleProfit(profitNoVat, totalExportFee);
      setProfit(profit.toFixed(2));
    }
    if (
      amount !== 0 ||
      salePriceUnit !== 0 ||
      totalExportFee !== 0 ||
      profitNoVat !== 0 ||
      exportFeeVat !== 0 ||
      totalExportFee !== 0 ||
      profit !== 0
    ) {
      productDetails.amount = amount;
      productDetails.salePriceUnit = salePriceUnit;
      productDetails.totalExportFee = totalExportFee;
      productDetails.exportFeeVat = exportFeeVat;
      productDetails.profitNoVat = profitNoVat;
      productDetails.totalExportFee = totalExportFee;
      productDetails.profit = profit;
    }
  }, [
    productDetails,
    amount,
    totalExportFee,
    profitNoVat,
    exportFeeVat,
    profit,
    salePriceUnit,
  ]);
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
  const [newDataImport, setNewDataImport] = useState({
    quantity: 0,
    amount: 0,
    costImportUnit: 0,
    costImportTax: 0,
    totalFeeVat: 0,
  });
  const [valueInputOnChange, setValueInputOnChange] = useState(0);
  useEffect(() => {
    if (idProduct && open && luxasCode) {
      fetchGetDetailsProduct(idProduct);
      fetchGetImportProduct(luxasCode);
    }
  }, [idProduct, open, luxasCode]);

  const maxQuantity =
    parseInt(importProduct?.quantity) + parseInt(qtyExportProduct);

  const mutationUpdateImport = useMutationHooks((data) => {
    const { id, ...rest } = data;
    const res = ProductService.updateProduct(id, { ...rest });
    return res;
  });
  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rest } = data;
    const res = ExportProductService.updateExportProduct(id, { ...rest });
    return res;
  });
  const { data: dataUpdate } = mutationUpdate;
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

  useEffect(() => {
    if (dataUpdate?.status === "OK") {
      handleUpDateImportProduct();
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
  const handleSelectVatImport = (e) => {
    setVatImport(e.target.value);
    setProductDetails({
      ...productDetails,
      vat: e.target.value,
    });
  };

  const handleOnChangeQty = (value) => {
    setValueInputOnChange(value);
    setProductDetails({
      ...productDetails,
      quantity: value,
    });
  };
  const handleOnChangeDetails = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

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
  const handleUpDateProduct = (idProduct) => {
    if (valueInputOnChange < 1 || valueInputOnChange > maxQuantity) {
      message.warning(
        `Quantity of products must be less than or equal to ${maxQuantity}`
      );
      setValueInputOnChange(maxQuantity);
    } else if (valueInputOnChange <= qtyExportProduct) {
      setNewDataImport({
        ...newDataImport,
        quantity:
          Number(importProduct?.quantity) +
          (Number(qtyExportProduct) - Number(valueInputOnChange)),
      });

      mutationUpdate.mutate({ id: idProduct, productDetails });
    } else if (valueInputOnChange > qtyExportProduct) {
      setNewDataImport({
        ...newDataImport,
        quantity:
          Number(importProduct?.quantity) -
          (Number(valueInputOnChange) - Number(qtyExportProduct)),
      });
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
                      ? `${process.env.REACT_APP_UPLOAD_URL}/products/images/${productDetails?.image}`
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
                  Quantity: {qtyExportProduct}
                </Typography>
                <InputNumberComponent
                  name="quantity"
                  border="1px solid #004225"
                  height="50px"
                  width="100%"
                  onChange={handleOnChangeQty}
                  defaultValue={qtyExportProduct}
                  max={maxQuantity}
                  min={1}
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
                Export Code:
              </Typography>
              <InputComponent
                vInput={productDetails?.exportCode}
                onChangeInput={handleOnChangeDetails}
                nameInput="exportCode"
                placeholder="Export Code..."
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
                vInput={amount}
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
                Cost Import /Unit:
              </Typography>
              <InputComponent
                vInput={productDetails?.costImportUnit}
                nameInput="costImportUnit"
                placeholder="Cost Import /Unit..."
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
                Total Sale Price/Unit:
              </Typography>
              <InputComponent
                vInput={salePriceUnit}
                nameInput="salePriceUnit"
                placeholder="Total Sale Price/Unit..."
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
                Total Ex Fee No Vat:
              </Typography>
              <InputComponent
                vInput={totalExportFee}
                nameInput="totalExportFee"
                placeholder="Total Export Fee..."
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
                Total Ex Fee Include Vat:
              </Typography>
              <InputComponent
                vInput={exportFeeVat}
                nameInput="exportFeeVat"
                placeholder="Export Fee Vat..."
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
                vInput={profit}
                nameInput="profit"
                placeholder="Profit..."
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
                Profit No Vat:
              </Typography>
              <InputComponent
                vInput={profitNoVat}
                nameInput="profitNoVat"
                placeholder="Profit No Vat..."
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
