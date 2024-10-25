import Proveedores from "../models/proveedoresModel.js";
import { logError } from "../config/loggers.js";

// Function to create a proveedor
export const createProveedor = async (
  nombreProveedor,
  telefono,
  email,
  direccion,
) => {
  try {
    await Proveedores.create({
      nombre_proveedor: nombreProveedor,
      telefono,
      email,
      direccion,
    });
    return { result: 1 };
  } catch (error) {
    logError.error(
      `Error occurred while creating proveedor: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const updateProveedor = async (
  id,
  nombreProveedor,
  telefono,
  email,
  direccion,
) => {
  const updates = {
    nombre_proveedor: nombreProveedor,
    telefono,
    email,
    direccion,
  };

  try {
    const [updated] = await Proveedores.update(updates, {
      where: { id },
    });

    if (updated) {
      const data = await Proveedores.findByPk(id);
      return { status: 1, data };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while updating proveedor: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const deleteProveedor = async (id) => {
  try {
    const deleted = await Proveedores.destroy({
      where: { id },
    });

    if (deleted) {
      return { status: 1 };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while deleting proveedor: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const getProveedorById = async (id) => {
  try {
    const proveedor = await Proveedores.findByPk(id);
    if (proveedor) {
      return { status: 1, data: proveedor };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching proveedor: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

// select all proveedores
export const getProveedores = async () => {
  try {
    const proveedores = await Proveedores.findAll({
      attributes: ["id", "nombre_proveedor"],
    });
    if (proveedores) {
      return { status: 1, data: proveedores };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching proveedores: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};
