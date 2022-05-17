const moment = require('moment');

const transformTimeFormat  = (time) => {
  const momentDate = moment(time);

  return momentDate.format('YYYY-MM-DD HH:mm:ss');
}

module.exports = transformTimeFormat;
