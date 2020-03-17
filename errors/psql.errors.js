const psqlErrors = (err, req, res, next) => {
  const errorCodeObj = {
    '22P02': { message: 'Invalid id', status: 400 },
    '23502': { message: 'Bad request', status: 400 },
    '23503': { message: 'invalid body request', status: 400 },
    '42703': { message: 'invalid id', status: 400 }
  };
  if (errorCodeObj[err.code]) {
    res
      .status(errorCodeObj[err.code].status)
      .send({ msg: errorCodeObj[err.code].message });
  } else next(err);
};

module.exports = { psqlErrors };
