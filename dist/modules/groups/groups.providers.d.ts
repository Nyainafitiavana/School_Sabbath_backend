import { DataSource } from 'typeorm';
import { Group } from './entities/group.entity';
export declare const groupProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Group>;
    inject: string[];
}[];
