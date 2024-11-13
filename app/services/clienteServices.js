import Clientes from "../models/clienteModel.js";
import { logError } from "../config/loggers.js";

// Create a new client
export const createCliente = async (
  nombres,
  apellidos,
  fechaNacimiento,
  email,
  alergias,
  medicamentosEnUso,
) => {
  try {
    const newClient = await Clientes.create({
      nombres,
      apellidos,
      fecha_nacimiento: fechaNacimiento,
      email,
      alergias,
      medicamentos_en_uso: medicamentosEnUso,
    });
    return {
      status: 1,
      data: newClient,
      message: "Client created successfully",
    };
  } catch (error) {
    logError.error(
      `Error occurred while creating client: ${JSON.stringify(error)}`,
    );
    return { error: "-1", message: "Failed to create client" };
  }
};

// Update client information
export const updateCliente = async (
  id,
  nombres,
  apellidos,
  fechaNacimiento,
  email,
  alergias,
  medicamentosEnUso,
) => {
  const updates = {
    nombres,
    apellidos,
    fecha_nacimiento: fechaNacimiento,
    email,
    alergias,
    medicamentos_en_uso: medicamentosEnUso,
  };

  try {
    console.log(
      `Updating Client ID: ${id} with data: ${JSON.stringify(updates)}`,
    );
    const [updated] = await Clientes.update(updates, {
      where: { id },
    });

    console.log(`Update Result: ${updated}`);

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

// Delete a client by ID
export const deleteCliente = async (id) => {
  try {
    const deleted = await Clientes.destroy({
      where: { id },
    });

    if (deleted) {
      return { status: 1, message: "Client deleted successfully" };
    }
    return { status: 0, message: "Client not found" };
  } catch (error) {
    logError.error(
      `Error occurred while deleting client: ${JSON.stringify(error)}`,
    );
    return { error: "-1", message: "Failed to delete client" };
  }
};

// Get client information by ID
export const getClienteById = async (id) => {
  try {
    const client = await Clientes.findByPk(id);
    if (client) {
      return { status: 1, data: client, message: "Client found" };
    }
    return { status: 0, data: null, message: "Client not found" };
  } catch (error) {
    logError.error(
      `Error occurred while fetching client: ${JSON.stringify(error)}`,
    );
    return { error: "-1", message: "Failed to fetch client" };
  }
};

// Get all clients
export const getClientes = async () => {
  try {
    const clients = await Clientes.findAll();
    if (clients.length > 0) {
      return {
        status: 1,
        data: clients,
        message: "Clients retrieved successfully",
      };
    }
    return { status: 0, data: [], message: "No clients found" };
  } catch (error) {
    logError.error(
      `Error occurred while fetching clients: ${JSON.stringify(error)}`,
    );
    return { error: "-1", message: "Failed to fetch clients" };
  }
};
