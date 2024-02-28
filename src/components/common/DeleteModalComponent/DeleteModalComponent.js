import React from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import { Stack } from "@mui/material";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import Alert from "@mui/material/Alert";
import ClearIcon from "@mui/icons-material/Clear";

const DeleteModalComponent = (props) => {
  const {
    openModalDeLete,
    handleCloseModalDelete,
    handleDelete,
    titleDelete,
    alertDelete,
    bgDelete,
  } = props;
  return (
    <>
      <ModalComponent isOpen={openModalDeLete} onClose={handleCloseModalDelete}>
        <Stack
          sx={{
            position: "absolute",
            background: "#fff",
            width: "30%",
            overflow: "hidden",
            top: "40%",
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
              justifyContent: "space-between",
            }}
          >
            <Stack>{titleDelete}</Stack>
            <Stack
              sx={{
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
              onClick={handleCloseModalDelete}
            >
              <ClearIcon />
            </Stack>
          </Stack>
          <Alert sx={{ fontSize: "15px" }} severity="warning">
            {alertDelete}
          </Alert>
          <Stack sx={{ margin: "20px 0 0 auto" }}>
            <ButtonComponent
              bgButton={bgDelete}
              textButton="Delete"
              hoverBtn="#FF5630"
              paddingBtn="8px 15px"
              onClickBtn={handleDelete}
            />
          </Stack>
        </Stack>
      </ModalComponent>
    </>
  );
};

export default DeleteModalComponent;
