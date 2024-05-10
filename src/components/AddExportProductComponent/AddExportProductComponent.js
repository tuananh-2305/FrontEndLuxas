import { Stack, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import excelImage from "../../assets/images/excel.png";
import wordImage from "../../assets/images/word.png";
import pdfImage from "../../assets/images/pdf.png";
import defaultImage from "../../assets/images/file.png";
import folder from "../../assets/images/folder.png";

const AddExportProductComponent = (props) => {
  const initial = () => ({
    implementer: "",
    luxasCode: "",
    partName: "",
    exportDate: "",
    model: "",
    shCode: 0,
    image: "",
    saleForCompany: "",
    quantity: 0,
    unit: "",
    price: 0,
    amount: 0,
    customerSevice: 0,
    vat: 0,
    shippingFee: 0,
    commission: 0,
    feesIncurred: 0,
    costImportUnit: 0,
    salePriceUnit: 0,
    totalExportFee: 0,
    exportFeeVat: 0,
    profit: 0,
    profitNoVat: 0,
    note: "",
    exportCode: "",
  });
  const { openModalExport, handleCloseModalExport, idProduct } = props;
  const user = useSelector((state) => state.user);
  const [stateExportProduct, setStateExportProduct] = useState(initial());
  const [amount, setAmount] = useState(parseInt(stateExportProduct.amount));
  const [totalExportFee, setTotalExportFee] = useState(
    parseInt(stateExportProduct.totalExportFee)
  );
  const [salePriceUnit, setSalePriceUnit] = useState(
    parseInt(stateExportProduct.salePriceUnit)
  );
  const [exportFeeVat, setExportFeeVat] = useState(
    parseInt(stateExportProduct.exportFeeVat)
  );
  const [profit, setProfit] = useState(parseInt(stateExportProduct.profit));
  const [profitNoVat, setProfitNoVat] = useState(
    parseInt(stateExportProduct.profitNoVat)
  );
  const [dataImportProduct, setDataImportProduct] = useState({
    price: 0,
    quantity: 0,
    importTax: 0,
    vatImport: 0,
    feeShipping: 0,
    costomsService: 0,
    fines: 0,
    amount: 0,
    costImportUnit: 0,
    costImportTax: 0,
    totalFeeVat: 0,
  });
  const [quantityProduct, setQuantityProduct] = useState("");
  const [valueNumberInput, setValueNumberInput] = useState("");
  const fetchGetDetailsProduct = async (idProduct) => {
    const res = await ProductService.getDetailsProduct(idProduct);
    if (res?.data) {
      setStateExportProduct({
        implementer: user?.name,
        luxasCode: res?.data.luxasCode,
        exportDate: "",
        partName: res?.data.partName,
        model: res?.data.model,
        shCode: res?.data.shCode,
        image: res?.data.image,
        saleForCompany: "",
        quantity: res?.data.quantity,
        unit: res?.data.unit,
        exportCode: "",
        price: 0,
        amount: 0,
        customerSevice: 0,
        vat: res?.data.vatImport,
        shippingFee: 0,
        commission: 0,
        feesIncurred: 0,
        costImportUnit: res?.data.costImportUnit,
        note: "",
      });
      setDataImportProduct({
        price: res?.data.price,
        importTax: res?.data.importTax,
        vatImport: res?.data.vatImport,
        feeShipping: res?.data.feeShipping,
        costomsService: res?.data.costomsService,
        fines: res?.data.fines,
      });
      setQuantityProduct(res?.data.quantity);
    }
  };
  useEffect(() => {
    if (!openModalExport) {
      setStateExportProduct(initial());
      setAmount(0);
      setSalePriceUnit(0);
      setTotalExportFee(0);
      setProfit(0);
      setProfitNoVat(0);
      setExportFeeVat(0);
    }
  }, [openModalExport]);

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
      !stateExportProduct.quantity ||
      !stateExportProduct.price ||
      stateExportProduct.price === ""
    ) {
      setAmount(0);
      setSalePriceUnit(0);
      setTotalExportFee(0);
      setProfit(0);
      setProfitNoVat(0);
      setExportFeeVat(0);
    }
    if (stateExportProduct.quantity && stateExportProduct.price) {
      const amountProduct = handleAmountProduct(
        stateExportProduct.quantity,
        stateExportProduct.price
      );
      setAmount(amountProduct.toFixed(2));
    }
    if (
      amount !== 0 &&
      stateExportProduct.quantity &&
      stateExportProduct.quantity !== 0
    ) {
      const totalSalePriceUnit = handleTotalSalePriceUnit(
        amount,
        stateExportProduct.shippingFee,
        stateExportProduct.customerSevice,
        stateExportProduct.commission,
        stateExportProduct.feesIncurred,
        stateExportProduct.quantity
      );
      setSalePriceUnit(totalSalePriceUnit.toFixed(2));
    }
    if (amount !== 0 && stateExportProduct) {
      const totalExportFee = handleTotalExportFee(
        amount,
        stateExportProduct.shippingFee,
        stateExportProduct.customerSevice,
        stateExportProduct.commission,
        stateExportProduct.feesIncurred
      );
      setTotalExportFee(totalExportFee);
    }
    if (stateExportProduct.vat && totalExportFee !== 0) {
      const exportFeeVat = handleExportFeeVat(
        totalExportFee,
        stateExportProduct.vat
      );
      setExportFeeVat(exportFeeVat);
    }
    if (salePriceUnit !== 0 && stateExportProduct) {
      const profitNoVat = handleProfitNoVat(
        salePriceUnit,
        stateExportProduct.quantity,
        stateExportProduct.costImportUnit
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
      stateExportProduct.amount = amount;
      stateExportProduct.salePriceUnit = salePriceUnit;
      stateExportProduct.totalExportFee = totalExportFee;
      stateExportProduct.exportFeeVat = exportFeeVat;
      stateExportProduct.profitNoVat = profitNoVat;
      stateExportProduct.totalExportFee = totalExportFee;
      stateExportProduct.profit = profit;
    }
  }, [
    stateExportProduct,
    amount,
    totalExportFee,
    profitNoVat,
    exportFeeVat,
    profit,
    salePriceUnit,
  ]);

  const inputFileRef = useRef(null);
  const imageConfig = {
    xlsx: excelImage,
    pdf: pdfImage,
    docx: wordImage,
    default: defaultImage,
  };
  const [fileDocumentList, setFileDocumentList] = useState([]);

  const handleUploadDocument = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updateList = [...fileDocumentList, newFile];
      setFileDocumentList(updateList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileDocumentList];
    updatedList.splice(fileDocumentList.indexOf(file), 1);
    setFileDocumentList(updatedList);
  };
  useEffect(() => {
    if (idProduct && openModalExport) {
      fetchGetDetailsProduct(idProduct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProduct, openModalExport]);

  const handleOnChange = (e) => {
    setStateExportProduct({
      ...stateExportProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeQty = (value) => {
    setValueNumberInput(value);
    setStateExportProduct({
      ...stateExportProduct,
      quantity: value,
    });
  };
  useEffect(() => {
    if (dataImportProduct.price && dataImportProduct.quantity) {
      const amountImport =
        Number(dataImportProduct.quantity) * Number(dataImportProduct.price);
      dataImportProduct.amount = amountImport.toFixed(2);
    }
    if (
      dataImportProduct.price &&
      dataImportProduct.quantity &&
      dataImportProduct.importTax &&
      dataImportProduct.feeShipping &&
      dataImportProduct.costomsService &&
      dataImportProduct.fines
    ) {
      const newCostImport =
        Number(dataImportProduct.quantity) * Number(dataImportProduct.price) +
        Number(dataImportProduct.feeShipping) +
        Number(dataImportProduct.costomsService) +
        Number(dataImportProduct.fines);
      const newCostImportTax =
        Number(newCostImport) +
        (Number(newCostImport) * Number(dataImportProduct.importTax)) / 100;
      const newCostImportUnit =
        Number(newCostImportTax) / dataImportProduct.quantity;
      dataImportProduct.costImportTax = newCostImportTax.toFixed(2);
      dataImportProduct.costImportUnit = newCostImportUnit.toFixed(2);
    }
    if (
      dataImportProduct.price &&
      dataImportProduct.quantity &&
      dataImportProduct.importTax &&
      dataImportProduct.feeShipping &&
      dataImportProduct.costomsService &&
      dataImportProduct.fines &&
      dataImportProduct.vatImport
    ) {
      const newCostImport =
        Number(dataImportProduct.quantity) * Number(dataImportProduct.price) +
        Number(dataImportProduct.feeShipping) +
        Number(dataImportProduct.costomsService) +
        Number(dataImportProduct.fines);
      const newCostImportTax =
        Number(newCostImport) +
        (Number(newCostImport) * Number(dataImportProduct.importTax)) / 100;
      const newTotalFeeVat =
        Number(newCostImportTax) +
        (Number(newCostImportTax) * Number(dataImportProduct.vatImport)) / 100;
      dataImportProduct.totalFeeVat = newTotalFeeVat.toFixed(2);
    }
  }, [dataImportProduct]);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rest } = data;
    const res = ProductService.updateProduct(id, { ...rest });
    return res;
  });

  const mutation = useMutationHooks((data) => {
    const res = ExportProductService.exportProduct(data);
    return res;
  });
  const { data } = mutation;
  useEffect(() => {
    if (data?.status === "OK") {
      if (Number(data?.data.quantity) <= Number(quantityProduct)) {
        const formData = new FormData();
        for (const key in dataImportProduct) {
          const value = dataImportProduct[key];
          formData.append(key, value);
        }
        mutationUpdate.mutate({ id: idProduct, formData });
      }
      message.success("Export Product Success");
      handleCloseModalExport();
    } else if (data?.status === "ERR") {
      message.error(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleExportProduct = () => {
    const formData = new FormData();
    if (valueNumberInput < 1 || valueNumberInput > quantityProduct) {
      message.warning(
        `Quantity of products must be less than or equal to ${quantityProduct}`
      );
      setValueNumberInput(quantityProduct);
    } else {
      setDataImportProduct({
        ...dataImportProduct,
        quantity:
          parseInt(quantityProduct) - parseInt(stateExportProduct.quantity),
      });
      for (let i = 0; i < fileDocumentList.length; i++) {
        formData.append("documentFile", fileDocumentList[i]);
      }
      for (const key in stateExportProduct) {
        const value = stateExportProduct[key];
        formData.append(key, value);
      }
      mutation.mutate(formData);
    }
  };
  return (
    <ModalComponent isOpen={openModalExport} onClose={handleCloseModalExport}>
      <Stack
        sx={{
          position: "absolute",
          background: "#fff",
          width: "65%",
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
                    <Image
                      src={
                        stateExportProduct?.image
                          ? `${process.env.REACT_APP_UPLOAD_URL}/products/images/${stateExportProduct?.image}`
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
                    <Grid xs={4}>
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
                        Export Date:
                      </Typography>
                      <InputComponent
                        bgInput="#fff"
                        borderInput="1px solid #004225"
                        typeInput="date"
                        vInput={stateExportProduct.type}
                        onChangeInput={handleOnChange}
                        nameInput="exportDate"
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
          <Stack sx={{ padding: "20px 30px 50px" }}>
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
                  vInput={stateExportProduct?.shCode}
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
                    Quantity: {quantityProduct}
                  </Typography>
                  <InputNumberComponent
                    name="quantity"
                    border="1px solid #004225"
                    height="50px"
                    width="100%"
                    min={1}
                    max={quantityProduct}
                    defaultValue={quantityProduct}
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
                  Export Code:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.type}
                  onChangeInput={handleOnChange}
                  nameInput="exportCode"
                  placeholder="Export Code  ..."
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
                  Price: USD
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
                  Vat: %
                </Typography>
                <InputComponent
                  vInput={stateExportProduct.vat}
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
                  Cost Import / Unit:
                </Typography>
                <InputComponent
                  vInput={stateExportProduct?.costImportUnit}
                  nameInput="costImportUnit"
                  placeholder="Cost/Unit..."
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
                  placeholder="salePriceUnit ..."
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
                  placeholder="Total Export Fee ..."
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
                  Total Ex Include Vat:
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
                  Profit No Vat:
                </Typography>
                <InputComponent
                  vInput={profitNoVat}
                  nameInput="profitNoVat"
                  placeholder="profitNoVat..."
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
              <Grid xs={6}></Grid>
              <Grid xs={3}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    height: "15vh",
                    width: "100%",
                    marginTop: "10px",
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
                      border: "1px dashed #004225",
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
              <Grid xs={9}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    height: "15vh",
                    width: "100%",
                    overflow: "hidden",
                    border: "1px solid #004225",
                    borderRadius: "5px",
                    marginTop: "10px",
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
                              border: "0.1px solid #004225",
                              padding: "10px",
                              alignItems: "center",
                              borderRadius: "5px",
                              background: "#F2F3F5",
                              marginRight:
                                index === fileDocumentList.length - 1
                                  ? "0"
                                  : "10px",
                            }}
                            key={index}
                          >
                            <Image
                              src={
                                imageConfig[file.type.split("/")[1]] ||
                                imageConfig["default"]
                              }
                              style={{ width: "30px", height: "30px" }}
                            />
                            <Typography
                              sx={{
                                fontSize: "13px",
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
