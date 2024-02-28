import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ButtonComponent from "../../components/common/ButtonComponent/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import * as UploadFileService from "../../service/UploadFileService";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import AddFileComponent from "../../components/AddFileComponent/AddFileComponent";
import FileComponent from "../../components/common/FileComponent/FileComponent";
const FileStoragePage = () => {
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
            <Grid xs={2.4} key={index}>
              <FileComponent
                fileName={file?.fileName}
                typeFile={file?.typeFile}
                fileCode={file?.fileCode}
              />
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

export default FileStoragePage;
