import { Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Unstable_Grid2";
import avatar from "../../assets/images/bglogin.jpg";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ButtonComponent from "./../../components/common/ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import * as UserService from "../../service/UserService";
import { useSelector } from "react-redux";
import AddUserPage from "../AddUserPage/AddUserPage";
import { Dropdown } from "antd";
import DrawerUserComponent from "../../components/common/DrawerUserComponent/DrawerUserComponent";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as message from "../../components/common/MessageComponent/MessageComponent";
import DeleteModalComponent from "../../components/common/DeleteModalComponent/DeleteModalComponent";

const UserPage = () => {
  const items = [
    {
      key: "edit",
      label: (
        <Stack
          sx={{
            color: "#3F0072",
            padding: "3px 0",
          }}
        >
          <EditIcon fontSize="small" />
        </Stack>
      ),
    },
    {
      key: "delete",
      label: (
        <Stack
          sx={{
            color: "#FF5630",
            padding: "3px 0",
          }}
        >
          <DeleteIcon fontSize="small" />
        </Stack>
      ),
    },
  ];
  const [openModalUser, setOpenModalUser] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [openModalDeLete, setOpenModalDeLete] = useState(false);
  const user = useSelector((state) => state.user);

  const handleOpenAddUser = () => {
    setOpenModalUser(true);
  };
  const handleCloseAddUser = () => {
    setOpenModalUser(false);
  };

  const handleshowDrawer = (id) => {
    setOpenDrawer(true);
    setIdUser(id);
  };

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    return { data: res?.data, key: "users" };
  };

  const { data: users } = useQuery({
    queryKey: ["getAllUser"],
    queryFn: () => getAllUsers(),
  });

  const handleShowModal = (id) => {
    setIdUser(id);
    setOpenModalDeLete(true);
  };
  const handleCloseModal = () => {
    setOpenModalDeLete(false);
    setIdUser("");
  };

  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    console.log(data);
    const res = UserService.deleteUser(id, token);
    return res;
  });
  const { data: dataDelete } = mutationDelete;

  useEffect(() => {
    if (dataDelete?.status === "OK") {
      message.success("Delete User Success");
      handleCloseModal();
    } else if (dataDelete?.status === "ERR") {
      message.error(dataDelete?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDelete]);
  const handleDeleteUser = () => {
    mutationDelete.mutate({ id: idUser, token: user?.access_token });
  };

  return (
    <Stack sx={{ padding: "35px" }}>
      <AddUserPage
        openModalUser={openModalUser}
        handleCloseAddUser={handleCloseAddUser}
      />
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "35px",
        }}
      >
        <Typography
          sx={{ fontSize: "30px", fontWeight: "bold", color: "#1465C0" }}
        >
          User
        </Typography>
        <Stack sx={{ marginLeft: "auto" }}>
          <ButtonComponent
            iconButton={<AddIcon />}
            textButton="Add User"
            bgButton="#1465C0"
            hoverBtn="#5E35B1"
            paddingBtn="10px"
            onClickBtn={() => handleOpenAddUser()}
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          backgroundColor: "#F2F3F5",
          padding: "30px",
          flexDirection: "row",
          alignItems: "center",
          borderTopRightRadius: "15px",
          borderTopLeftRadius: "15px",
        }}
      >
        <InputComponent
          placeholder="Search"
          iconInput={<SearchIcon />}
          borderInput=".1px solid #333"
          wInput="30%"
          bgInput="#fff"
        />
        <Stack
          sx={{
            background: "#1465C0",
            marginLeft: "auto",
            padding: "5px",
            borderRadius: "5px",
            color: "#fff",
            cursor: "pointer",
            boxShadow:
              "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <TuneIcon />
        </Stack>
      </Stack>
      <Stack sx={{ marginTop: "30px", background: "#F2F3F5", padding: "30px" }}>
        <Grid container spacing={4}>
          {users?.data.map((user, index) => (
            <Grid xs={4} key={index}>
              <Stack
                sx={{
                  position: "relative",
                  padding: "25px 20px",
                  background: "#fff",
                  borderRadius: "5px",
                  boxShadow:
                    "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    sx={{
                      border: "0.05px solid #E6E6E6",
                      borderRadius: "50%",
                      overflow: "hidden",
                      position: "relative",
                      boxShadow:
                        "rgba(20, 20, 20, 0.4) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.4) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <Stack
                      sx={{
                        border: "5px solid #fff",
                      }}
                    >
                      <Avatar
                        alt="avatar"
                        src={avatar}
                        sx={{ width: 150, height: 150 }}
                      />
                      <Stack
                        sx={{
                          position: "absolute",
                          background: "rgba(255, 255, 255, 0.8)",
                          height: "30px",
                          width: "140px",
                          rotate: "38deg",
                          top: "18px",
                          left: "48px",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {user.isAdmin ? "Admin" : "User"}
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack
                    sx={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      background: "#1465C0",
                      borderRadius: "5px",
                      boxShadow:
                        "rgba(20, 20, 20, 0.4) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.4) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <Dropdown
                      menu={{
                        items,
                        onClick: ({ key }) => {
                          if (key === "edit") {
                            handleshowDrawer(user._id);
                          } else {
                            handleShowModal(user._id);
                          }
                        },
                      }}
                      placement="bottom"
                    >
                      <Stack
                        sx={{
                          color: "#fff",
                          padding: "8px",
                          cursor: "pointer",
                        }}
                      >
                        <MoreVertIcon />
                      </Stack>
                    </Dropdown>
                  </Stack>
                </Stack>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "25px",
                    textAlign: "center",
                    margin: "25px 0",
                  }}
                >
                  {user.name}
                </Typography>
                <Stack sx={{}}>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      marginBottom: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        marginRight: "10px",
                        fontSize: "16px",
                      }}
                    >
                      ID :
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#1465C0",
                        fontWeight: "bold",
                        marginLeft: "34px",
                      }}
                    >
                      {user.idLuxas}
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      marginBottom: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                      }}
                    >
                      Email :
                    </Typography>
                    <Typography
                      sx={{
                        marginLeft: "16px",
                        fontSize: "16px",
                        color: "#1465C0",
                        fontWeight: "bold",
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Stack>
                  <Stack sx={{ flexDirection: "row", marginBottom: "15px" }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                      }}
                    >
                      Phone :
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#1465C0",
                        fontWeight: "bold",
                        marginLeft: "10px",
                      }}
                    >
                      {user.phone}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <DrawerUserComponent
        open={openDrawer}
        setOpenDrawer={setOpenDrawer}
        idUser={idUser}
        setIdUser={setIdUser}
      />
      <DeleteModalComponent
        openModalDeLete={openModalDeLete}
        handleCloseModalDelete={() => handleCloseModal()}
        handleDelete={() => handleDeleteUser()}
        titleDelete="Delete User"
        alertDelete="Do you want to delete user ?"
        bgDelete="#1465C0"
      />
    </Stack>
  );
};

export default UserPage;
