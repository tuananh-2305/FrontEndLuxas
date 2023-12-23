import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <ArrowDropUpIcon />,
        },
        decrementButton: {
          children: <ArrowDropDownIcon />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function InputNumberComponent(props) {
  const { value, onChange, valueMax, valueMin } = props;
  return (
    <NumberInput
      aria-label="Demo number input"
      placeholder="Type a number…"
      value={value}
      onChange={onChange}
      max={valueMax}
      min={valueMin}
    />
  );
}

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  position: relative;
  padding: 10px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 5px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : "#004225"};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };
`
  // display: grid;
  // grid-template-columns: 1fr 19px;
  // grid-template-rows: 1fr 1fr;
  //   overflow: hidden;
  //   column-gap: 8px;
  //   padding: 4px;
  // &.${numberInputClasses.focused} {
  //     border-color: ${blue[400]};
  //     box-shadow: 0 0 0 3px ${
  //       theme.palette.mode === "dark" ? blue[600] : blue[200]
  //     };
  //   }

  //   &:hover {
  //     border-color: ${blue[400]};
  //   }

  //   // firefox
  //   &:focus-visible {
  //     outline: 0;
  //   }
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  padding: 5px ;
  width: 90%;
  font-size: 16px;
  font-family: inherit;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  outline: 0;
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  appearance: none;
  padding: 0;
  width: 30px;
  height: 25px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 0;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    position: absolute;
    top: 0;
    right: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom: 0;
    border: 1px solid #004225;
    &:hover {
      cursor: pointer;
      background: ${blue[400]};
      color: ${grey[50]};
    }

  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#004225"};
  color: ${theme.palette.mode === "dark" ? grey[200] : "#FFF"};
  }

  &.${numberInputClasses.decrementButton} {
    position: absolute;
    bottom: 0;
    right: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid #004225;
    &:hover {
      cursor: pointer;
      background: ${blue[400]};
      color: ${grey[50]};
    }

  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#004225"};
  color: ${theme.palette.mode === "dark" ? grey[200] : "#FFF"};
  }
  & .arrow {
    transform: translateY(-1px);
  }
`
);
