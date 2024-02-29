import { IsNotEmpty } from 'class-validator';
import { Group } from '../../groups/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Presence } from '../../presence/entities/presence.entity';

@Entity()
export class Registry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  sabbathNumber: number;

  @Column()
  @IsNotEmpty()
  month: number;

  @Column()
  @IsNotEmpty()
  year: number;

  @Column({ nullable: true })
  quarterly: number;

  @Column()
  @CreateDateColumn()
  date: Date;

  @Column({ nullable: true })
  offering: number;

  @Column({ nullable: true })
  membersPresent: number;

  @Column({ nullable: true })
  visitor: number;

  @Column({ nullable: true })
  total: number;

  @Column({ nullable: true })
  sevenParticipation: number;

  @Column({ nullable: true })
  missionaryWork: number;

  @Column({ nullable: true })
  volunteering: number;

  @Column({ nullable: true })
  bibleStudy: number;

  @Column({ nullable: true })
  booksDistributed: number;

  @Column({ nullable: true })
  conferencesOrganized: number;

  @Column({ nullable: true })
  teachingBiblePaper: number;

  @Column({ nullable: true })
  numberBatem: number;

  @ManyToOne(() => Group, (group) => group.registry, {
    onDelete: 'CASCADE',
  })
  group: Group;

  @OneToMany(() => Presence, (presence) => presence.registry)
  presence: Presence[];
}
