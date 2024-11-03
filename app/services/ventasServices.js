import Ventas from "../models/ventasModel.js";
import { logError } from "../config/loggers.js";

export const createVenta = async (
  idClienteFK,
  idUsuarioFK,
  idInventarioFK,
  cantidad,
  precioTotal,
  fechaVenta,
) => {
  try {
    await Ventas.create({
      id_clienteFK: idClienteFK,
      id_usuarioFK: idUsuarioFK,
      id_inventarioFK: idInventarioFK,
      cantidad,
      precio_total: precioTotal,
      fecha_venta: fechaVenta,
    });
    return { result: 1 };
  } catch (error) {
    logError.error(
      `Error occurred while creating sale: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const updateVenta = async (
  id,
  idClienteFK,
  idUsuarioFK,
  idInventarioFK,
  cantidad,
  precioTotal,
  fechaVenta,
) => {
  const updates = {
    id_clienteFK: idClienteFK,
    id_usuarioFK: idUsuarioFK,
    id_inventarioFK: idInventarioFK,
    cantidad,
    precio_total: precioTotal,
    fecha_venta: fechaVenta,
  };

  try {
    const [updated] = await Ventas.update(updates, {
      where: { id },
    });

    if (updated) {
      const data = await Ventas.findByPk(id);
      return { status: 1, data };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while updating sale: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const deleteVenta = async (id) => {
  try {
    const deleted = await Ventas.destroy({
      where: { id },
    });

    if (deleted) {
      return { status: 1 };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while deleting sale: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const getVentaById = async (id) => {
  try {
    const venta = await Ventas.findByPk(id);
    if (venta) {
      return { status: 1, data: venta };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching sale: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};
