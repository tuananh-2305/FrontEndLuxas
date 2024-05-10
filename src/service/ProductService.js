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
  const dataProduct = data.formData;
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update-product/${id}`,
    dataProduct
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

export const getAllProduct = async (data) => {
  let res = {};
  if (data?.search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all-product?page=${data?.currentPage}&limit=${data?.limit}&filter=${data?.keySearch}&filter=${data?.search}`
    );
  } else if (data?.startDate && data?.endDate) {
    console.log(data?.startDate, data?.endDate);
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all-product?page=${data?.currentPage}&limit=${data?.limit}&filter=${data?.keySearch}&filter=${data?.search}&startDate=${data?.startDate}&endDate=${data?.endDate}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all-product?page=${data?.currentPage}&limit=${data?.limit}`
    );
  }

  return res.data;
};
