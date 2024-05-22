import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config({ path: './.env' });

export const db = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB || 'challenge',
    logging: false,
    dialectOptions:
    process.env.NODE_ENV === 'DEVELOPMENT'
    ? {
      port: process.env.DB_PORT || 5432,
      sslmode: {
        require: true,
        rejectUnauthorized: false,
      },
    }
    : {},
  });


