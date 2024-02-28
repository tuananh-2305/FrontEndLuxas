import axios from "axios";
export const axiosJWT = axios.create();

export const upLoadFile = async (formData) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/file/upload`,
    formData
  );
  return res.data;
};

export const getAllFile = async () => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/file/get-file`
  );
  return res.data;
};
