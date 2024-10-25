import UnidadMedicamento from "../models/unidadMedicamento.js"; // Adjust the import path as necessary
import { logError } from "../config/loggers.js";

export const createUnidadMedicamento = async (nombre) => {
  try {
    await UnidadMedicamento.create({
      nombre,
    });
    return { result: 1 };
  } catch (error) {
    logError.error(
      `Error occurred while creating unidad medicamento: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const updateUnidadMedicamento = async (id, nombre) => {
  const updates = {
    nombre,
  };

  try {
    const [updated] = await UnidadMedicamento.update(updates, {
      where: { id },
    });

    if (updated) {
      const data = await UnidadMedicamento.findByPk(id);
      return { status: 1, data };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while updating unidad medicamento: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const deleteUnidadMedicamento = async (id) => {
  try {
    const deleted = await UnidadMedicamento.destroy({
      where: { id },
    });

    if (deleted) {
      return { status: 1 };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while deleting unidad medicamento: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const getUnidadMedicamentoById = async (id) => {
  try {
    const unidad = await UnidadMedicamento.findByPk(id);
    if (unidad) {
      return { status: 1, data: unidad };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching unidad medicamento: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

// Select all UnidadMedicamento
export const getUnidadMedicamento = async () => {
  try {
    const unidadData = await UnidadMedicamento.findAll({
      attributes: ["id", "nombre"],
    });
    return { status: 1, data: unidadData };
  } catch (error) {
    logError.error(
      `Error occurred while fetching unidad medicamento: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};
