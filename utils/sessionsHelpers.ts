import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(localizedFormat);


export const formatSessionTime = (dateTime: string) => {
    const sessionTime = dayjs(dateTime);
  
    if (sessionTime.isToday()) {
      return `Today at ${sessionTime.format("HH:mm")}`;
    } else if (sessionTime.isTomorrow()) {
      return `Tomorrow at ${sessionTime.format("HH:mm")}`;
    } else {
      return sessionTime.format("dddd, D MMM [at] HH:mm"); // Example: "Sunday, 14 Jul at 18:00"
    }
  };