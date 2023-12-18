import { InputBase, Stack } from "@mui/material";
import React from "react";

const InputComponent = (props) => {
  const {
    placeholder,
    wInput,
    bgInput,
    onChangeInput,
    vInput,
    typeInput,
    iconInput,
    borderInput,
    iconInput2,
    onClickIconInput,
    nameInput,
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
      {iconInput ? <Stack sx={{ paddingLeft: "15px" }}>{iconInput}</Stack> : ""}
      <InputBase
        placeholder={placeholder}
        sx={{
          width: "100%",
          padding: "8px 15px",
        }}
        value={vInput}
        onChange={onChangeInput}
        type={typeInput}
        name={nameInput}
      />
      {iconInput2 ? (
        <Stack
          sx={{ padding: "8px 15px 8px 0", cursor: "pointer" }}
          onClick={onClickIconInput}
        >
          {iconInput2}
        </Stack>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default InputComponent;
