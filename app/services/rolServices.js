import Rol from "../models/rolModel.js";
import { logError } from "../config/loggers.js";

export const createRol = async (nombre) => {
  try {
    await Rol.create({
      nombres: nombre,
    });
    return { status: 1 };
  } catch (error) {
    logError.error(
      `Error occurred while creating role: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const getRolById = async (id) => {
  try {
    const rol = await Rol.findByPk(id);
    if (rol) {
      return { status: 1, data: rol };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while fetching role: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const updateRol = async (id, nombre) => {
  const updates = {
    nombres: nombre,
  };
  try {
    const [updated] = await Rol.update(updates, {
      where: { id },
    });

    if (updated) {
      const data = await Rol.findByPk(id);
      return { status: 1, data };
    }
    return { status: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while updating role: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};

export const deleteRol = async (id) => {
  try {
    const deleted = await Rol.destroy({
      where: { id },
    });

    if (deleted) {
      return { result: 1 };
    }
    return { result: 0 };
  } catch (error) {
    logError.error(
      `Error occurred while deleting role: ${JSON.stringify(error)}`,
    );
    return { error: "-1" };
  }
};
