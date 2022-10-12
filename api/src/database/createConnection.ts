import { createConnection, Connection } from 'typeorm';

import * as entities from 'entities';

//type: 'postgres',

const createDatabaseConnection = (): Promise<Connection> =>
  createConnection({
    type: 'mysql',              // 'mssql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: Object.values(entities),
    synchronize: false,
    extra: {
      trustServerCertificate: true,
    }
  });

export default createDatabaseConnection;
