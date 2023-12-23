import React, { useState } from "react";
import Header from "../Header/Header";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import Menu from "../Menu/Menu";

const DefaultComponent = ({ children }) => {
  const user = useSelector((state) => state.user);
  const [showNavbar, setShowNavbar] = useState(true);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <Stack>
      <Stack sx={{ position: "fixed", width: "100%", zIndex: 100 }}>
        <Header
          user={user}
          showNavbar={showNavbar}
          handleShowNavbar={handleShowNavbar}
        />
      </Stack>
      <Stack sx={{ flexDirection: "row", marginTop: "70px" }}>
        <Stack
          sx={{
            position: "fixed",
            zIndex: 50,
            width: "300px",
          }}
        >
          <Menu showNavbar={showNavbar} user={user} />
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            marginLeft: showNavbar ? "300px" : "110px",
            width: "100%",
          }}
        >
          <Stack sx={{ width: "100%" }}>{children}</Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DefaultComponent;
