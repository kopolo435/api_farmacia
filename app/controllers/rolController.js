import * as rolServices from "../services/rolServices.js";
import getErrorBody from "../helpers/errorResponse.js";

export const createRol = async (req, res) => {
  const { nombre } = req.body;
  const result = await rolServices.createRol(nombre);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  return res.status(201).json({ status: "registro creado" });
};

export const updateRol = async (req, res) => {
  const { nombre } = req.body;
  const { id } = req.params;
  const result = await rolServices.updateRol(id, nombre);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res
      .status(200)
      .json({ status: "registro actualizado", result: result.data });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

export const deleteRol = async (req, res) => {
  const { id } = req.params;
  const result = await rolServices.deleteRol(id);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res.status(200).json({ status: "registro eliminado" });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

export const selectRol = async (req, res) => {
  const { id } = req.params;
  const result = await rolServices.getRolById(id);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res.status(200).json({ result: result.data });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};
