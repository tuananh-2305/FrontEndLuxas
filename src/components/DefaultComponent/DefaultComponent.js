import React, { useState, useContext } from "react";
import Header from "../Header/Header";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Context } from "../../hook/useConText";

const DefaultComponent = ({ children }) => {
  const { sideBar } = useContext(Context);
  const [showNavbar, setShowNavbar] = useState(true);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const [expanded, setExpanded] = useState("sidebar1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log(expanded);

  return (
    <Stack>
      <Header handleShowNavbar={handleShowNavbar} />
      <Stack
        sx={{
          flexDirection: "row",
          marginTop: "70px",
          width: "100%",
        }}
      >
        <Stack
          sx={{
            width: showNavbar ? "25%" : "8%",
            backgroundColor: "#F1F3F5",
            padding: showNavbar ? "40px 30px" : "40px 20px",
            height: "90vh",
          }}
        >
          {sideBar.map((sideBarItem, index) => (
            <Stack sx={{ margin: "0 0 20px" }} key={index}>
              <Accordion
                elevation={0}
                expanded={expanded === `sidebar${index + 1}`}
                onChange={handleChange(`sidebar${index + 1}`)}
                sx={{
                  borderRadius: "5px",
                  overflow: "hidden",
                  background:
                    expanded === `sidebar${index + 1}` ? "#fff" : "#F1F2F4",
                  boxShadow:
                    expanded === `sidebar${index + 1}`
                      ? "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem"
                      : "",
                }}
              >
                <Link to={sideBarItem.path}>
                  <AccordionSummary
                    expandIcon={
                      showNavbar && sideBarItem.sideBarChild ? (
                        <ExpandMoreIcon />
                      ) : (
                        ""
                      )
                    }
                    sx={{
                      height: "70px",
                      borderRadius: "5px",
                    }}
                  >
                    <Stack
                      sx={{
                        padding: "10px",
                        borderRadius: "10px",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Stack
                        sx={{
                          padding: "8px",
                          background:
                            expanded === `sidebar${index + 1}`
                              ? "#18C1E8"
                              : "#fff",
                          borderRadius: "5px",
                          color:
                            expanded === `sidebar${index + 1}`
                              ? "#fff"
                              : "#3B416F",
                          boxShadow:
                            "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
                        }}
                      >
                        {sideBarItem.sideBarIcon}
                      </Stack>
                      <Typography
                        sx={{
                          marginLeft: "15px",
                          display: showNavbar ? "flex" : "none",
                          color: "#000",
                        }}
                      >
                        {sideBarItem.sideBarName}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                </Link>
                {sideBarItem.sideBarChild && (
                  <AccordionDetails
                    sx={{
                      boxShadow: "inset 0px 11px 8px -10px #CCC",
                      background: "#fff",
                      padding: "0",
                    }}
                  >
                    <Stack
                      sx={{
                        height: "90px",
                      }}
                    >
                      {sideBarItem.sideBarChild.map(
                        (sideBarChildItem, index) => (
                          <Link to={sideBarChildItem.path} key={index}>
                            <Stack
                              sx={{
                                flexDirection: "row",
                                alignItems: "center",
                                color: "#000",
                                paddingLeft: showNavbar ? "40px" : "15px",
                                "&:hover": {
                                  background: "#18C1E8",
                                  color: "#fff",
                                },
                                height: "45px",
                              }}
                            >
                              <Typography
                                sx={{
                                  display: showNavbar ? "flex" : "none",
                                }}
                              >
                                •
                              </Typography>

                              <Typography
                                sx={{
                                  marginLeft: showNavbar ? "30px" : "0",
                                  fontSize: showNavbar ? "16px" : "12px",
                                  fontWeight: showNavbar ? "italic" : "bold",
                                }}
                              >
                                {sideBarChildItem.sideBarChildName}
                              </Typography>
                            </Stack>
                          </Link>
                        )
                      )}
                    </Stack>
                  </AccordionDetails>
                )}
              </Accordion>
            </Stack>
          ))}
        </Stack>
        <Stack sx={{ width: "100%" }}>{children}</Stack>
      </Stack>
    </Stack>
  );
};

export default DefaultComponent;
