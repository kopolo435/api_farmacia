import getErrorBody from "../helpers/errorResponse.js";

// eslint-disable-next-line import/prefer-default-export
export const validateAdmin = (req, res, next) => {
  if (req.user.idRol === 1) {
    next();
  } else {
    const error = getErrorBody("03");
    res.status(error.status).json(error);
  }
};
