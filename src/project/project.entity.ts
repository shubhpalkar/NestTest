import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';

@Entity('Project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  u_id: number

  @ManyToOne(type => User, user => user.id,{onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  user: User[];

}

