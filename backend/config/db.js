const { Sequelize } = require("sequelize");

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is missing");
}

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

module.exports = sequelize;