import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "mui-image";
import defaultFile from "../../../assets/images/filelogo.png";
import excelLogo from "../../../assets/images/excellogo.png";
import wordImage from "../../../assets/images/word.png";
import pdfLogo from "../../../assets/images/pdflogo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

const FileComponent = (props) => {
  const { fileName, typeFile, fileCode } = props;

  const newTab = (url) => {
    window.open(url);
  };
  return (
    <Stack
      sx={{
        borderRadius: "5px",
        background: "#fff",
        padding: "20px",
        height: "35vh",
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
        {typeFile ? (
          <Stack
            sx={{
              position: "absolute",
              fontSize: "14px",
              background: "#6C3428",
              padding: "5px",
              color: "#fff",
              top: 0,
              right: "0",
            }}
          >
            {typeFile}
          </Stack>
        ) : (
          ""
        )}
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
        <Typography
          sx={{ fontSize: "14px", color: "#1465C0", fontWeight: "bold" }}
        >
          {fileCode}
        </Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "auto",
        }}
      >
        <Stack
          sx={{
            background: "#FF5630",
            padding: "8px",
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
        {fileName.split(".")[1] === "xlsx" ||
        fileName.split(".")[1] === "doc" ? (
          <Stack
            sx={{
              background: "#6C3428",
              padding: "8px",
              borderRadius: "5px",
              color: "#FFF",
              marginLeft: "auto",
              cursor: "pointer",
              "&:hover": {
                background: "#3C416F",
              },
            }}
            onClick={() =>
              newTab(`http://localhost:3001/uploads/files/${fileName}`)
            }
          >
            <DownloadIcon fontSize="small" />
          </Stack>
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  );
};

export default FileComponent;
