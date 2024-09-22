import * as logVentasServices from "../services/logVentasService.js";
import getErrorBody from "../helpers/errorResponse.js";

export const createLogVenta = async (req, res) => {
  const {
    idVentaFK,
    idUsuarioFK,
    tipoAccion,
    valorAnterior,
    valornuevo,
    descripcion,
  } = req.body;
  const result = await logVentasServices.createLogVenta(
    idVentaFK,
    idUsuarioFK,
    tipoAccion,
    valorAnterior,
    valornuevo,
    descripcion,
  );
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  return res.status(201).json({ status: "registro creado" });
};

export const updateLogVenta = async (req, res) => {
  const {
    idVentaFK,
    idUsuarioFK,
    tipoAccion,
    valorAnterior,
    valornuevo,
    descripcion,
  } = req.body;
  const { id } = req.params;
  const result = await logVentasServices.updateLogVenta(
    id,
    idVentaFK,
    idUsuarioFK,
    tipoAccion,
    valorAnterior,
    valornuevo,
    descripcion,
  );
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

export const deleteLogVenta = async (req, res) => {
  const { id } = req.params;
  const result = await logVentasServices.deleteLogVenta(id);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res.status(200).json({ status: "registro eliminado" });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

export const selectLogVenta = async (req, res) => {
  const { id } = req.params;
  const result = await logVentasServices.getLogVentaById(id);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res.status(200).json({ result: result.data });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};
