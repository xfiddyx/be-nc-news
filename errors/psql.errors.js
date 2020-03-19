const psqlErrors = (err, req, res, next) => {
  const errorCodeObj = {
    '22P02': { message: 'invalid request', status: 400 },
    '23502': { message: 'bad request', status: 400 },
    '23503': { message: 'invalid request', status: 400 },
    '42703': { message: 'invalid request', status: 400 }
  };
  if (errorCodeObj[err.code]) {
    res
      .status(errorCodeObj[err.code].status)
      .send({ msg: errorCodeObj[err.code].message });
  } else next(err);
};

module.exports = { psqlErrors };
