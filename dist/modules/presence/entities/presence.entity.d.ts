import { Member } from '../../member/entities/member.entity';
import { Registry } from '../../registry/entities/registry.entity';
export declare class Presence {
    id: number;
    registry: Registry;
    member: Member;
    participation: number;
    isPonctual: boolean;
    isPresent: boolean;
}
