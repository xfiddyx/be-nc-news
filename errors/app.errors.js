const statusCodeErrors = (err, req, res, next) => {
  const statusCodeErr = {
    404: { message: 'not found', status: 404 },
    400: { message: 'invalid request', status: 400 }
  };
  if (statusCodeErr[err]) {
    res
      .status(statusCodeErr[err].status)
      .send({ msg: statusCodeErr[err].message });
  } else next(err);
};

module.exports = { statusCodeErrors };
