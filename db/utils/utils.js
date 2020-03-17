exports.formatDates = list => {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  const changeDateObjects = list.map(obj => {
    const newObj = { ...obj };
    let reconfigDate = new Date(obj.created_at);

    let day = days[reconfigDate.getDay()];
    let year = reconfigDate.getFullYear();
    let month = months[reconfigDate.getMonth()];
    let date = reconfigDate.getDate();
    let hour = reconfigDate.getHours();
    let currentHour = ('0' + hour).slice(-2);
    let min = reconfigDate.getMinutes();
    let currentMin = ('0' + min).slice(-2);

    let sec = reconfigDate.getSeconds();
    let currentSec = ('0' + sec).slice(-2);
    let time = `${day}, ${month} ${date}, ${year} ${currentHour}:${currentMin}:${currentSec}`;

    newObj.created_at = time;

    return newObj;
  });
  return changeDateObjects;
};

exports.makeRefObj = list => {
  let referenceObject = {};

  list.forEach(obj => {
    let value = obj.article_id;
    let key = obj.title;
    referenceObject[key] = value;
  });

  return referenceObject;
};

exports.formatComments = (comments, articleRef) => {};
