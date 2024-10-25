import { DataTypes } from "sequelize";
import sequelizeConnection from "../config/dbConfig.js";

const Proveedores = sequelizeConnection.define(
  "Proveedores",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre_proveedor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Proveedores",
    timestamps: false,
  },
);

// Proveedores.hasMany(Inventario, { foreignKey: "id_proveedorFK", as: "inventarios" });

export default Proveedores;
