import { DataSource } from 'typeorm';
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} from './../index.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: DB_HOST,
        port: parseInt(DB_PORT, 10),
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
