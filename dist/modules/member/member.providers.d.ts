import { DataSource } from 'typeorm';
import { Member } from './entities/member.entity';
export declare const memberProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Member>;
    inject: string[];
}[];
