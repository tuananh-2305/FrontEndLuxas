import axios from "axios";
export const axiosJWT = axios.create();

export const upLoadFile = async (formData) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/file/upload`,
    formData
  );
  return res.data;
};

export const getAllFile = async (search) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/file/get-all-file?filter=fileName&filter=${search}`
    );
  } else {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/file/get-all-file`);
  }
  return res.data;
};

export const deleteFile = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/file/delete-file/${id}`
  );
  return res.data;
};
