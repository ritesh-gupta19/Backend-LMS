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

// A more robust check: enable SSL if the URL is for a Render database
const useSsl = process.env.DATABASE_URL.includes('onrender.com');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: useSsl 
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

export default sequelize;