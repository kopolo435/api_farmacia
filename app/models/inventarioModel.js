import { DataTypes } from "sequelize";
import sequelizeConnection from "../config/dbConfig.js";

const Inventario = sequelizeConnection.define(
  "Inventario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre_producto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad_disponible: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_unidadFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Unidad_Medicamento",
        key: "id",
      },
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha_vencimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tipo_medicamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[0, 1]],
      },
    },
    id_proveedorFK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Proveedores",
        key: "id",
      },
    },
  },
  {
    tableName: "Inventario",
    timestamps: false,
  },
);

// // Relaciones: Un inventario pertenece a un proveedor
// Inventario.belongsTo(Proveedores, { foreignKey: "id_proveedorFK", as: "proveedor" });
// // Un inventario pertenece a una unidad de medicamento
// Inventario.belongsTo(UnidadMedicamento, { foreignKey: "id_unidadFK", as: "unidad" });

export default Inventario;
