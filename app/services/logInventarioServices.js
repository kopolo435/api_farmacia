import LogInventario from "../models/logInventarioModel.js";
import { logError } from "../config/loggers.js";

// Create LogInventario
export const createLogInventario = async (
  idInventarioFk,
  idUsuarioFk,
  tipoAccion,
  stockAnterior,
  stockNuevo,
  infoAnterior,
  infoNuevo,
  descripcion,
) => {
  try {
    await LogInventario.create({
      id_inventarioFk: idInventarioFk,
      id_usuarioFk: idUsuarioFk,
      tipo_accion: tipoAccion,
      stock_anterior: stockAnterior,
      stock_nuevo: stockNuevo,
      info_anterior: infoAnterior,
      info_nuevo: infoNuevo,
      descripcion,
      fecha: new Date(),
    });
    return { result: 1 };
  } catch (error) {
    logError.error(
      `Error occurred while creating log: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

// Update LogInventario
export const updateLogInventario = async (
  id,
  idInventarioFk,
  idUsuarioFk,
  tipoAccion,
  stockAnterior,
  stockNuevo,
  infoAnterior,
  infoNuevo,
  descripcion,
) => {
  const updates = {
    id_inventarioFk: idInventarioFk,
    id_usuarioFk: idUsuarioFk,
    tipo_accion: tipoAccion,
    stock_anterior: stockAnterior,
    stock_nuevo: stockNuevo,
    info_anterior: infoAnterior,
    info_nuevo: infoNuevo,
    descripcion,
    fecha: new Date(),
  };

  try {
    const [updated] = await LogInventario.update(updates, {
      where: { id },
    });

    if (updated) {
      const data = await LogInventario.findByPk(id);
      return { status: 1, data };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while updating log: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

// Delete LogInventario
export const deleteLogInventario = async (id) => {
  try {
    const deleted = await LogInventario.destroy({
      where: { id },
    });

    if (deleted) {
      return { status: 1 };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while deleting log: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

// Get LogInventario by ID
export const getLogInventarioById = async (id) => {
  try {
    const log = await LogInventario.findByPk(id);
    if (log) {
      return { status: 1, data: log };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching log: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};
