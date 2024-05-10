import React, { useState, useEffect, useRef } from "react";
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
import DeleteModalComponent from "../../components/common/DeleteModalComponent/DeleteModalComponent";
import { useDebounce } from "../../hook/useDebounce";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as message from "../../components/common/MessageComponent/MessageComponent";
const FileStoragePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [search, setSearch] = useState("");
  const [valueSearch, setValueSearch] = useState([]);
  const [stateFile, setStateFile] = useState([]);
  const searchDebounce = useDebounce(valueSearch, 500);
  const refSearch = useRef();
  const [idFile, setIdFile] = useState("");
  const [openModalDeLete, setOpenModalDeLete] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    setValueSearch(search);
  }, [search]);

  useEffect(() => {
    if (refSearch.current) {
      getAllFile(searchDebounce);
    }
    refSearch.current = true;
  }, [searchDebounce]);

  const handleOpenAddFile = () => {
    setOpenModal(true);
  };
  const handleCloseAddFile = () => {
    setOpenModal(false);
    setFileList([]);
  };

  const getAllFile = async (search) => {
    const res = await UploadFileService.getAllFile(search);
    if (search?.data?.length > 0 || refSearch.current) {
      setStateFile(res?.data);
      return [];
    } else {
      return res;
    }
  };
  const { data: files } = useQuery({
    queryKey: ["getAllFile"],
    queryFn: getAllFile,
  });

  useEffect(() => {
    if (files?.data?.length > 0) {
      setStateFile(files?.data);
    }
  }, [files]);

  const handleShowModal = (id) => {
    setIdFile(id);
    setOpenModalDeLete(true);
  };
  const handleCloseModal = () => {
    setOpenModalDeLete(false);
    setIdFile("");
  };

  const mutationDelete = useMutationHooks((data) => {
    const { id } = data;
    const res = UploadFileService.deleteFile(id);
    return res;
  });
  const { data: dataDelete } = mutationDelete;

  useEffect(() => {
    if (dataDelete?.status === "OK") {
      handleCloseModal();
      message.success("Delete Product Success");
      getAllFile();
    } else if (dataDelete?.status === "ERR") {
      message.error(dataDelete?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDelete]);

  const handleDeleteFile = () => {
    mutationDelete.mutate({ id: idFile });
  };

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
          onChangeInput={handleSearch}
          inputRef={refSearch}
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
          {stateFile?.map((file, index) => (
            <Grid xs={2.4} key={index}>
              <FileComponent
                fileName={file?.fileName}
                handleShowModal={handleShowModal}
                idFile={file?._id}
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
        getAllFile={() => getAllFile()}
      />
      <DeleteModalComponent
        openModalDeLete={openModalDeLete}
        handleCloseModalDelete={() => handleCloseModal()}
        handleDelete={() => handleDeleteFile()}
        titleDelete="Delete File"
        alertDelete="Do you want to delete file ?"
        bgDelete="#3F0072"
      />
    </Stack>
  );
};

export default FileStoragePage;
