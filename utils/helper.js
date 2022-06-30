export const today = () => {
  var date = new Date();
  return date;
};

export const addMinute = () => {
  //Adding 10 minutes//
  const minute = new Date(Date.now() + ((3600 * 1000) / 60) * 10);
  return minute;
};

export const addHour = () => {
  //Adding one day//
  const hour = new Date(Date.now() + 3600 * 1000 * 24);
  return hour;
};

export const addMonth = () => {
  //30 days//
  const month = new Date(Date.now() + 3600 * 1000 * 24 * 30);
  return month;
};
