import { promises as fs } from "fs";
import Recetas from "../models/recetasModel.js"; // Adjust the import path as necessary
import { logError } from "../config/loggers.js";
import Clientes from "../models/clienteModel.js";
import Usuario from "../models/usuariosModel.js";

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
  };

  if (archivoReceta !== undefined) {
    updates.archivo_receta = archivoReceta;
  }

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

export const getAllRecetas = async () => {
  try {
    const recetas = await Recetas.findAll({
      include: [
        {
          model: Clientes,
          as: "Clientes",
          attributes: ["nombres", "apellidos"],
        },
        {
          model: Usuario,
          as: "Usuarios",
          attributes: ["nombres", "apellidos"],
        },
      ],
    });
    return { status: 1, data: recetas };
  } catch (error) {
    logError.error(
      `Error occurred while fetching recetas: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const getPDFBase64 = async (filepath) => {
  try {
    const fileData = await fs.readFile(`./app/uploads/${filepath}`);

    const base64String = fileData.toString("base64");

    return { base64PDF: base64String };
  } catch (error) {
    logError.error(`Error reading the file at ${filepath}: ${error.message}`);
    return { error: "-1" };
  }
};
