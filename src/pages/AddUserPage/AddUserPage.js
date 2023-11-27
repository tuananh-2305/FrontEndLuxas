import { InputBase, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "mui-image";
import imgbg from "../../assets/images/bglogin.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ButtonComponent from "./../../components/common/ButtonComponent/ButtonComponent";

const AddUserPage = () => {
  const [addImgProduct, setAddImgProduct] = useState("");
  const [selectStatus, setSelectStatus] = useState("Admin");
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
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        background: "#F2F3F5",
      }}
    >
      <Stack sx={{ flexDirection: "row" }}>
        <Stack
          sx={{
            alignItems: "center",
            padding: "40px 50px",
          }}
        >
          <Stack
            sx={{
              height: "150px",
              width: "150px",
              overflow: "hidden",
              border: "6px solid #fff",
              borderRadius: "50%",
              boxShadow:
                "rgba(20, 20, 20, 0.5) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.4) 0rem 0.125rem 0.25rem -0.0625rem",
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
              background: "#1465C0",
              color: "#fff",
              borderRadius: "5px",
              marginTop: "15px",
              boxShadow:
                "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.1) 0rem 0.125rem 0.25rem -0.0625rem",
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
              }}
            >
              <CloudUploadIcon />
              <Typography sx={{ marginLeft: "10px" }}>Upload</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{
            padding: "50px 50px 50px 0",
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
                Position:
              </Typography>
              <Stack sx={{ width: "100%" }}>
                <Select
                  value={selectStatus}
                  onChange={handleSelectStatus}
                  displayEmpty
                  sx={{
                    height: "50px",
                    border: "1px solid #1465C0",
                    textAlign: "center",
                    background: "#fff",
                  }}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
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
                Name:
              </Typography>
              <InputComponent
                placeholder="Name ..."
                bgInput="#fff"
                borderInput="1px solid #1465C0"
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
                Phone Number:
              </Typography>
              <InputComponent
                placeholder="Phone Number ..."
                bgInput="#fff"
                borderInput="1px solid #1465C0"
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
                Email:
              </Typography>
              <InputComponent
                placeholder="Email ..."
                bgInput="#fff"
                borderInput="1px solid #1465C0"
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
      <Stack sx={{ margin: "0 50px 50px auto" }}>
        <ButtonComponent
          textButton="Add User"
          bgButton="#1465C0"
          hoverBtn="#5E35B1"
          paddingBtn="14px 20px"
        />
      </Stack>
    </Stack>
  );
};

export default AddUserPage;
