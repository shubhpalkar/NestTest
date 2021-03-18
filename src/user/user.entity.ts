import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Project } from 'src/project/project.entity';
import { Order } from 'src/order/order.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 150})
  @IsNotEmpty()
  name: string

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  phone: number;

  @Column()
  @IsNotEmpty()
  address: String;

  @OneToMany(type => Project, project =>  project.id)
  projects: Project;

  @OneToMany(type => Order, order =>  order.id, {cascade: true})
  order: Order;

}

