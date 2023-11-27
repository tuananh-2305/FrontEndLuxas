import { InputBase, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "mui-image";
import imgbg from "../../assets/images/bglogin.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ButtonComponent from "../../components/common/ButtonComponent/ButtonComponent";

const AddImportProductPage = () => {
  const [addImgProduct, setAddImgProduct] = useState("");
  const [selectStatus, setSelectStatus] = useState("Import");
  const handleSelectStatus = (e) => {
    setSelectStatus(e.target.value);
  };
  const handleAddImgProduct = (e) => {
    setAddImgProduct(e.target.files[0].name);
  };
  console.log(addImgProduct);
  return (
    <Stack
      sx={{
        margin: "30px",
        background: "#F2F3F5",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Stack sx={{ flexDirection: "row" }}>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            background: "#3F0072",
            padding: "40px 50px",
            borderBottomRightRadius: "35%",
          }}
        >
          <Stack
            sx={{
              height: "150px",
              width: "150px",
              borderRadius: "25px",
              overflow: "hidden",
              border: "6px solid #fff",
              boxShadow:
                "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
            }}
          >
            <Image src={imgbg} />
          </Stack>
          <Stack
            sx={{
              position: "relative",
              width: "110px",
              height: "40px",
              cursor: "pointer",
              background: "#fff",
              color: "",
              borderRadius: "5px",
              marginTop: "20px",
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
              <InputBase type="file" onChange={handleAddImgProduct} />
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
              <Typography sx={{ marginLeft: "10px" }}>Upload</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{
            padding: "50px",
            borderBottom: "1px dotted #333",
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
                placeholder="Import Date ..."
                bgInput="#fff"
                borderInput="1px solid #3F0072"
                typeInput="date"
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
                  value={selectStatus}
                  onChange={handleSelectStatus}
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
                placeholder="Part Name ..."
                bgInput="#fff"
                borderInput="1px solid #3F0072"
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
      <Stack sx={{ padding: "30px 50px 50px" }}>
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
              Quality:
            </Typography>
            <InputComponent
              placeholder="Quality ..."
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
              Vax Import:
            </Typography>
            <InputComponent
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
              Costoms Fee:
            </Typography>
            <InputComponent
              placeholder="Costoms Fee ..."
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
              placeholder="Note  ..."
              bgInput="#fff"
              borderInput="1px solid #3F0072"
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={{ margin: "0 50px 50px auto" }}>
        <ButtonComponent
          textButton="Add Product"
          bgButton="#3F0072"
          hoverBtn="#1465C0"
          paddingBtn="14px 20px"
        />
      </Stack>
    </Stack>
  );
};

export default AddImportProductPage;
