import { InputBase, Stack } from "@mui/material";
import React from "react";

const InputComponent = (props) => {
  const {
    placeholder,
    wInput,
    bgInput,
    onChangInput,
    vInput,
    typeInput,
    iconInput,
    borderInput,
    iconInput2,
    onClickIconInput,
  } = props;
  return (
    <Stack
      sx={{
        flexDirection: "row",
        position: "relative",
        alignItems: "center",
        backgroundColor: bgInput,
        borderRadius: "5px",
        width: wInput,
        border: borderInput,
      }}
    >
      <Stack sx={{ paddingLeft: "15px" }}>{iconInput}</Stack>
      <InputBase
        placeholder={placeholder}
        sx={{
          width: "100%",
          padding: "8px 15px",
        }}
        value={vInput}
        onChange={onChangInput}
        type={typeInput}
      />
      <Stack
        sx={{ padding: "8px 15px 8px 0", cursor: "pointer" }}
        onClick={onClickIconInput}
      >
        {iconInput2}
      </Stack>
    </Stack>
  );
};

export default InputComponent;
