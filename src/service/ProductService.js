import axios from "axios";
const axiosJWT = axios.create();

export const addProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create-product`,
    data
  );
  return res.data;
};
export const updateProduct = async (id, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update-product/${id}`,
    data
  );
  return res.data;
};

export const deteleProduct = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/product/delete-product/${id}`
  );
  return res.data;
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/details-product/${id}`
  );
  return res.data;
};

export const getDetailsProductByCode = async (params) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/details-product-by-code/${params}`
  );
  return res.data;
};

export const getAllProduct = async (search) => {
  let res = {};
  if (search?.search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all-product?filter=${search?.keySearch}&filter=${search?.search}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all-product`
    );
  }

  return res.data;
};
