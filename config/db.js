// import dotenv from "dotenv";
// dotenv.config(); 

// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   logging: false,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });


// export default sequelize;

/////////////////////////////////////////
// config/db.js
import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {}, // Use an empty object for local development
});

export default sequelize;