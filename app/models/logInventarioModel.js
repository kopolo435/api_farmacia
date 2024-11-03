import { DataTypes } from "sequelize";
import sequelizeConnection from "../config/dbConfig.js";

const LogInventario = sequelizeConnection.define(
  "LogInventario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_inventarioFk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Inventario",
        key: "id",
      },
    },
    id_usuarioFk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Usuarios",
        key: "id",
      },
    },
    tipo_accion: {
      type: DataTypes.ENUM("insert", "update", "eliminar"),
      allowNull: false,
    },
    stock_anterior: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock_nuevo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    info_anterior: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    info_nuevo: {
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
    tableName: "log_inventario",
    timestamps: false,
  },
);

export default LogInventario;
