import { DataSource } from 'typeorm';
import { Presence } from './entities/presence.entity';

export const presenceProviders = [
  {
    provide: 'PRESENCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Presence),
    inject: ['DATA_SOURCE'],
  },
];
