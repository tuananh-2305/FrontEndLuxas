import React from "react";
import { Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import bglogin from "../../assets/images/bglogin.jpg";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";

const Header = (props) => {
  const { handleShowNavbar } = props;
  return (
    <Stack
      sx={{
        flexDirection: "row",
        background: "rgba(255, 255, 255, 0.8)",
        boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
        padding: "0 40px",
        height: "70px",
        alignItems: "center",
        position: "fixed",
        width: "100%",
        zIndex: "100",
      }}
    >
      <Typography
        sx={{ color: "#00b300", fontSize: "25px", fontWeight: "bold" }}
      >
        Luxas
      </Typography>
      <IconButton
        sx={{
          marginLeft: "10%",
          borderRadius: "5px",
          background: "#EDE8F6",
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
        sx={{ flexDirection: "row", marginLeft: "auto", alignItems: "center" }}
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
        <Typography sx={{ marginRight: "20px" }}>Tuan Anh</Typography>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            padding: "8px 10px",
            borderRadius: "30px",
            background: "#e6e6e6",
            cursor: "pointer",
            "&:hover": {
              background: "#00aaff",
              color: "#fff",
            },
          }}
        >
          <Avatar
            alt="avatar"
            src={bglogin}
            sx={{
              width: 32,
              height: 32,
              marginRight: "15px",
              border: "3px solid #fff",
            }}
          />
          <SettingsIcon />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
