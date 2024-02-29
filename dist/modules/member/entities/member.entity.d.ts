import { Group } from '../../groups/entities/group.entity';
import { Presence } from '../../presence/entities/presence.entity';
export declare class Member {
    id: number;
    fullName: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isManager: boolean;
    group: Group;
    presence: Presence[];
}
