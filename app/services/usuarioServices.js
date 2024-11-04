import bcrypt from "bcrypt";
import Usuario from "../models/usuariosModel.js";
import { logError, logToFile } from "../config/loggers.js";
import { getJWT } from "../helpers/getJWT.js";

export const createUsuario = async (nombre, apellido, email, password, rol) => {
  try {
    await Usuario.create({
      nombres: nombre,
      apellidos: apellido,
      email,
      password,
      id_rolFK: rol,
      fecha_creacion: new Date(),
    });
    return { result: "success" };
  } catch (error) {
    logError.error(`Error ocurrio creando usuario${JSON.stringify(error)}`);
    return { error: "-1" };
  }
};

export const updateUsuario = async (id, nombre, apellido, email, rol) => {
  const updates = {
    nombres: nombre,
    apellidos: apellido,
    email,
    id_rolFK: rol,
  };
  try {
    const [updated] = await Usuario.update(updates, {
      where: { id },
    });

    if (updated) {
      const data = Usuario.findByPk(id);
      return { status: 1, data };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Ocurrio un error al actualizar un usuario: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const deleteUsuario = async (id) => {
  try {
    const deleted = await Usuario.destroy({
      where: { id },
    });

    if (deleted) {
      return { status: 1 };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Ocurrio un error al eliminar un usuarior: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const getUsuarioById = async (id) => {
  try {
    const user = await Usuario.findByPk(id);
    if (user) {
      return { status: 1, data: user };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Ocurrio un error al seleccionar un usuario: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const login = async (email, password) => {
  try {
    // Find the user by email
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return { error: "05" };
    }

    // Check if the provided password matches the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password doesn't match, return null
    if (!isPasswordValid) {
      return { error: "05" };
    }
    const token = getJWT(user.id, user.nombres, user.id_rolFK);
    return {
      token,
      user: {
        nombre: user.nombres,
        apellido: user.apellidos,
        rol: user.id_rolFK,
      },
    };
  } catch (error) {
    logToFile.error(`Error during login:${error}`);
    return { error: "-1" };
  }
};
