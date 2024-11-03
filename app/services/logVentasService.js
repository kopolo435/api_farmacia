import LogVentas from "../models/log_ventas.js";
import { logError } from "../config/loggers.js";

export const createLogVenta = async (
  idVentaFK,
  idUsuarioFK,
  tipoAccion,
  valorAnterior,
  valornuevo,
  descripcion,
) => {
  try {
    await LogVentas.create({
      id_ventaFK: idVentaFK,
      id_usuarioFK: idUsuarioFK,
      tipo_accion: tipoAccion,
      valor_anterior: valorAnterior,
      valor_nuevo: valornuevo,
      descripcion,
      fecha: new Date(),
    });
    return { result: 1 };
  } catch (error) {
    logError.error(
      `Error occurred while creating log entry: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const updateLogVenta = async (
  id,
  idVentaFK,
  idUsuarioFK,
  tipoAccion,
  valorAnterior,
  valornuevo,
  descripcion,
) => {
  const updates = {
    id_ventaFK: idVentaFK,
    id_usuarioFK: idUsuarioFK,
    tipo_accion: tipoAccion,
    valor_anterior: valorAnterior,
    valor_nuevo: valornuevo,
    descripcion,
    fecha: new Date(),
  };

  try {
    const [updated] = await LogVentas.update(updates, {
      where: { id },
    });

    if (updated) {
      const data = await LogVentas.findByPk(id);
      return { status: 1, data };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while updating log entry: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const deleteLogVenta = async (id) => {
  try {
    const deleted = await LogVentas.destroy({
      where: { id },
    });

    if (deleted) {
      return { status: 1 };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while deleting log entry: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const getLogVentaById = async (id) => {
  try {
    const logVenta = await LogVentas.findByPk(id);
    if (logVenta) {
      return { status: 1, data: logVenta };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching log entry: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};
