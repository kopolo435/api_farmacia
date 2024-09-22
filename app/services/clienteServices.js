import Clientes from "../models/clienteModel.js"; // Adjust the import path as necessary
import { logError } from "../config/loggers.js";

// Function to create a client
export const createCliente = async (
  nombres,
  apellidos,
  fechaNacimiento,
  email,
  alergias,
  medicamentos,
) => {
  try {
    await Clientes.create({
      nombres,
      apellidos,
      fecha_nacimiento: fechaNacimiento,
      email,
      alergias,
      medicamentos_en_uso: medicamentos,
    });
    return { result: 1 };
  } catch (error) {
    logError.error(
      `Error occurred while creating client: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

// Function to update a client by ID
export const updateCliente = async (
  id,
  nombres,
  apellidos,
  fechaNacimiento,
  email,
  alergias,
  medicamentos,
) => {
  const updates = {
    nombres,
    apellidos,
    fecha_nacimiento: fechaNacimiento,
    email,
    alergias,
    medicamentos_en_uso: medicamentos,
  };

  try {
    const [updated] = await Clientes.update(updates, {
      where: { id },
    });

    if (updated) {
      const data = await Clientes.findByPk(id);
      return { status: 1, data };
    }
    return { status: 0 }; // No rows updated
  } catch (error) {
    logError.error(
      `Error occurred while updating client: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

// Function to delete a client by ID
export const deleteCliente = async (id) => {
  try {
    const deleted = await Clientes.destroy({
      where: { id },
    });

    if (deleted) {
      return { status: 1 }; // Successfully deleted
    }
    return { status: 0 }; // No rows deleted
  } catch (error) {
    logError.error(
      `Error occurred while deleting client: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

// Function to get a client by ID
export const getClienteById = async (id) => {
  try {
    const client = await Clientes.findByPk(id);
    if (client) {
      return { status: 1, data: client };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching client: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};
