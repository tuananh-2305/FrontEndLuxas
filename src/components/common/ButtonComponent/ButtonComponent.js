import { Button, Stack, Typography } from "@mui/material";
import React from "react";

const ButtonComponent = (props) => {
  const {
    textButton,
    wButton,
    bgButton,
    hButton,
    iconButton,
    disabledButton,
    onClickBtn,
    hoverBtn,
    colorHoverBtn,
    paddingBtn,
    fontSizeBtn,
  } = props;
  return (
    <Stack>
      <Button
        disabled={disabledButton}
        onClick={onClickBtn}
        sx={{
          flexDirection: "row",
          height: hButton,
          width: wButton,
          padding: paddingBtn,
          color: "#fff",
          backgroundColor: bgButton,
          "&:hover": {
            backgroundColor: hoverBtn,
            color: colorHoverBtn,
          },
        }}
      >
        {iconButton ? iconButton : ""}
        {textButton ? (
          <Typography
            sx={{
              paddingLeft: iconButton ? "5px" : "0",
              fontSize: fontSizeBtn,
              textTransform: "capitalize",
            }}
          >
            {textButton}
          </Typography>
        ) : (
          ""
        )}
      </Button>
    </Stack>
  );
};

export default ButtonComponent;
