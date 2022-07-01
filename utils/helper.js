export const loginDate = () => {
  var date = new Date().toString();
  return date;
};

export const addMinute = () => {
  var date = new Date();
  return date.setMinutes(date.getMinutes());
};
//setMinutes(date.getMinutes() + 30);
