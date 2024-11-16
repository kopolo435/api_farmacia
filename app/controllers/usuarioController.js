import * as usuarioServices from "../services/usuarioServices.js";
import getErrorBody from "../helpers/errorResponse.js";
// eslint-disable-next-line import/prefer-default-export
export const createUsuario = async (req, res) => {
  const { nombre, apellido, email, password, rol } = req.body;
  const result = await usuarioServices.createUsuario(
    nombre,
    apellido,
    email,
    password,
    rol,
  );
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  return res.status(201).json({ status: "Usuario creado" });
};

export const updateusuario = async (req, res) => {
  const { nombre, apellido, email, password, rol } = req.body;
  const { id } = req.params;
  const result = await usuarioServices.updateUsuario(
    id,
    nombre,
    apellido,
    email,
    password,
    rol,
  );
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res
      .status(200)
      .json({ status: "registro actualizado", user: result.data });
  }
  return res.status(200).json({ status: "Id no encotrado" });
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  const result = await usuarioServices.deleteUsuario(id);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  return res.status(200).json({ status: "Usuario eliminado" });
};

export const selectusuario = async (req, res) => {
  const { id } = req.params;
  const result = await usuarioServices.getUsuarioById(id);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  if (result.status) {
    return res.status(200).json({ user: result.data });
  }
  return res.status(200).json({ status: "Id no encotrado" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = getErrorBody("02", ["email", "password"]);
    return res.status(error.status).json(error);
  }

  const result = await usuarioServices.login(email, password);
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }

  return res.status(200).json(result);
};

export const getAllUsuarios = async (req, res) => {
  const result = await usuarioServices.getAllUsuarios();
  if (result.error) {
    const error = getErrorBody(result.error, []);
    return res.status(error.status).json(error);
  }
  return res.status(200).json({ users: result.data });
};
