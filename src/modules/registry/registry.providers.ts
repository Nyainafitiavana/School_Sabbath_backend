import { DataSource } from 'typeorm';
import { Registry } from './entities/registry.entity';

export const registryProviders = [
  {
    provide: 'REGISTRY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Registry),
    inject: ['DATA_SOURCE'],
  },
];
