import { IsNotEmpty } from 'class-validator';
import { Group } from '../../groups/entities/group.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Presence } from '../../presence/entities/presence.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  fullName: string;

  @Column()
  @IsNotEmpty()
  address: string;

  @Column()
  @IsNotEmpty()
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isManager: boolean;

  @ManyToOne(() => Group, (group) => group.member, {
    onDelete: 'CASCADE',
  })
  group: Group;

  @OneToMany(() => Presence, (presence) => presence.member)
  presence: Presence[];
}
