import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config({ path: './.env' });

// export const db = new Sequelize(process.env.DATABASE_URL!, {
//     dialect: 'postgres',
//     host: process.env.DB_HOST,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB,
//     logging: false,
//     dialectOptions:
//     process.env.NODE_ENV === 'DEVELOPMENT'
//     ? {
//       port: process.env.DB_PORT,
//       sslmode: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     }
//     : {},
//   });


export const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
  });

