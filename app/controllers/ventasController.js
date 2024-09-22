import * as ventasServices from "../services/ventasServices.js";
import getErrorBody from "../helpers/errorResponse.js";

export const createVenta = async (req, res) => {
  const {
    idClienteFK,
    idUsuarioFK,
    idInventarioFK,
    cantidad,
    precioTotal,
    fechaVenta,
  } = req.body;

  const result = await ventasServices.createVenta(
    idClienteFK,
    idUsuarioFK,
    idInventarioFK,
    cantidad,
    precioTotal,
    fechaVenta,
  );

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  return res.status(201).json({ status: "registro creado" });
};

export const updateVenta = async (req, res) => {
  const {
    idClienteFK,
    idUsuarioFK,
    idInventarioFK,
    cantidad,
    precioTotal,
    fechaVenta,
  } = req.body;
  const { id } = req.params;

  const result = await ventasServices.updateVenta(
    id,
    idClienteFK,
    idUsuarioFK,
    idInventarioFK,
    cantidad,
    precioTotal,
    fechaVenta,
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

export const deleteVenta = async (req, res) => {
  const { id } = req.params;
  const result = await ventasServices.deleteVenta(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res.status(200).json({ status: "registro eliminado" });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

export const selectVenta = async (req, res) => {
  const { id } = req.params;
  const result = await ventasServices.getVentaById(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res.status(200).json({ result: result.data });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};
