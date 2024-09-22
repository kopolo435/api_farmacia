import { DataTypes } from "sequelize";
import sequelizeConnection from "../config/dbConfig.js"; // Adjust the import path as necessary

// Define the 'Clientes' model
const Clientes = sequelizeConnection.define(
  "Clientes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
      validate: {
        isEmail: true, // Validate email format
      },
    },
    alergias: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    medicamentos_en_uso: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
  },
  {
    tableName: "Clientes",
    timestamps: false, // Set to true if you want createdAt/updatedAt columns
  },
);

export default Clientes;
