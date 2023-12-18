const convertDateTime = (date) => {
  var newDate = date.split(/\D/);
  return newDate.reverse().join("-");
};

export default convertDateTime;
