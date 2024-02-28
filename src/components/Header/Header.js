import React from "react";
import { Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import avatar from "../../assets/images/avatardefault.png";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { user, handleShowNavbar } = props;

  const items = [
    {
      key: "user-infor",
      label: (
        <Link to="/user-infor">
          <Typography
            sx={{
              color: "#004225",
              fontSize: "14px",
            }}
          >
            User Information
          </Typography>
        </Link>
      ),
    },
  ];

  return (
    <Stack
      sx={{
        flexDirection: "row",
        background: "rgba(255, 255, 255, 0.8)",
        boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
        padding: "0 40px",
        height: "70px",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography
        sx={{ color: "#00b300", fontSize: "25px", fontWeight: "bold" }}
      >
        Luxas
      </Typography>
      <IconButton
        sx={{
          marginLeft: "220px",
          borderRadius: "5px",
          background: "#EDE8F6",
          position: "absolute",
          color: "#5E35B1",
          "&:hover": {
            background: "#5E35B1",
            color: "#EDE8F6",
          },
        }}
        onClick={handleShowNavbar}
      >
        <MenuIcon />
      </IconButton>
      <Stack
        sx={{
          flexDirection: "row",
          marginLeft: "auto",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            marginRight: "20px",
            background: "#EDE8F6",
            color: "#5E35B1",
            padding: "8px",
            borderRadius: "8px",
            "&:hover": {
              background: "#5E35B1",
              color: "#EDE8F6",
            },
          }}
        >
          <NotificationsNoneIcon />
        </Stack>
        <Typography sx={{ marginRight: "20px" }}>{user.name}</Typography>
      </Stack>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
        arrow
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            padding: "7px 10px",
            borderRadius: "30px",
            background: "#1465C0",
            cursor: "pointer",
            boxShadow:
              "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <Avatar
            alt="avatar"
            src={
              user?.image
                ? `${process.env.REACT_APP_UPLOAD_URL}/images/avatar/${user?.image}`
                : avatar
            }
            sx={{
              width: 32,
              height: 32,
              marginRight: "10px",
              border: "3px solid #fff",
            }}
          />
          <SettingsIcon style={{ color: "#fff" }} />
        </Stack>
      </Dropdown>
    </Stack>
  );
};

export default Header;
