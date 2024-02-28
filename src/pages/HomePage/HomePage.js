import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Grid from "@mui/material/Unstable_Grid2";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const HomePage = () => {
  const [product, setProduct] = useState("");
  const [user, setUser] = useState("");
  const [limitProduct, setLimitProduct] = useState("");
  const [exportProduct, setExportProduct] = useState("");

  const getData = async () => {
    const productApi = `${process.env.REACT_APP_API_URL}/product/get-all-product`;
    const userApi = `${process.env.REACT_APP_API_URL}/user/get-all-user`;
    const limitProductApi = `${process.env.REACT_APP_API_URL}/limit-product/get-all-limit-product`;
    const exportProductApi = `${process.env.REACT_APP_API_URL}/export-product/get-all-export-product`;
    const responses = await Promise.all([
      fetch(productApi),
      fetch(userApi),
      fetch(limitProductApi),
      fetch(exportProductApi),
    ]);
    const product = await responses[0].json();
    const user = await responses[1].json();
    const limitProduct = await responses[2].json();
    const exportProduct = await responses[3].json();
    setProduct(product);
    setUser(user);
    setLimitProduct(limitProduct);
    setExportProduct(exportProduct);
  };
  useEffect(() => {
    getData();
  }, []);

  const chartSetting = {
    height: 500,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };
  const dataset = [
    {
      import: 57,
      export: 86,
      limit: 5,
      month: "Jan",
    },
    {
      limit: 10,
      import: 13,
      export: 61,
      month: "Fev",
    },
    {
      limit: 11,
      import: 31,
      export: 16,
      month: "Mar",
    },
    {
      limit: 4,
      import: 12,
      export: 73,
      month: "Apr",
    },
    {
      limit: 5,
      import: 51,
      export: 112,
      month: "May",
    },
    {
      limit: 9,
      import: 34,
      export: 59,
      month: "June",
    },
    {
      limit: 12,
      import: 14,
      export: 24,
      month: "July",
    },
    {
      limit: 15,
      import: 12,
      export: 52,
      month: "Aug",
    },
    {
      limit: 12,
      import: 42,
      export: 65,
      month: "Sept",
    },
    {
      limit: 19,
      import: 12,
      export: 86,
      month: "Oct",
    },
    {
      limit: 9,
      import: 14,
      export: 36,
      month: "Nov",
    },
    {
      limit: 14,
      import: 23,
      export: 23,
      month: "Dec",
    },
  ];

  const valueFormatter = (value) => {
    return `${value} product`;
  };
  return (
    <Stack sx={{ margin: "30px", background: "#F2F3F5", borderRadius: "10px" }}>
      <Stack
        sx={{
          padding: "30px",
          fontSize: "30px",
          fontWeight: "bold",
          color: "#00B302",
        }}
      >
        Dashboards
      </Stack>
      <Grid
        container
        spacing={3}
        sx={{
          flexDirection: "row",
          padding: "0 30px 30px",
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
                {product?.totalProduct || 0}
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
                {user?.totalUser || 0}
              </Typography>
              <Typography sx={{ color: "#F2F3F5" }}>Total User</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={4}>
          <Stack
            sx={{
              background: "#006600",
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
                background: "#004225",
                color: "#fff",
                padding: "15px",
                marginRight: "30px",
                borderRadius: "10px",
                boxShadow:
                  "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
              }}
            >
              <ShoppingBasketIcon />
            </Stack>
            <Stack sx={{ color: "#fff" }}>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                {exportProduct?.totalProduct || 0}
              </Typography>
              <Typography sx={{ color: "#F2F3F5", fontSize: "14px" }}>
                Total Export Product
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
              <LocalMallIcon />
            </Stack>
            <Stack>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                {limitProduct?.totalProduct || 0}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                Total Limit Product
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Stack sx={{ padding: "30px", marginTop: "30px" }}>
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Product Chart
        </Typography>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            {
              dataKey: "import",
              label: "Import Product",
              valueFormatter,
            },
            {
              dataKey: "export",
              label: "Export Product",
              valueFormatter,
            },
            { dataKey: "limit", label: "Limit Product", valueFormatter },
          ]}
          {...chartSetting}
        />
      </Stack>
    </Stack>
  );
};

export default HomePage;
