import axios from "axios";
const axiosJWT = axios.create();
export const exportProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/export-product/create-export-product`,
    data
  );
  return res.data;
};

export const updateExportProduct = async (id, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/export-product/update-export-product/${id}`,
    data
  );
  return res.data;
};

export const deleteExportProduct = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/export-product/delete-export-product/${id}`
  );
  return res.data;
};

export const getDetailsExportProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/export-product/details-export-product/${id}`
  );
  return res.data;
};

export const getAllExportProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/export-product/get-all-export-product`
  );
  return res.data;
};
