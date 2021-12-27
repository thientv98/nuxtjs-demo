import dayjs from "dayjs"

const serializeObj = (obj) => {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
};

const getNth = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

const getTimeRange = (start, end) => {
  if(start && end) {
    var delta = Math.abs(new Date(end) - new Date(start)) / 1000;
    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    let time = ''
    if(days > 0) {
      time += days + 'day '
    }
    if(hours > 0) {
      time += hours + 'hrs '
    }
    if(minutes > 0) {
      time += minutes + 'mins '
    }
    return time
  }
  return ''
}

const formatDateToday = (time) => {
  const date = dayjs(time).format('YYYY-MM-DD')
  const now = dayjs().format('YYYY-MM-DD')

  if(date === now) {
    return dayjs(time).format('HH:mm A')
  } else {
    return dayjs(time).format('YYYY-MM-DD HH:mm A')
  }
}

const testUtil = () => {
  return 'from util with love'
}

export default {
  serializeObj,
  getNth,
  getTimeRange,
  formatDateToday,
  testUtil
};
