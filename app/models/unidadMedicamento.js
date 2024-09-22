import { DataTypes } from "sequelize";
import sequelizeConnection from "../config/dbConfig.js"; // Adjust the import path as necessary

const UnidadMedicamento = sequelizeConnection.define(
  "UnidadMedicamento",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "unidad_medicamento", // Adjust if necessary
    timestamps: false,
  },
);

export default UnidadMedicamento;
