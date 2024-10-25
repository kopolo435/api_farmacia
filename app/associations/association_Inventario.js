import Proveedores from "../models/proveedoresModel.js";
import Inventario from "../models/inventarioModel.js";
import UnidadMedicamento from "../models/unidadMedicamento.js";

// Definir las asociaciones después de la carga de los modelos
const defineAssociations = () => {
  Inventario.belongsTo(Proveedores, {
    foreignKey: "id_proveedorFK",
    as: "proveedor",
  });
  Inventario.belongsTo(UnidadMedicamento, {
    foreignKey: "id_unidadFK",
    as: "unidad",
  });
  Proveedores.hasMany(Inventario, {
    foreignKey: "id_proveedorFK",
    as: "inventarios",
  });
};

export default defineAssociations;
