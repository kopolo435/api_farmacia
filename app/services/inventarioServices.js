import Inventario from "../models/inventarioModel.js"; // Adjust the import path as necessary
import { logError } from "../config/loggers.js";

export const createInventario = async (
  nombreProducto,
  cantidadDisponible,
  idUnidadFK,
  precio,
  fechaVencimiento,
  tipoMedicamento,
  idProveedorFK,
) => {
  try {
    await Inventario.create({
      nombre_producto: nombreProducto,
      cantidad_disponible: cantidadDisponible,
      id_unidadFK: idUnidadFK,
      precio,
      fecha_vencimiento: fechaVencimiento,
      tipo_medicamento: tipoMedicamento,
      id_proveedorFK: idProveedorFK,
    });
    return { result: 1 };
  } catch (error) {
    logError.error(
      `Error occurred while creating product: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const updateInventario = async (
  id,
  nombreProducto,
  cantidadDisponible,
  idUnidadFK,
  precio,
  fechaVencimiento,
  tipoMedicamento,
  idProveedorFK,
) => {
  const updates = {
    nombre_producto: nombreProducto,
    cantidad_disponible: cantidadDisponible,
    id_unidadFK: idUnidadFK,
    precio,
    fecha_vencimiento: fechaVencimiento,
    tipo_medicamento: tipoMedicamento,
    id_proveedorFK: idProveedorFK,
  };

  try {
    const [updated] = await Inventario.update(updates, {
      where: { id },
    });

    if (updated) {
      const data = await Inventario.findByPk(id);
      return { status: 1, data };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while updating product: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const deleteInventario = async (id) => {
  try {
    const deleted = await Inventario.destroy({
      where: { id },
    });

    if (deleted) {
      return { status: 1 };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while deleting product: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const getInventarioById = async (id) => {
  try {
    const product = await Inventario.findByPk(id);
    if (product) {
      return { status: 1, data: product };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching product: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};
