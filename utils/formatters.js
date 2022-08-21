import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const minuteAgo = (property) => {
  return dayjs(property).fromNow();
};

export const getTheTime = (date) => {
  return dayjs(date).format("DD-MM-YYYY");
};
