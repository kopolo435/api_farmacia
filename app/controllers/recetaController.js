import * as recetaServices from "../services/recetasServices.js";
import getErrorBody from "../helpers/errorResponse.js";

// Function to create a receta
export const createReceta = async (req, res) => {
  const { idClienteFK, idUsuarioFK, fechaEmision, tipoReceta, archivoReceta } =
    req.body;
  const result = await recetaServices.createReceta(
    idClienteFK,
    idUsuarioFK,
    fechaEmision,
    tipoReceta,
    archivoReceta,
  );

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  return res.status(201).json({ status: "registro creado" });
};

// Function to update a receta
export const updateReceta = async (req, res) => {
  const { idClienteFK, idUsuarioFK, fechaEmision, tipoReceta, archivoReceta } =
    req.body;
  const { id } = req.params;
  const result = await recetaServices.updateReceta(
    id,
    idClienteFK,
    idUsuarioFK,
    fechaEmision,
    tipoReceta,
    archivoReceta,
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

// Function to delete a receta
export const deleteReceta = async (req, res) => {
  const { id } = req.params;
  const result = await recetaServices.deleteReceta(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res.status(200).json({ status: "registro eliminado" });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};

// Function to select a receta
export const selectReceta = async (req, res) => {
  const { id } = req.params;
  const result = await recetaServices.getRecetaById(id);

  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res.status(200).json({ result: result.data });
  }
  return res.status(200).json({ status: "Id no encontrado" });
};
