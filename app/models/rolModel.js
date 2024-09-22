import { DataTypes } from "sequelize";
import sequelizeConnetion from "../config/dbConfig.js";

// Define the 'Roles' model
const Rol = sequelizeConnetion.define(
  "Rol",
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
  },
  {
    tableName: "Roles",
    timestamps: false,
  },
);

export default Rol;
