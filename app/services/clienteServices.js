import Clientes from "../models/clienteModel.js";
import { logError } from "../config/loggers.js";

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
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while updating client: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const deleteCliente = async (id) => {
  try {
    const deleted = await Clientes.destroy({
      where: { id },
    });

    if (deleted) {
      return { status: 1 };
    }
    return { status: 0 };
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

export const getClientes = async () => {
  try {
    const client = await Clientes.findAll();
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
