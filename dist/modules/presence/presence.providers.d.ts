import { DataSource } from 'typeorm';
import { Presence } from './entities/presence.entity';
export declare const presenceProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Presence>;
    inject: string[];
}[];
