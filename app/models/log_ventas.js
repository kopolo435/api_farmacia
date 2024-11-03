import { DataTypes } from "sequelize";
import sequelizeConnection from "../config/dbConfig.js";
import Ventas from "./ventasModel.js";
import Usuarios from "./usuariosModel.js";

const LogVentas = sequelizeConnection.define(
  "LogVentas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_ventaFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ventas,
        key: "id",
      },
    },
    id_usuarioFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuarios,
        key: "id",
      },
    },
    tipo_accion: {
      type: DataTypes.ENUM("insert", "update", "eliminar"),
      allowNull: false,
    },
    valor_anterior: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    valor_nuevo: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Log_Ventas",
    timestamps: false,
  },
);

export default LogVentas;
