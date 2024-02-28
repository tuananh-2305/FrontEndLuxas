import axios from "axios";
export const getAllLimitProduct = async (valueSearch) => {
  let res = {};
  if (valueSearch?.search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/limit-product/get-all-limit-product?filter=${valueSearch?.keySearch}&filter=${valueSearch?.search}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/limit-product/get-all-limit-product`
    );
  }

  return res.data;
};
