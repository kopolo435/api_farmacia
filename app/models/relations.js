import Ventas from "./ventasModel.js";
import Inventario from "./inventarioModel.js";
import Proveedores from "./proveedoresModel.js";

// Define Associations
Inventario.hasMany(Ventas, { foreignKey: "id_inventarioFK", as: "Ventas" });
Ventas.belongsTo(Inventario, {
  foreignKey: "id_inventarioFK",
  as: "Inventario",
});

// Export Models
export { Ventas, Inventario, Proveedores };
