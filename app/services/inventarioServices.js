import Sequelize from "sequelize";
import { Inventario, Proveedores } from "../models/relations.js";
import UnidadMedicamento from "../models/unidadMedicamento.js";
import { logError } from "../config/loggers.js";
import defineAssociations from "../associations/association_Inventario.js";

defineAssociations();

export const createInventario = async (
  nombreProducto,
  cantidadDisponible,
  idUnidadFK,
  precio,
  fechaVencimiento,
  tipoMedicamento,
  idProveedorFK, // Foreign key for the Proveedores table
) => {
  try {
    // Check if the Proveedor exists in the Proveedores table
    const proveedor = await Proveedores.findByPk(idProveedorFK);

    if (!proveedor) {
      // If the Proveedor does not exist, return an error
      return { error: "Proveedor not found" };
    }

    // Create the Inventario entry with the foreign key association
    const newInventario = await Inventario.create({
      nombre_producto: nombreProducto,
      cantidad_disponible: cantidadDisponible,
      id_unidadFK: idUnidadFK,
      precio,
      fecha_vencimiento: fechaVencimiento,
      tipo_medicamento: tipoMedicamento,
      id_proveedorFK: idProveedorFK, // Foreign key referencing Proveedores
    });
    return { result: 1, data: newInventario };
  } catch (error) {
    logError.error(
      `Error occurred while creating product: ${JSON.stringify(error)}`,
    );
    return { error: "-1" }; // Return generic error code
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
    // Perform the update and check if any rows were updated
    const [updated] = await Inventario.update(updates, {
      where: { id },
    });

    if (updated) {
      // Fetch and return the updated data if the update was successful
      const updatedData = await Inventario.findByPk(id);
      return {
        status: 1,
        message: "Inventory updated successfully",
        data: updatedData,
      };
    }
    // If no rows were affected, return a more meaningful response
    return { status: 0, message: "No changes made, inventory not updated" };
  } catch (error) {
    // Log the error and return a detailed error response
    logError.error(
      `Error occurred while updating inventory: ${JSON.stringify(error)}`,
    );
    return {
      error: "-1",
      message: "An error occurred while updating the inventory",
    };
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

export const getFarmaciaInventario = async () => {
  try {
    const inventarioData = await Inventario.findAll({
      attributes: [
        "id",
        "nombre_producto",
        "cantidad_disponible",
        "precio",
        "fecha_vencimiento",
        "tipo_medicamento",
      ],
      include: [
        {
          model: Proveedores,
          as: "proveedor",
          attributes: ["id", "nombre_proveedor"],
        },
        {
          model: UnidadMedicamento,
          as: "unidad",
          attributes: ["id", "nombre"],
        },
      ],
    });
    return inventarioData;
  } catch (error) {
    logError.error(`Error occurred while fetching inventory: ${error.message}`);
    return { error: "-1" };
  }
};

export const getProductsToFinish = async () => {
  try {
    // Limite para cant baja de stock
    const lowStockLimit = 5;
    const productsToFinish = await Inventario.findAll({
      attributes: ["id", "nombre_producto", "cantidad_disponible"],
      where: {
        cantidad_disponible: {
          [Sequelize.Op.lte]: lowStockLimit,
        },
      },
    });
    return productsToFinish.length
      ? { status: 1, data: productsToFinish }
      : { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching low-stock products: ${error.message}`,
    );
    return { error: "-1" };
  }
};

export const getProductsToExpire = async () => {
  try {
    // Se configura fecha de expiracion limite de hasta 30 dias
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    const productsToExpire = await Inventario.findAll({
      attributes: ["id", "nombre_producto", "cantidad_disponible"],
      where: {
        fecha_vencimiento: {
          [Sequelize.Op.lte]: expirationDate,
        },
      },
    });
    return productsToExpire;
  } catch (error) {
    logError.error(`Error occurred while fetching inventory: ${error.message}`);
    return { error: "-1" };
  }
};
