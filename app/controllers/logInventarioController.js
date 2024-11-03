import * as logInventarioServices from "../services/logInventarioServices.js";
import getErrorBody from "../helpers/errorResponse.js";

// Create LogInventario
export const createLogInventario = async (req, res) => {
  const {
    idInventarioFk,
    idUsuarioFk,
    tipoAccion,
    stockAnterior,
    stockNuevo,
    infoAnterior,
    infoNuevo,
    descripcion,
  } = req.body;

  const result = await logInventarioServices.createLogInventario(
    idInventarioFk,
    idUsuarioFk,
    tipoAccion,
    stockAnterior,
    stockNuevo,
    infoAnterior,
    infoNuevo,
    descripcion,
  );

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  return res.status(201).json({ status: "registro creado" });
};

// Update LogInventario
export const updateLogInventario = async (req, res) => {
  const {
    idInventarioFk,
    idUsuarioFk,
    tipoAccion,
    stockAnterior,
    stockNuevo,
    infoAnterior,
    infoNuevo,
    descripcion,
  } = req.body;
  const { id } = req.params;

  const result = await logInventarioServices.updateLogInventario(
    id,
    idInventarioFk,
    idUsuarioFk,
    tipoAccion,
    stockAnterior,
    stockNuevo,
    infoAnterior,
    infoNuevo,
    descripcion,
  );

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res.status(200).json({
      status: "registro actualizado",
      result: result.data,
    });
  }

  return res.status(200).json({ status: "Id no encontrado" });
};

// Delete LogInventario
export const deleteLogInventario = async (req, res) => {
  const { id } = req.params;

  const result = await logInventarioServices.deleteLogInventario(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res.status(200).json({ status: "registro eliminado" });
  }

  return res.status(200).json({ status: "Id no encontrado" });
};

// Get LogInventario by ID
export const getLogInventarioById = async (req, res) => {
  const { id } = req.params;

  const result = await logInventarioServices.getLogInventarioById(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res.status(200).json({ result: result.data });
  }

  return res.status(200).json({ status: "Id no encontrado" });
};
