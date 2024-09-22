import { DataTypes } from "sequelize";
import Rol from "./rolModel.js";
import sequelizeConnetion from "../config/dbConfig.js";

const Usuario = sequelizeConnetion.define(
  "Usuario",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelizeConnetion.NOW,
    },
    id_rolFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Rol,
        key: "id",
      },
    },
  },
  {
    tableName: "Usuarios",
    timestamps: false,
  },
);

Usuario.belongsTo(Rol, { foreignKey: "id_rolFK" });
Rol.hasMany(Usuario, { foreignKey: "id_rolFK" });

export default Usuario;
