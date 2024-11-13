import * as clienteServices from "../services/clienteServices.js";
import getErrorBody from "../helpers/errorResponse.js";

// Function to create a new client
export const createCliente = async (req, res) => {
  const {
    nombres,
    apellidos,
    fechaNacimiento,
    email,
    alergias,
    medicamentosEnUso,
  } = req.body;

  const result = await clienteServices.createCliente(
    nombres,
    apellidos,
    fechaNacimiento,
    email,
    alergias,
    medicamentosEnUso,
  );

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res
      .status(error.status)
      .json({ status: "Error", data: null, error });
  }

  return res.status(201).json({ status: "Registro creado", data: result.data });
};

// Function to update client information
export const updateCliente = async (req, res) => {
  const {
    nombres,
    apellidos,
    fechaNacimiento,
    email,
    alergias,
    medicamentosEnUso,
  } = req.body;
  const { id } = req.params;

  console.log(`Received ID: ${id}`); // Add this log
  console.log(`Received Data: ${JSON.stringify(req.body)}`); // Add this log

  const result = await clienteServices.updateCliente(
    id,
    nombres,
    apellidos,
    fechaNacimiento,
    email,
    alergias,
    medicamentosEnUso,
  );

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res
      .status(200)
      .json({ status: "Registro actualizado", data: result.data });
  }

  return res.status(404).json({ status: "ID no encontrado" });
};

// Function to delete a client by ID
export const deleteCliente = async (req, res) => {
  const { id } = req.params;

  const result = await clienteServices.deleteCliente(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res
      .status(error.status)
      .json({ status: "Error", data: null, error });
  }

  if (result.status) {
    return res.status(200).json({ status: "Registro eliminado", data: null });
  }

  return res.status(404).json({ status: "Cliente no encontrado", data: null });
};

// Function to get client information by ID
export const selectCliente = async (req, res) => {
  const { id } = req.params;

  const result = await clienteServices.getClienteById(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res
      .status(error.status)
      .json({ status: "Error", data: null, error });
  }

  if (result.status) {
    return res.status(200).json({ status: "Success", data: result.data });
  }

  return res.status(404).json({ status: "Cliente no encontrado", data: null });
};

// Function to get all clients
export const getAllClientes = async (req, res) => {
  const result = await clienteServices.getClientes();

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res
      .status(error.status)
      .json({ status: "Error", data: null, error });
  }

  if (result.status) {
    return res.status(200).json({ status: "Success", data: result.data });
  }

  return res
    .status(404)
    .json({ status: "No se encontraron clientes", data: null });
};
