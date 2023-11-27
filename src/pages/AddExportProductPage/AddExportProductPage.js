import { InputBase, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "mui-image";
import imgbg from "../../assets/images/bglogin.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import ButtonComponent from "../../components/common/ButtonComponent/ButtonComponent";

const AddExportProductPage = () => {
  const [addImgProduct, setAddImgProduct] = useState("");

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
            background: "#004225",
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
                Export date:
              </Typography>
              <InputComponent
                placeholder="Import Date ..."
                bgInput="#fff"
                borderInput="1px solid #004225"
                typeInput="date"
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
                Sales For Copany Name :
              </Typography>
              <InputComponent
                placeholder="Copany Name ..."
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
                Quality:
              </Typography>
              <InputComponent
                placeholder="Quality.."
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
                Price:
              </Typography>
              <InputComponent
                placeholder="Price ..."
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
                Amount:
              </Typography>
              <InputComponent
                placeholder="Amount ..."
                bgInput="#fff"
                borderInput="1px solid #004225"
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
      <Stack sx={{ padding: "30px 50px 50px" }}>
        <Grid container spacing={4}>
          <Grid xs={12}>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Customer sevice:
            </Typography>
            <InputComponent
              placeholder="Customer sevice ..."
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
              Vat %:
            </Typography>
            <InputComponent
              placeholder="Vat % ..."
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
              Shipping fee:
            </Typography>
            <InputComponent
              placeholder=" Shipping fee ..."
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
              Commission:
            </Typography>
            <InputComponent
              placeholder="Commission ..."
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
              Fees incurred (if any):
            </Typography>
            <InputComponent
              placeholder="Fees incurred ..."
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
              Quality:
            </Typography>
            <InputComponent
              placeholder="Quality ..."
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
              Profit:
            </Typography>
            <InputComponent
              placeholder="Profit ..."
              bgInput="#fff"
              borderInput="1px solid #004225"
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
                Note:
              </Typography>
              <TextField
                placeholder="Description ..."
                rows={2}
                multiline
                variant="outlined"
                sx={{
                  border: "1px solid #004225",
                  borderRadius: "5px",
                  background: "#fff",
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={{ margin: "0 50px 50px auto" }}>
        <ButtonComponent
          textButton="Add Product"
          bgButton="#004225"
          hoverBtn="#1465C0"
          paddingBtn="14px 20px"
        />
      </Stack>
    </Stack>
  );
};

export default AddExportProductPage;
