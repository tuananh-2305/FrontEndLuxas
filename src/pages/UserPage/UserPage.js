import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import avatar from "../../assets/images/bglogin.jpg";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ButtonComponent from "./../../components/common/ButtonComponent/ButtonComponent";

const UserPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const open = Boolean(showEdit);
  const handleClick = (e) => {
    setShowEdit(e.currentTarget);
  };
  const handleClose = () => {
    setShowEdit(null);
  };

  return (
    <Stack sx={{ padding: "35px" }}>
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
          <Link to="/add-user">
            <ButtonComponent
              iconButton={<AddIcon />}
              textButton="Add User"
              bgButton="#1465C0"
              hoverBtn="#5E35B1"
              paddingBtn="10px"
            />
          </Link>
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
            marginLeft: "auto",
            padding: "5px",
            borderRadius: "5px",
            border: "0.1px solid #333",
          }}
        >
          <TuneIcon />
        </Stack>
      </Stack>
      <Stack sx={{ marginTop: "30px", background: "#F2F3F5", padding: "30px" }}>
        <Grid container spacing={4}>
          <Grid xs={4}>
            <Stack
              sx={{
                position: "relative",
                padding: "30px",
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
                      Admin
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
                      "rgba(20, 20, 20, 0.2) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.1) 0rem 0.125rem 0.25rem -0.0625rem",
                  }}
                >
                  <IconButton
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ color: "#fff" }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={showEdit}
                    open={open}
                    onClose={handleClose}
                    sx={{ top: "3px" }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      sx={{
                        color: "#1465C0",
                        padding: "10px ",
                        "&:hover": {
                          background: "#1465C0",
                          color: "#fff",
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      sx={{
                        color: "#FF5630",
                        padding: "10px",
                        "&:hover": {
                          background: "#FF5630",
                          color: "#fff",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </MenuItem>
                  </Menu>
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
                Pham Tuan Anh
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
                      fontSize: "18px",
                    }}
                  >
                    ID :
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#1465C0",
                      fontWeight: "bold",
                      marginLeft: "34px",
                    }}
                  >
                    ID123
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
                      fontSize: "18px",
                    }}
                  >
                    Email :
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: "16px",
                      fontSize: "18px",
                      color: "#1465C0",
                      fontWeight: "bold",
                    }}
                  >
                    pta2305@gmail.com
                  </Typography>
                </Stack>
                <Stack sx={{ flexDirection: "row", marginBottom: "15px" }}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                    }}
                  >
                    Phone :
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#1465C0",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                  >
                    0834549697
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={4}>
            <Stack sx={{ background: "#F2F3F5" }}>b</Stack>
          </Grid>
          <Grid xs={4}>
            <Stack sx={{ background: "#F2F3F5" }}>c</Stack>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default UserPage;
