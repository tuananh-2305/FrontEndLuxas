import { Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Unstable_Grid2";
import avatar from "../../assets/images/avatardefault.png";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ButtonComponent from "../../components/common/ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import * as UserService from "../../service/UserService";
import { useSelector } from "react-redux";
import AddUserComponent from "../../components/AddUserComponent/AddUserComponent";
import { Dropdown } from "antd";
import UpdateUserComponent from "../../components/UpdateUserComponent/UpdateUserComponent";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as message from "../../components/common/MessageComponent/MessageComponent";
import DeleteModalComponent from "../../components/common/DeleteModalComponent/DeleteModalComponent";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

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

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      background: "#1465C0",
      fontSize: "15px",
      padding: "10px",
    },
  });
  const [openModalUser, setOpenModalUser] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [openModalDeLete, setOpenModalDeLete] = useState(false);
  const [stateUser, setStateUser] = useState([]);
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
    const res = await UserService.getAllUser();
    return res;
  };

  const { data: users } = useQuery({
    queryKey: ["getAllUser"],
    queryFn: getAllUsers,
  });
  useEffect(() => {
    if (users?.data?.length > 0) {
      setStateUser(users?.data);
    }
  }, [users]);

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
    const res = UserService.deleteUser(id, token);
    return res;
  });
  const { data: dataDelete } = mutationDelete;

  useEffect(() => {
    if (dataDelete?.status === "OK") {
      handleCloseModal();
      message.success("Delete User Success");
      getAllUsers();
    } else if (dataDelete?.status === "ERR") {
      message.error(dataDelete?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDelete]);
  const handleDeleteUser = () => {
    mutationDelete.mutate({ id: idUser, token: user?.access_token });
  };

  return (
    <Stack sx={{ padding: "30px" }}>
      <AddUserComponent
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
            hoverBtn="#3C416F"
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
          borderInput="1px solid #1465C0"
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
          {stateUser?.map((user, index) => (
            <Grid xs={4} key={index}>
              <Stack
                sx={{
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
                    position: "relative",
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
                        src={
                          user?.image
                            ? `${process.env.REACT_APP_UPLOAD_URL}/images/avatar/${user?.image}`
                            : avatar
                        }
                        sx={{ width: 120, height: 120 }}
                      />
                      <Stack
                        sx={{
                          position: "absolute",
                          background: "#1465C0",
                          height: "20%",
                          width: "60%",
                          rotate: "45deg",
                          top: "18px",
                          left: "65px",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "17px",
                          fontWeight: "bold",
                          color: "#fff",
                          borderBottomLeftRadius: "25px",
                          borderBottomRightRadius: "25px",
                        }}
                      >
                        {user.isAdmin ? "Admin" : "User"}
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack
                    sx={{
                      position: "absolute",
                      top: "0",
                      right: "0",
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
                <Stack>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      marginBottom: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        marginRight: "10px",
                      }}
                    >
                      ID :
                    </Typography>
                    <Typography
                      sx={{
                        color: "#1465C0",
                        fontWeight: "bold",
                        marginLeft: "29px",
                      }}
                    >
                      {user?.idLuxas}
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      marginBottom: "15px",
                      flexDirection: "row",
                    }}
                  >
                    <Typography sx={{ marginRight: "10px" }}>
                      Email :
                    </Typography>
                    <Typography
                      sx={{
                        color: "#1465C0",
                        fontWeight: "bold",
                        marginLeft: "5px",
                      }}
                    >
                      {user?.email.length > 20
                        ? user?.email.slice(0, 17)
                        : user?.email}
                    </Typography>
                    {user?.email.length > 20 ? (
                      <CustomWidthTooltip title={user?.email} placement="top">
                        <Typography
                          sx={{
                            marginLeft: "5px",
                            background: "#F2F3F5",
                            padding: "0 5px",
                            cursor: "pointer",
                            boxShadow:
                              "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                          }}
                        >
                          ...
                        </Typography>
                      </CustomWidthTooltip>
                    ) : (
                      ""
                    )}
                  </Stack>
                  <Stack sx={{ flexDirection: "row", marginBottom: "15px" }}>
                    <Typography sx={{ marginRight: "10px" }}>
                      Phone :
                    </Typography>
                    <Typography
                      sx={{
                        color: "#1465C0",
                        fontWeight: "bold",
                      }}
                    >
                      {user?.phone}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <UpdateUserComponent
        open={openDrawer}
        setOpenDrawer={setOpenDrawer}
        idUser={idUser}
        setIdUser={setIdUser}
        getAllUsers={() => getAllUsers()}
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
