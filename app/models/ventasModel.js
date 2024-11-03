import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Ventas = sequelize.define(
  "Ventas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    id_inventarioFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Inventario",
        key: "id",
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha_venta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "ventas",
    timestamps: false,
  },
);

export default Ventas;
