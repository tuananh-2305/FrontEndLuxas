import React, { useRef, useState, useEffect } from "react";
import Image from "mui-image";
import { Stack, Typography } from "@mui/material";
import uploadImg from "../../assets/images/upload.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModalComponent from "../common/ModalComponent/ModalComponent";
import ButtonComponent from "../common/ButtonComponent/ButtonComponent";
import { useMutationHooks } from "../../hook/useMutationHook";
import * as UploadFileService from "../../service/UploadFileService";
import * as message from "../common/MessageComponent/MessageComponent";
import ClearIcon from "@mui/icons-material/Clear";
import defaultImage from "../../assets/images/file.png";
import excelImage from "../../assets/images/excel.png";
import wordImage from "../../assets/images/word.png";
import pdfImage from "../../assets/images/pdf.png";
import imageFile from "../../assets/images/image.png";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const AddFileComponent = (props) => {
  const imageConfig = {
    default: defaultImage,
    xlsx: excelImage,
    pdf: pdfImage,
    docx: wordImage,
    jpeg: imageFile,
    jpg: imageFile,
    png: imageFile,
  };
  const { openModal, closeModal, fileList, setFileList, getAllFile } = props;
  const [isHovering, setIsHovering] = useState(false);
  const inputFileRef = useRef(null);

  const handleUploadFile = (e) => {
    const newFile = e.target.files[0];

    if (newFile) {
      const updateList = [...fileList, newFile];
      setFileList(updateList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  const mutationUpload = useMutationHooks(async (data) => {
    const res = await UploadFileService.upLoadFile(data);
    return res;
  });
  const { data } = mutationUpload;

  useEffect(() => {
    if (data?.status === "OK") {
      closeModal();
      message.success("Add File Success");
      getAllFile();
    } else if (data?.status === "ERROR") {
      message.error(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const upLoadFile = async () => {
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append("files", fileList[i]);
    }
    mutationUpload.mutate(formData);
  };

  return (
    <>
      <ModalComponent isOpen={openModal} onClose={closeModal}>
        <Stack
          sx={{
            position: "absolute",
            background: "#fff",
            width: "30%",
            maxHeight: "70%",
            overflow: "hidden",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Stack
            sx={{
              marginLeft: "auto",
              flexDirection: "row",
              marginBottom: "20px",
            }}
          >
            <Stack
              sx={{
                cursor: "pointer",
                padding: "5px",
                borderRadius: "5px",
                background: "#F2F3F5",
                zIndex: "1",
                "&:hover": {
                  background: "#6C3428",
                  color: "#fff",
                },
              }}
              onClick={() => closeModal()}
            >
              <ClearIcon />
            </Stack>
            <Stack sx={{ marginLeft: "20px" }}>
              <ButtonComponent
                iconButton={<CloudUploadIcon />}
                textButton="Upload"
                bgButton="#6C3428"
                hoverBtn="#3C416F"
                paddingBtn="5px 10px"
                onClickBtn={() => upLoadFile()}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              background: "#f9f2ec",
              position: "relative",
              marginBottom: fileList.length > 0 ? "20px" : "",
              border: "1px dashed #6C3428",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              cursor: "pointer",
              borderRadius: "10px",
              opacity: isHovering ? "0.5" : "1",
            }}
          >
            <Stack
              sx={{
                cursor: "pointer",
                backgroundColor: "#e6ccb3",
                padding: "15px",
                borderRadius: "50%",
              }}
            >
              <Image
                src={uploadImg}
                style={{ height: "60px", width: "60px" }}
              />
            </Stack>
            <input
              style={{
                position: "absolute",
                opacity: 0,
                zIndex: "1",
                cursor: "pointer",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              ref={inputFileRef}
              type="file"
              onChange={handleUploadFile}
              multiple
            />
            <Typography sx={{ marginTop: "10px", color: "#6C3428" }}>
              Browse File To Upload
            </Typography>
          </Stack>
          <Stack sx={{ overflow: "auto" }}>
            {fileList.length > 0 && (
              <>
                {fileList.map((file, index) => (
                  <Stack
                    sx={{
                      flexDirection: "row",
                      border: "0.1px solid #6C3428",
                      padding: "15px",
                      alignItems: "center",
                      borderRadius: "10px",
                      background: "#F9F2EC",
                      marginBottom:
                        index === fileList.length - 1 ? "0" : "20px",
                    }}
                    key={index}
                  >
                    <Stack>
                      <Image
                        src={
                          imageConfig[file?.type?.split("/")[1]] ||
                          imageConfig["default"]
                        }
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Stack>
                    <Stack sx={{ marginLeft: "15px", color: "#6C3428" }}>
                      <Typography sx={{ fontSize: "15px" }}>
                        {file.name}
                      </Typography>
                      <Typography sx={{ fontSize: "15px" }}>
                        {file.size}
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        marginLeft: "auto",
                        background: "#fff",
                        padding: "5px",
                        cursor: "pointer",
                        borderRadius: " 50%",
                        color: "#6C3428",
                      }}
                      onClick={() => fileRemove(file)}
                    >
                      <HighlightOffIcon />
                    </Stack>
                  </Stack>
                ))}
              </>
            )}
          </Stack>
        </Stack>
      </ModalComponent>
    </>
  );
};

export default AddFileComponent;
