import { DataSource } from 'typeorm';
import { Registry } from './entities/registry.entity';
export declare const registryProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Registry>;
    inject: string[];
}[];
