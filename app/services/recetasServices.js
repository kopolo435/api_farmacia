import Recetas from "../models/recetasModel.js"; // Adjust the import path as necessary
import { logError } from "../config/loggers.js";

export const createReceta = async (
  idClienteFK,
  idUsuarioFK,
  fechaEmision,
  tipoReceta,
  archivoReceta,
) => {
  try {
    await Recetas.create({
      id_clienteFK: idClienteFK,
      id_usuarioFK: idUsuarioFK,
      fecha_emision: fechaEmision,
      tipo_receta: tipoReceta,
      archivo_receta: archivoReceta,
    });
    return { result: 1 };
  } catch (error) {
    logError.error(
      `Error occurred while creating receta: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const updateReceta = async (
  id,
  idClienteFK,
  idUsuarioFK,
  fechaEmision,
  tipoReceta,
  archivoReceta,
) => {
  const updates = {
    id_clienteFK: idClienteFK,
    id_usuarioFK: idUsuarioFK,
    fecha_emision: fechaEmision,
    tipo_receta: tipoReceta,
    archivo_receta: archivoReceta,
  };

  try {
    const [updated] = await Recetas.update(updates, {
      where: { id },
    });

    if (updated) {
      const data = await Recetas.findByPk(id);
      return { status: 1, data };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while updating receta: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const deleteReceta = async (id) => {
  try {
    const deleted = await Recetas.destroy({
      where: { id },
    });

    if (deleted) {
      return { status: 1 };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while deleting receta: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const getRecetaById = async (id) => {
  try {
    const receta = await Recetas.findByPk(id);
    if (receta) {
      return { status: 1, data: receta };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching receta: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};
