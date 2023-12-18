import { Stack, Typography } from "@mui/material";
import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Grid from "@mui/material/Unstable_Grid2";

const HomePage = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        background: "#F2F3F5",
        margin: "30px",
        flexDirection: "row",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Grid xs={4}>
        <Stack
          sx={{
            background: "#5E35B1",
            width: "100%",
            height: "100%",
            padding: "30px",
            marginRight: "30px",
            borderRadius: "10px",
            boxShadow:
              "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <Stack
            sx={{
              background: "#4527A0",
              color: "#fff",
              padding: "15px",
              marginRight: "auto",
              borderRadius: "10px",
              boxShadow:
                "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
            }}
          >
            <ShoppingBagIcon />
          </Stack>
          <Stack sx={{ color: "#fff", marginTop: "auto" }}>
            <Typography sx={{ fontSize: "35px", fontWeight: "bold" }}>
              500
            </Typography>
            <Typography sx={{ color: "#F2F3F5" }}>Total Product</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={4}>
        <Stack
          sx={{
            background: "#20A1FF",
            width: "100%",
            height: "100%",
            padding: "30px",
            marginRight: "30px",
            borderRadius: "10px",
            boxShadow:
              "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <Stack
            sx={{
              background: "#1465C0",
              color: "#fff",
              padding: "15px",
              marginRight: "auto",
              borderRadius: "10px",
              boxShadow:
                "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
            }}
          >
            <PeopleAltIcon />
          </Stack>
          <Stack sx={{ color: "#fff", marginTop: "auto" }}>
            <Typography sx={{ fontSize: "35px", fontWeight: "bold" }}>
              50
            </Typography>
            <Typography sx={{ color: "#F2F3F5" }}>Total User</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={4}>
        <Stack
          sx={{
            background: "#20A1FF",
            padding: "20px",
            flexDirection: "row",
            borderRadius: "10px",
            marginBottom: "25px",
            boxShadow:
              "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <Stack
            sx={{
              background: "#1465C0",
              color: "#fff",
              padding: "15px",
              marginRight: "30px",
              borderRadius: "10px",
              boxShadow:
                "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
            }}
          >
            <PeopleAltIcon />
          </Stack>
          <Stack sx={{ color: "#fff" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              50
            </Typography>
            <Typography sx={{ color: "#F2F3F5", fontSize: "14px" }}>
              Total User
            </Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            background: "#fff",
            padding: "20px",
            flexDirection: "row",
            borderRadius: "10px",
            boxShadow:
              "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <Stack
            sx={{
              background: "#FFF8E2",
              color: "#FFC107",
              padding: "15px",
              marginRight: "30px",
              borderRadius: "10px",
              boxShadow:
                "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
            }}
          >
            <PeopleAltIcon />
          </Stack>
          <Stack>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              50
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>Total User</Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HomePage;
