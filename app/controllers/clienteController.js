import * as clienteServices from "../services/clienteServices.js";
import getErrorBody from "../helpers/errorResponse.js";

export const createCliente = async (req, res) => {
  const { nombres, apellidos, fechaNacimiento, email, alergias, medicamentos } =
    req.body;
  const result = await clienteServices.createCliente(
    nombres,
    apellidos,
    fechaNacimiento,
    email,
    alergias,
    medicamentos,
  );
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  return res.status(201).json({ status: "registro creado" });
};

export const updateCliente = async (req, res) => {
  const { nombres, apellidos, fechaNacimiento, email, alergias, medicamentos } =
    req.body;
  const { id } = req.params;
  const result = await clienteServices.updateCliente(
    id,
    nombres,
    apellidos,
    fechaNacimiento,
    email,
    alergias,
    medicamentos,
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

export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  const result = await clienteServices.deleteCliente(id);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res.status(200).json({ status: "registro eliminado" });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

export const selectCliente = async (req, res) => {
  const { id } = req.params;
  const result = await clienteServices.getClienteById(id);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res.status(200).json({ result: result.data });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

export const getAllClientes = async (req, res) => {
  const result = await clienteServices.getClientes();
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res.status(200).json({ result: result.data });
  }
  return res.status(200).json({ status: "No se encontraron clientes" });
};
