import { DataTypes } from "sequelize";
import sequelizeConnection from "../config/dbConfig.js";

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
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    alergias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medicamentos_en_uso: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Clientes",
    timestamps: false,
  },
);

export default Clientes;
