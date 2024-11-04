import { Sequelize } from "sequelize";
import { logError, logToFile } from "../config/loggers.js";
import { Ventas, Inventario, Proveedores } from "../models/relations.js";

// Function to create a proveedor
export const createProveedor = async (
  nombreProveedor,
  telefono,
  email,
  direccion,
) => {
  if (!nombreProveedor || !telefono || !email || !direccion) {
    return { error: "All fields are required" };
  }

  try {
    const newProveedor = await Proveedores.create({
      nombre_proveedor: nombreProveedor,
      telefono,
      email,
      direccion,
    });
    return { result: 1, data: newProveedor };
  } catch (error) {
    logError.error(`Error occurred while creating proveedor: ${error.message}`);
    return { error: "An error occurred while creating the proveedor" };
  }
};

export const updateProveedor = async (
  id,
  nombreProveedor,
  telefono,
  email,
  direccion,
) => {
  if (!id || !nombreProveedor || !telefono || !email || !direccion) {
    return { error: "All fields are required" };
  }

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
      return { result: 1, data };
    }
    return { result: 0 };
  } catch (error) {
    logError.error(`Error occurred while updating proveedor: ${error.message}`);
    return { error: "An error occurred while updating the proveedor" };
  }
};

export const deleteProveedor = async (id) => {
  if (!id) {
    return { error: "ID is required" };
  }

  try {
    const deleted = await Proveedores.destroy({
      where: { id },
    });

    if (deleted) {
      return { result: 1 };
    }
    return { result: 0 };
  } catch (error) {
    logError.error(`Error occurred while deleting proveedor: ${error.message}`);
    return { error: "An error occurred while deleting the proveedor" };
  }
};

export const getProveedorById = async (id) => {
  if (!id) {
    return { error: "ID is required" };
  }

  try {
    const proveedor = await Proveedores.findByPk(id);
    if (proveedor) {
      return { result: 1, data: proveedor };
    }
    return { result: 0 };
  } catch (error) {
    logError.error(`Error occurred while fetching proveedor: ${error.message}`);
    return { error: "An error occurred while fetching the proveedor" };
  }
};

// Select all proveedores
export const getProveedores = async () => {
  try {
    const proveedores = await Proveedores.findAll();
    if (proveedores) {
      return { result: 1, data: proveedores };
    }
    return { result: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching proveedores: ${error.message}`,
    );
    return { error: "An error occurred while fetching the proveedores" };
  }
};

export const getTopProveedores = async () => {
  try {
    const topProveedores = await Ventas.findAll({
      attributes: [
        "Inventario.id_proveedorFK",
        [Sequelize.fn("COUNT", Sequelize.col("Ventas.id")), "total_sales"],
      ],
      include: [
        {
          model: Inventario,
          as: "Inventario",
          attributes: [],
          required: true, // Ensures only sales with valid inventory records are counted
        },
      ],
      group: ["Inventario.id_proveedorFK"],
      order: [[Sequelize.literal("total_sales"), "DESC"]],
      limit: 3,
      raw: true,
    });

    // Fetch additional supplier information
    const proveedoresInfo = await Promise.all(
      topProveedores.map(async (proveedor) => {
        const proveedorInfo = await Proveedores.findByPk(
          proveedor.id_proveedorFK,
        );
        return {
          nombre: proveedorInfo.nombre_proveedor,
          id: proveedorInfo.id,
          cantidadVendida: proveedor.total_sales,
        };
      }),
    );

    return proveedoresInfo;
  } catch (err) {
    logToFile.error(`Error fetching top proveedores:${err}`);
    return { error: "-1" };
  }
};
