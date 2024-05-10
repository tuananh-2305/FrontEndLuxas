import { Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Image from "mui-image";
import avatar from "../../assets/images/avatardefault.png";
import SelectYearComponent from "../../components/common/SelectYearComponent/SelectYearComponent";

const UserInfoPage = () => {
  const user = useSelector((state) => state.user);
  return (
    <Stack
      sx={{
        background: "#F2F3F5",
        padding: "30px",
        margin: "30px",
      }}
    >
      <Stack>
        <SelectYearComponent />
      </Stack>
      <Grid container spacing={4}>
        <Grid xs={4}>
          <Stack sx={{ alignItems: "center" }}>
            <Stack
              sx={{
                height: "115px",
                width: "115px",
                overflow: "hidden",
                border: "5px solid #18C1E8",
                boxShadow:
                  "rgba(20, 20, 20, 0.5) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.4) 0rem 0.125rem 0.25rem -0.0625rem",
              }}
            >
              <Image
                src={
                  user?.image
                    ? `${process.env.REACT_APP_UPLOAD_URL}/avatar/${user?.image}`
                    : avatar
                }
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={4}>
          <Stack>
            <Grid container spacing={4}>
              <Grid xs={12}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    sx={{
                      padding: "10px",
                      borderRadius: "5px",
                      marginRight: "20px",
                      background: "#18C1E8",
                      color: "#fff",
                      boxShadow:
                        "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <AdminPanelSettingsIcon fontSize="medium" />
                  </Stack>
                  <Typography
                    sx={{
                      borderBottom: "1px solid #1465C0",
                      fontSize: "20px",
                      color: "#1465C0",
                      textShadow: "1px 1px",
                    }}
                  >
                    {user?.isAdmin ? "Admin" : "User"}
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12}>
                <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                  <Stack
                    sx={{
                      padding: "10px",
                      borderRadius: "5px",
                      marginRight: "20px",
                      background: "#18C1E8",
                      color: "#fff",
                      boxShadow:
                        "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <PersonIcon fontSize="medium" />
                  </Stack>
                  <Typography
                    sx={{
                      borderBottom: "1px solid #1465C0",
                      fontSize: "20px",
                      color: "#1465C0",
                      textShadow: "1px 1px",
                    }}
                  >
                    {user?.name}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid xs={4}>
          <Stack>
            <Grid container spacing={4}>
              <Grid xs={12}>
                <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                  <Stack
                    sx={{
                      padding: "10px",
                      borderRadius: "5px",
                      marginRight: "20px",
                      background: "#18C1E8",
                      color: "#fff",
                      boxShadow:
                        "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <EmailIcon fontSize="medium" />
                  </Stack>
                  <Typography
                    sx={{
                      borderBottom: "1px solid #1465C0",
                      fontSize: "20px",
                      color: "#1465C0",
                      textShadow: "1px 1px",
                    }}
                  >
                    {user?.email}
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12}>
                <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                  <Stack
                    sx={{
                      padding: "10px",
                      borderRadius: "5px",
                      marginRight: "20px",
                      background: "#18C1E8",
                      color: "#fff",
                      boxShadow:
                        "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <LocalPhoneIcon fontSize="medium" />
                  </Stack>
                  <Typography
                    sx={{
                      borderBottom: "1px solid #1465C0",
                      fontSize: "20px",
                      color: "#1465C0",
                      textShadow: "1px 1px",
                    }}
                  >
                    {user?.phone}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default UserInfoPage;
