/* eslint-disable no-param-reassign */
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
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
    hooks: {
      // Hash password before saving
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  },
);

Usuario.belongsTo(Rol, { foreignKey: "id_rolFK" });
Rol.hasMany(Usuario, { foreignKey: "id_rolFK" });

export default Usuario;
