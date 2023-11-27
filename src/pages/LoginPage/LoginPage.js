import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import bgImage from "../../assets/images/bg7.jpg";
import PersonIcon from "@mui/icons-material/Person";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    console.log(e.target.value);
  };
  const handlePassword = (e) => {
    console.log(e.target.value);
  };

  const showPageSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const handleNavSignIn = () => {
    navigate("/");
  };
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        transition: "0.5",
        position: "relative",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          position: "absolute",
          display: showSignIn ? "flex" : "none",
          height: "520px",
          width: "65%",
        }}
      >
        <Stack
          sx={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "50px",
          }}
        >
          <Typography
            sx={{
              marginBottom: "30px",
              fontSize: "30px",
              borderBottom: "2px solid black",
            }}
          >
            Sign In
          </Typography>
          <Stack sx={{ width: "100%", marginBottom: "30px" }}>
            <InputComponent
              iconInput={<EmailIcon />}
              placeholder="Email Adress"
              bgInput="#fff"
              borderInput="1px solid #333"
              onChangInput={handleEmail}
            />
          </Stack>
          <Stack sx={{ width: "100%", marginBottom: "30px" }}>
            <InputComponent
              iconInput={<LockIcon />}
              placeholder="Password"
              typeInput={showPassword ? "text" : "password"}
              bgInput="#fff"
              borderInput="1px solid #333"
              onChangInput={handlePassword}
              iconInput2={
                showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
              }
              onClickIconInput={handleShowPassword}
            />
          </Stack>
          <Stack
            sx={{
              background: "#03a9f4",
              color: "#fff",
              padding: "8px 25px",
              fontSize: "22px",
              border: "2px solid #03a9f4",
              cursor: "pointer",
              borderRadius: "5px",
              marginRight: "auto",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#03a9f4",
              },
            }}
            onClick={handleNavSignIn}
          >
            Sign In
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: "50%",
            background: "rgba(255, 255, 255, 0.4)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "22px",
              marginBottom: "30px",
              background: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            Don't Have an Account ?
          </Typography>
          <Stack
            onClick={showPageSignIn}
            sx={{
              cursor: "pointer",
              padding: "10px 20px",
              background: "#fff",
              borderRadius: "5px",
              fontSize: "20px",
              "&:hover": {
                backgroundColor: "#ff4433",
                color: "#fff",
              },
            }}
          >
            Sign Up
          </Stack>
        </Stack>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          position: "absolute",
          display: showSignIn ? "none" : "flex",
          height: "520px",
          width: "65%",
        }}
      >
        <Stack
          sx={{
            width: "50%",
            background: "rgba(255, 255, 255, 0.4)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "22px",
              marginBottom: "30px",
              background: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            Already Have an Account ?
          </Typography>
          <Stack
            onClick={showPageSignIn}
            sx={{
              cursor: "pointer",
              padding: "10px 20px",
              background: "#fff",
              borderRadius: "5px",
              fontSize: "20px",
              "&:hover": {
                backgroundColor: "#ff4433",
                color: "#fff",
              },
            }}
          >
            Sign In
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "50px",
          }}
        >
          <Typography
            sx={{
              marginBottom: "30px",
              fontSize: "30px",
              borderBottom: "2px solid black",
            }}
          >
            Sign Up
          </Typography>
          <Stack sx={{ width: "100%", marginBottom: "20px" }}>
            <InputComponent
              iconInput={<PersonIcon />}
              placeholder="Name"
              bgInput="#fff"
              borderInput="1px solid #333"
            />
          </Stack>
          <Stack sx={{ width: "100%", marginBottom: "20px" }}>
            <InputComponent
              iconInput={<EmailIcon />}
              placeholder="Email Adress"
              bgInput="#fff"
              borderInput="1px solid #333"
            />
          </Stack>
          <Stack sx={{ width: "100%", marginBottom: "20px" }}>
            <InputComponent
              iconInput={<LockIcon />}
              placeholder="Password"
              bgInput="#fff"
              borderInput="1px solid #333"
            />
          </Stack>
          <Stack sx={{ width: "100%", marginBottom: "35px" }}>
            <InputComponent
              iconInput={<LockPersonIcon />}
              placeholder="Confirm Password"
              bgInput="#fff"
              borderInput="1px solid #333"
            />
          </Stack>
          <Stack
            sx={{
              background: "#03a9f4",
              color: "#fff",
              border: "2px solid #03a9f4",
              padding: "8px 25px",
              fontSize: "22px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "auto",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#03a9f4",
              },
            }}
            onClick={handleNavSignIn}
          >
            Sign Up
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
