import * as proveedorServices from "../services/proveedoresServices.js";
import getErrorBody from "../helpers/errorResponse.js";

export const createProveedor = async (req, res) => {
  const { nombreProveedor, telefono, email, direccion } = req.body;
  const result = await proveedorServices.createProveedor(
    nombreProveedor,
    telefono,
    email,
    direccion,
  );

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(400).json(error);
  }

  return res.status(201).json({ status: "Registro creado", data: result.data });
};

export const updateProveedor = async (req, res) => {
  const { nombreProveedor, telefono, email, direccion } = req.body;
  const { id } = req.params;
  const result = await proveedorServices.updateProveedor(
    id,
    nombreProveedor,
    telefono,
    email,
    direccion,
  );

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(400).json(error);
  }

  if (result.result === 1) {
    return res
      .status(200)
      .json({ status: "Registro actualizado", data: result.data });
  }

  return res.status(404).json({ status: "Id no encontrado" });
};

export const deleteProveedor = async (req, res) => {
  const { id } = req.params;
  const result = await proveedorServices.deleteProveedor(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(400).json(error);
  }

  if (result.result === 1) {
    return res.status(200).json({ status: "Registro eliminado" });
  }

  return res.status(404).json({ status: "Id no encontrado" });
};

export const selectProveedor = async (req, res) => {
  const { id } = req.params;
  const result = await proveedorServices.getProveedorById(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(400).json(error);
  }

  if (result.result === 1) {
    return res.status(200).json({ data: result.data });
  }

  return res.status(404).json({ status: "Id no encontrado" });
};

export const getProveedores = async (req, res) => {
  const result = await proveedorServices.getProveedores();

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(400).json(error);
  }

  return res.status(200).json({ result });
};
