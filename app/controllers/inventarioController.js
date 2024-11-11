import * as inventarioServices from "../services/inventarioServices.js";
import getErrorBody from "../helpers/errorResponse.js";

export const createInventario = async (req, res) => {
  const {
    nombreProducto,
    cantidadDisponible,
    idUnidadFK,
    precio,
    fechaVencimiento,
    tipoMedicamento,
    idProveedorFK,
  } = req.body;

  const result = await inventarioServices.createInventario(
    nombreProducto,
    cantidadDisponible,
    idUnidadFK,
    precio,
    fechaVencimiento,
    tipoMedicamento,
    idProveedorFK,
  );

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  // If successful, return the created item
  return res.status(201).json({
    status: "Registro creado",
    data: result.data,
  });
};

export const updateInventario = async (req, res) => {
  const {
    nombreProducto,
    cantidadDisponible,
    idUnidadFK,
    precio,
    fechaVencimiento,
    tipoMedicamento,
    idProveedorFK,
  } = req.body;
  const { id } = req.params;

  const result = await inventarioServices.updateInventario(
    id,
    nombreProducto,
    cantidadDisponible,
    idUnidadFK,
    precio,
    fechaVencimiento,
    tipoMedicamento,
    idProveedorFK,
  );

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res
      .status(200)
      .json({ status: "registro actualizado", data: result.data });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

export const deleteInventario = async (req, res) => {
  const { id } = req.params;
  const result = await inventarioServices.deleteInventario(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res.status(200).json({ status: "registro eliminado" });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

export const selectInventario = async (req, res) => {
  const { id } = req.params;
  const result = await inventarioServices.getInventarioById(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res.status(200).json({ result: result.data });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

export const getFarmaciaInventario = async (req, res) => {
  const result = await inventarioServices.getFarmaciaInventario();
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  return res.status(200).json({ result });
};

export const getProductsToFinish = async (req, res) => {
  const result = await inventarioServices.getProductsToFinish();

  if (result.length === 0) {
    return { error: "No products with low stock" };
  }

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res.status(200).json({ result });
  }
  return res.status(200).json(result);
};

export const getProductsToExpire = async (req, res) => {
  const result = await inventarioServices.getProductsToExpire();
  if (result.length === 0) {
    return { error: "No products expiring soon" };
  }
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  return res.status(200).json({ result });
};
