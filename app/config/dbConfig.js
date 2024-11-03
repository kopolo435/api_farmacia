import { Sequelize } from "sequelize";

const sequelizeConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: "mysql",
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
);

try {
  await sequelizeConnection.authenticate();
  console.log("Autenticacion completada");
} catch (error) {
  console.log("Fallo autenticacion", JSON.stringify(error));
}

export default sequelizeConnection;
