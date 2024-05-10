import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "mui-image";
import defaultFile from "../../../assets/images/filelogo.png";
import excelLogo from "../../../assets/images/excellogo.png";
import wordImage from "../../../assets/images/word.png";
import pdfLogo from "../../../assets/images/pdflogo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";

const FileComponent = (props) => {
  const { fileName, handleShowModal, idFile } = props;

  const newTab = (url) => {
    window.open(url);
  };
  return (
    <Stack
      sx={{
        borderRadius: "5px",
        background: "#fff",
        padding: "20px",
        height: "30vh",
      }}
    >
      <Stack
        sx={{
          height: "90px",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <Stack
          sx={{
            width: "80px",
            height: "80px",
          }}
        >
          {fileName.split(".")[1] === "jpeg" ||
          fileName.split(".")[1] === "png" ||
          fileName.split(".")[1] === "jpg" ? (
            <Image
              src={`${process.env.REACT_APP_UPLOAD_URL}/files/${fileName}`}
              alt=""
            />
          ) : fileName.split(".")[1] === "xlsx" ? (
            <Image src={excelLogo} alt="" />
          ) : fileName.split(".")[1] === "pdf" ? (
            <Image src={pdfLogo} alt="" />
          ) : fileName.split(".")[1] === "doc" ? (
            <Image src={wordImage} alt="" />
          ) : (
            <Image src={defaultFile} alt="" />
          )}
        </Stack>
      </Stack>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ marginBottom: "5px", fontSize: "15px", color: "#E94738" }}
        >
          {fileName.split(".")[0].length > 10
            ? fileName.split(".")[0].slice(0, 10) +
              "..." +
              fileName.split(".")[1]
            : fileName}
        </Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "auto",
        }}
      >
        <Stack
          sx={{
            background: "#6C3428",
            padding: "5px",
            borderRadius: "5px",
            color: "#FFF",
            cursor: "pointer",
            "&:hover": {
              background: "#3C416F",
            },
          }}
          onClick={() =>
            newTab(`http://localhost:3001/uploads/files/${fileName}`)
          }
        >
          <VisibilityIcon fontSize="small" />
        </Stack>
        <Stack
          sx={{
            background: "#EB375D",
            padding: "5px",
            borderRadius: "50%",
            color: "#FFF",
            cursor: "pointer",
            "&:hover": {
              background: "#3C416F",
            },
          }}
          onClick={() => handleShowModal(idFile)}
        >
          <ClearIcon fontSize="small" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FileComponent;
