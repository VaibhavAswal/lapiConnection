const errorHandler = (error, req, res, next) => {
    if (error.status === 500 || !error.status) {
      console.log(error);
      return res.status(500).json({
        message: "We are sorry, but something went wrong at the server.",
      });
    }
    return res.status(error.status).json({
        message: error.message,
        error: error.data || error.error || error,
      });
};

module.exports = errorHandler;
