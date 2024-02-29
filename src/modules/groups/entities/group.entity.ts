import { IsNotEmpty } from 'class-validator';
import { Member } from '../../member/entities/member.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Registry } from './../../registry/entities/registry.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  designation: string;

  @Column()
  @IsNotEmpty()
  year: string;

  @OneToMany(() => Member, (member) => member.group)
  member: Member[];

  @OneToMany(() => Registry, (registry) => registry.group)
  registry: Registry[];
}
