import * as unidadMedicamentoServices from "../services/unidadMedicamentoServices.js";
import getErrorBody from "../helpers/errorResponse.js";

export const createUnidadMedicamento = async (req, res) => {
  const { nombre } = req.body;
  const result =
    await unidadMedicamentoServices.createUnidadMedicamento(nombre);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  return res.status(201).json({ status: "registro creado" });
};

export const updateUnidadMedicamento = async (req, res) => {
  const { nombre } = req.body;
  const { id } = req.params;
  const result = await unidadMedicamentoServices.updateUnidadMedicamento(
    id,
    nombre,
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

export const deleteUnidadMedicamento = async (req, res) => {
  const { id } = req.params;
  const result = await unidadMedicamentoServices.deleteUnidadMedicamento(id);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res.status(200).json({ status: "registro eliminado" });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

export const selectUnidadMedicamento = async (req, res) => {
  const { id } = req.params;
  const result = await unidadMedicamentoServices.getUnidadMedicamentoById(id);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  if (result.status) {
    return res.status(200).json({ result: result.data });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

export const getUnidadMedicamento = async (req, res) => {
  const result = await unidadMedicamentoServices.getUnidadMedicamento();
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  return res.status(200).json({ result: result.data });
};
