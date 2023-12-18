import Modal from "@mui/material/Modal";
import { InputBase, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "mui-image";
import imgbg from "../../assets/images/bglogin.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ButtonComponent from "../../components/common/ButtonComponent/ButtonComponent";
// import * as message from "../../components/common/MessageComponent/MessageComponent";
import ClearIcon from "@mui/icons-material/Clear";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as UserService from "../../service/UserService";
// import { useSelector } from "react-redux";
import * as message from "../../components/common/MessageComponent/MessageComponent";

const AddUserPage = (props) => {
  const initial = () => ({
    isAdmin: "false",
    image: "1",
    idLuxas: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { openModalUser, handleCloseAddUser } = props;
  const [stateUser, setStateUser] = useState(initial());
  const [selectStatus, setSelectStatus] = useState("false");

  // const user = useSelector((state) => state.user);

  const mutationUser = useMutationHooks((data) => {
    const { isAdmin, image, idLuxas, name, email, phone, password } = data;
    const res = UserService.registerUser({
      isAdmin,
      image,
      idLuxas,
      name,
      email,
      phone,
      password,
    });
    return res;
  });
  const { data } = mutationUser;

  useEffect(() => {
    if (data?.status === "OK") {
      handleCloseAddUser();
      message.success("Add Product Success");
    } else if (data?.status === "ERR") {
      message.error(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectStatus = (e) => {
    setSelectStatus(e.target.value);
    setStateUser({
      ...stateUser,
      status: e.target.value,
    });
  };

  const handleAddUser = () => {
    mutationUser.mutate(stateUser);
  };

  return (
    <Modal open={openModalUser} onClose={handleCloseAddUser}>
      <Stack
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
          position: "absolute",
          background: "#F2F3F5",
          width: "60%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "30px 40px",
        }}
      >
        <Stack
          sx={{
            marginLeft: "auto",
            cursor: "pointer",
            padding: "5px",
            borderRadius: "5px",
            background: "#fff",
            zIndex: "1",
            "&:hover": {
              background: "#1465C0",
              color: "#fff",
            },
          }}
          onClick={handleCloseAddUser}
        >
          <ClearIcon />
        </Stack>
        <Grid container spacing={4}>
          <Grid xs={3}>
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
                    value={stateUser.type}
                    onChange={handleOnChange}
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
          <Grid xs={9}>
            <Stack>
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
                      onChange={handleSelectStatus}
                      value={selectStatus}
                      displayEmpty
                      sx={{
                        height: "50px",
                        border: "1px solid #1465C0",
                        textAlign: "center",
                        background: "#fff",
                      }}
                    >
                      <MenuItem value="true">Admin</MenuItem>
                      <MenuItem value="false">User</MenuItem>
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
                    vInput={stateUser.type}
                    onChangeInput={handleOnChange}
                    nameInput="name"
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
                    vInput={stateUser.type}
                    onChangeInput={handleOnChange}
                    nameInput="phone"
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
                    vInput={stateUser.type}
                    onChangeInput={handleOnChange}
                    nameInput="email"
                    placeholder="Email ..."
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
                    IdLuxas:
                  </Typography>
                  <InputComponent
                    vInput={stateUser.type}
                    onChangeInput={handleOnChange}
                    nameInput="idLuxas"
                    placeholder="IdLuxas ..."
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
                    Password:
                  </Typography>
                  <InputComponent
                    vInput={stateUser.type}
                    onChangeInput={handleOnChange}
                    nameInput="password"
                    placeholder="Password ..."
                    bgInput="#fff"
                    borderInput="1px solid #1465C0"
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        <Stack sx={{ margin: "40px 0 10px auto" }}>
          <ButtonComponent
            textButton="Add User"
            bgButton="#1465C0"
            hoverBtn="#5E35B1"
            paddingBtn="14px 20px"
            onClickBtn={handleAddUser}
          />
        </Stack>
      </Stack>
    </Modal>
  );
};
export default AddUserPage;
