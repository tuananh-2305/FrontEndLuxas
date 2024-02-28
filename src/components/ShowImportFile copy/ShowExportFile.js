import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import InputComponent from "../common/InputComponent/InputComponent";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ButtonComponent from "../common/ButtonComponent/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import * as UploadFileService from "../../service/UploadFileService";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import AddFileComponent from "../AddFileComponent/AddFileComponent";
import Image from "mui-image";
import ExcelLogo from "../../assets/images/excellogo.png";
import WordLogo from "../../assets/images/wordlogo.png";
const ShowExportFile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const handleOpenAddFile = () => {
    setOpenModal(true);
  };
  const handleCloseAddFile = () => {
    setOpenModal(false);
    setFileList([]);
  };

  const getAllFile = async () => {
    const res = await UploadFileService.getAllFile();
    return res.data;
  };
  const { data: files } = useQuery({
    queryKey: ["getAllFile"],
    queryFn: () => getAllFile(),
  });

  return (
    <Stack sx={{ margin: "30px" }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "30px ",
        }}
      >
        <Typography
          sx={{ fontSize: "30px", fontWeight: "bold", color: "#6C3428" }}
        >
          File Storage
        </Typography>
        <Stack sx={{ marginLeft: "auto" }}>
          <ButtonComponent
            iconButton={<AddIcon />}
            textButton="Add File"
            bgButton="#6C3428"
            hoverBtn="#3C416F"
            paddingBtn="10px"
            onClickBtn={() => handleOpenAddFile()}
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          backgroundColor: "#F2F3F5",
          padding: "30px",
          flexDirection: "row",
          alignItems: "center",
          borderTopRightRadius: "15px",
          borderTopLeftRadius: "15px",
          marginBottom: "30px ",
        }}
      >
        <InputComponent
          placeholder="Search"
          iconInput={<SearchIcon />}
          borderInput="1px solid #6C3428"
          wInput="30%"
          bgInput="#fff"
        />
        <Stack
          sx={{
            marginLeft: "auto",
            padding: "5px",
            borderRadius: "5px",
            background: "#6C3428",
            color: "#FFF",
            cursor: "pointer",
            boxShadow:
              "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <TuneIcon />
        </Stack>
      </Stack>
      <Stack sx={{ backgroundColor: "#F2F3F5", padding: "30px" }}>
        <Grid container spacing={4}>
          {files?.map((file, index) => (
            <Grid xs={2} key={index}>
              <Stack
                sx={{
                  borderRadius: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  height: "30vh",
                  background: "#fff",
                }}
              >
                {file?.fileName.split(".")[1] === "jpeg" ||
                file?.fileName.split(".")[1] === "png" ||
                file?.fileName.split(".")[1] === "jpg" ? (
                  <Stack
                    sx={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "3px",
                      marginBottom: "15px",
                      overflow: "hidden",
                      background: "#fff",
                      border: "0.1px solid #999",
                      "&:hover": {
                        width: "90px",
                        height: "90px",
                      },
                      boxShadow:
                        "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <Image
                      src={`${process.env.REACT_APP_UPLOAD_URL}/files/${file?.fileName}`}
                      alt=""
                    />
                  </Stack>
                ) : file?.fileName.split(".")[1] === "xlsx" ? (
                  <Stack
                    sx={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "3px",
                      marginBottom: "15px",
                      overflow: "hidden",
                      border: "0.1px solid #999",
                      background: "#fff",
                      "&:hover": {
                        width: "90px",
                        height: "90px",
                      },
                      boxShadow:
                        "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <Image src={ExcelLogo} alt="" />
                  </Stack>
                ) : file?.fileName.split(".")[1] === "doc" ? (
                  <Stack
                    sx={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "3px",
                      marginBottom: "15px",
                      overflow: "hidden",
                      background: "#fff",
                      border: "0.1px solid #999",
                      "&:hover": {
                        width: "90px",
                        height: "90px",
                      },
                      boxShadow:
                        "rgba(20, 20, 20, 0.3) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.2) 0rem 0.125rem 0.25rem -0.0625rem",
                    }}
                  >
                    <Image src={WordLogo} alt="" />
                  </Stack>
                ) : (
                  ""
                )}

                <Typography sx={{ marginBottom: "5px", fontSize: "15px" }}>
                  {file?.fileName}
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#1465C0" }}>
                  {file.size}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <AddFileComponent
        openModal={openModal}
        closeModal={() => handleCloseAddFile()}
        fileList={fileList}
        setFileList={setFileList}
      />
    </Stack>
  );
};

export default ShowExportFile;
