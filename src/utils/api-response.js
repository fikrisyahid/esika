const FAILED_RESPONSE = ({ res, data = null, message = "failed" }) =>
  res.status(400).json({
    status: "failed",
    statusCode: 400,
    message,
    data,
  });

const UNAUTHORIZED_RESPONSE = ({
  res,
  data = null,
  message = "you're not authorized",
}) =>
  res.status(401).json({
    status: "failed",
    statusCode: 401,
    message,
    data,
  });

const ERROR_RESPONSE = ({ res, data = null, message = "error" }) =>
  res.status(500).json({
    status: "error",
    statusCode: 500,
    message,
    data,
  });

const SUCCESS_RESPONSE = ({ res, data = null, message = "success" }) =>
  res.status(200).json({
    status: "success",
    statusCode: 200,
    message,
    data,
  });

export {
  FAILED_RESPONSE,
  UNAUTHORIZED_RESPONSE,
  ERROR_RESPONSE,
  SUCCESS_RESPONSE,
};
