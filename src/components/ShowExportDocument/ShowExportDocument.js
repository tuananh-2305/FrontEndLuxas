import React from "react";
import ModalComponent from "../common/ModalComponent/ModalComponent";
import { Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "mui-image";
import ExcelLogo from "../../assets/images/excellogo.png";
import { Link } from "react-router-dom";
// import WordLogo from "../../assets/images/wordlogo.png";

const ShowExportDocument = (props) => {
  const { openModal, handleCloseModal, document, exportCode } = props;
  return (
    <ModalComponent isOpen={openModal} onClose={handleCloseModal}>
      <Stack
        sx={{
          position: "absolute",
          background: "#fff",
          overflow: "hidden",
          width: "40%",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <Stack sx={{ flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "bold", color: "#3F0072" }}>
              Export Code:
            </Typography>
            <Typography
              sx={{
                marginLeft: "10px",
                fontWeight: "bold",
              }}
            >
              {exportCode}
            </Typography>
          </Stack>
          <Stack
            sx={{
              marginLeft: "auto",
              cursor: "pointer",
              padding: "5px",
              borderRadius: "5px",
              background: "#F2F3F5",
              zIndex: "1",
              "&:hover": {
                background: "#3F0073",
                color: "#fff",
              },
            }}
            onClick={handleCloseModal}
          >
            <ClearIcon fontSize="small" />
          </Stack>
        </Stack>
        <Stack>
          <Grid container spacing={2}>
            {document.map((file, index) => (
              <Grid xs={3} key={index}>
                <Link
                  to={`http://localhost:3001/uploads/files/${file.documentFileName}`}
                >
                  <Stack
                    sx={{
                      cursor: "pointer",
                      padding: "15px",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#F2F3F5",
                      borderRadius: "5px",
                      boxShadow:
                        "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <Stack
                      sx={{
                        marginBottom: "10px",
                        width: "50px",
                        height: "50px",
                        borderRadius: "3px",
                        overflow: "hidden",
                        background: "#fff",
                        border: "0.1px solid #999",
                        boxShadow:
                          "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
                      }}
                    >
                      <Image src={ExcelLogo} alt="" />
                      {/* ) : fileName.split(".")[1] === "xlsx" ? (
                 
                  ) : fileName.split(".")[1] === "doc" ? (
                  <Image src={WordLogo} alt="" />) : ( "" )} */}
                    </Stack>
                    <Typography sx={{ fontSize: "12px", color: "#000" }}>
                      {file.documentFileName.split(".")[0].length > 8
                        ? file.documentFileName.split(".")[0].slice(0, 8) +
                          "..." +
                          file.documentFileName.split(".")[1]
                        : file.documentFileName}
                    </Typography>
                  </Stack>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </ModalComponent>
  );
};

export default ShowExportDocument;
