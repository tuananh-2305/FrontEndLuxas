import { Button, Drawer } from "antd";
import { InputBase, Stack, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import InputComponent from "../InputComponent/InputComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "mui-image";
import imgbg from "../../../assets/images/bg7.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useMutationHooks } from "../../../hook/useMutationHook";
import * as UserService from "../../../service/UserService";
import * as message from "../MessageComponent/MessageComponent";
const DrawerUserComponent = (props) => {
  const initial = () => ({
    isAdmin: false,
    image: "1",
    idLuxas: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { open, idUser, setOpenDrawer, setIdUser } = props;
  const [image, setImage] = useState("");
  const [inforUser, setInforUser] = useState(initial());

  const inputRef = useRef(null);

  const fetchGetDetailsUser = async (idUser) => {
    const res = await UserService.getDetailsUser(idUser);
    if (res?.data) {
      setInforUser({
        isAdmin: res?.data.isAdmin,
        image: res?.data.image,
        idLuxas: res?.data.idLuxas,
        name: res?.data.name,
        email: res?.data.email,
        phone: res?.data.phone,
        password: "",
      });
    }
  };
  useEffect(() => {
    if (idUser && open) {
      fetchGetDetailsUser(idUser);
    }
  }, [idUser, open]);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rest } = data;
    const res = UserService.updateUser(id, { ...rest });
    return res;
  });
  const { data: dataUpdate } = mutationUpdate;

  useEffect(() => {
    if (dataUpdate?.status === "OK") {
      message.success("Update User Success");
      handleCloseDrawer();
    } else if (dataUpdate?.status === "ERR") {
      message.error(dataUpdate?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdate]);

  const handleAddImgUser = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setIdUser("");
    setInforUser(initial());
  };

  const handleSelectPosition = (e) => {
    setInforUser({
      ...inforUser,
      isAdmin: e.target.value,
    });
  };

  const handleOnChangeDetails = (e) => {
    setInforUser({
      ...inforUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpDateUser = () => {
    mutationUpdate.mutate({ id: idUser, inforUser });
  };

  return (
    <Stack>
      <Drawer
        title="Update User"
        placement="right"
        width={500}
        onClose={handleCloseDrawer}
        closable={false}
        open={open}
        extra={
          <>
            <Button
              onClick={() => handleCloseDrawer()}
              style={{ height: "40px", marginRight: "20px" }}
            >
              Cancel
            </Button>
            <Button
              style={{
                width: "70px",
                height: "40px",
                background: "#1465C0",
                color: "#fff",
              }}
              onClick={() => handleUpDateUser()}
            >
              OK
            </Button>
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Stack
              sx={{
                alignItems: "center",
                marginTop: "25px",
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
                <Image src={image ? URL.createObjectURL(image) : imgbg} />
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
                  marginTop: "10%",
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
                    zIndex: "5",
                    opacity: "0",
                  }}
                >
                  <InputBase
                    type="file"
                    ref={inputRef}
                    onChange={handleAddImgUser}
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
                  }}
                >
                  <CloudUploadIcon />
                  <Typography sx={{ marginLeft: "10px" }}>Upload</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={6}>
            <Stack>
              <Grid container spacing={2}>
                <Grid xs={12}>
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
                      name="isAdmin"
                      onChange={handleSelectPosition}
                      value={inforUser?.isAdmin === true ? "Admin" : "User"}
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
                <Grid xs={12}>
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
                    vInput={inforUser?.phone}
                    onChangeInput={handleOnChangeDetails}
                    nameInput="phone"
                    placeholder="Phone Number ..."
                    bgInput="#fff"
                    borderInput="1px solid #1465C0"
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
                    IdLuxas:
                  </Typography>
                  <InputComponent
                    vInput={inforUser?.idLuxas}
                    onChangeInput={handleOnChangeDetails}
                    nameInput="idLuxas"
                    placeholder="IdLuxas ..."
                    bgInput="#fff"
                    borderInput="1px solid #1465C0"
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={12}>
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
              vInput={inforUser?.name}
              onChangeInput={handleOnChangeDetails}
              nameInput="name"
              placeholder="Name ..."
              bgInput="#fff"
              borderInput="1px solid #1465C0"
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
              Email:
            </Typography>
            <InputComponent
              vInput={inforUser?.email}
              onChangeInput={handleOnChangeDetails}
              nameInput="email"
              placeholder="Email ..."
              bgInput="#fff"
              borderInput="1px solid #1465C0"
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
              Password:
            </Typography>
            <InputComponent
              vInput={inforUser?.password}
              onChangeInput={handleOnChangeDetails}
              nameInput="password"
              placeholder="Password ..."
              bgInput="#fff"
              borderInput="1px solid #1465C0"
            />
          </Grid>
        </Grid>
      </Drawer>
    </Stack>
  );
};
export default DrawerUserComponent;
