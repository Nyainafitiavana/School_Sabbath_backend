import { Member } from '../../member/entities/member.entity';
import { Registry } from './../../registry/entities/registry.entity';
export declare class Group {
    id: number;
    designation: string;
    year: string;
    member: Member[];
    registry: Registry[];
}
