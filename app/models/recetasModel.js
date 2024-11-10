import { DataTypes } from "sequelize";
import sequelizeConnection from "../config/dbConfig.js";
import Clientes from "./clienteModel.js";
import Usuario from "./usuariosModel.js";

const Recetas = sequelizeConnection.define(
  "Recetas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_clienteFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Clientes",
        key: "id",
      },
    },
    id_usuarioFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Usuarios",
        key: "id",
      },
    },
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tipo_receta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    archivo_receta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Recetas",
    timestamps: false,
  },
);

Recetas.belongsTo(Clientes, { foreignKey: "id_clienteFK", as: "cliente" });
Recetas.belongsTo(Usuario, { foreignKey: "id_usuarioFK", as: "empleado" });

export default Recetas;
