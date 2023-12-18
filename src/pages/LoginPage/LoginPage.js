import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import InputComponent from "../../components/common/InputComponent/InputComponent";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import bgImage from "../../assets/images/imgbg.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as UserService from "../../service/UserService";
import { useMutationHooks } from "../../hook/useMutationHook";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/common/ButtonComponent/ButtonComponent";
import LoadingComponent from "../../components/common/LoadingComponent/LoadingComponent";
import * as message from "../../components/common/MessageComponent/MessageComponent";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  const { data, isPending } = mutation;

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.status === "OK") {
      message.success("Login Success");
      navigate("/");

      localStorage.setItem("access_token", JSON.stringify(data?.access_token));

      if (data?.access_token) {
        const decode = jwtDecode(data?.access_token);
        if (decode?.id) {
          handleGetDetailsUser(decode?.id, data?.access_token);
        }
      }
    } else if (data?.status === "ERR") {
      message.error(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
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
      }}
    >
      <Stack
        sx={{
          width: "35%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          padding: "50px 5%",
          borderRadius: "10px",
          boxShadow:
            "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
        }}
      >
        <Typography
          sx={{
            marginBottom: "15%",
            fontSize: "30px",
            borderBottom: "2px solid black",
            fontWeight: "bold",
          }}
        >
          Sign In
        </Typography>
        <Stack sx={{ width: "100%", marginBottom: "20px" }}>
          <InputComponent
            iconInput={<EmailIcon />}
            placeholder="Email Adress"
            bgInput="#fff"
            borderInput="1px solid #BEA780"
            onChangeInput={handleEmail}
          />
        </Stack>
        <Stack sx={{ width: "100%", marginBottom: "20px" }}>
          <InputComponent
            iconInput={<LockIcon />}
            placeholder="Password"
            typeInput={showPassword ? "text" : "password"}
            bgInput="#fff"
            borderInput="1px solid #BEA780"
            onChangeInput={handlePassword}
            iconInput2={
              showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
            }
            onClickIconInput={() => handleShowPassword()}
          />
        </Stack>
        <Typography
          sx={{
            marginRight: "auto",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Don't forget password ?
        </Typography>
        <Stack sx={{ margin: "20px 0 0 auto" }}>
          <LoadingComponent isLoading={isPending}>
            <ButtonComponent
              textButton="Login"
              bgButton="#FF404E"
              hoverBtn="#3399ff"
              paddingBtn="10px 30px"
              onClickBtn={(e) => handleLogin(e)}
              fontSizeBtn="20px"
            />
          </LoadingComponent>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
