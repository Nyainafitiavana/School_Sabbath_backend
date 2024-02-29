import { IsNotEmpty } from 'class-validator';
import { Member } from '../../member/entities/member.entity';
import { Registry } from '../../registry/entities/registry.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Presence {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Registry, (registry) => registry.presence, {
    onDelete: 'CASCADE',
  })
  registry: Registry;

  @ManyToOne(() => Member, (member) => member.presence, {
    onDelete: 'CASCADE',
  })
  member: Member;

  @Column()
  @IsNotEmpty()
  participation: number;

  @Column()
  @IsNotEmpty()
  isPonctual: boolean;

  @Column()
  @IsNotEmpty()
  isPresent: boolean;
}
