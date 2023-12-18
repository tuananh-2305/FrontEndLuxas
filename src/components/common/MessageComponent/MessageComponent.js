// import React, { useState } from "react";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const Message = ({ message, severity }) => {
//   const [open, setOpen] = useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//       <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
//         {message}
//       </Alert>
//     </Snackbar>
//   );
// };
// export default Message;
import { message } from "antd";

const success = (mes) => {
  message.success(mes);
};

const error = (mes) => {
  message.error(mes);
};

const warning = (mes) => {
  message.warning(mes);
};

const loading = (mes) => {
  message.loading(mes);
};

export { success, error, warning, loading };
