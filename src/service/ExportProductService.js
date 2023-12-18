import axios from "axios";

export const exportProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/export-product/create-export-product`,
    data
  );
  return res.data;
};

export const getAllExportProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/export-product/get-all-export-product`
  );
  return res.data;
};
