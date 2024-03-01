import { Group } from '../../groups/entities/group.entity';
import { Presence } from '../../presence/entities/presence.entity';
export declare class Registry {
    id: number;
    sabbathNumber: number;
    month: number;
    year: number;
    quarterly: number;
    date: Date;
    offering: number;
    membersPresent: number;
    visitor: number;
    total: number;
    sevenParticipation: number;
    missionaryWork: number;
    volunteering: number;
    bibleStudy: number;
    booksDistributed: number;
    conferencesOrganized: number;
    teachingBiblePaper: number;
    numberBatem: number;
    group: Group;
    presence: Presence[];
}
