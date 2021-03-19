import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
import { Observable } from 'rxjs';
import { Order } from 'src/order/order.entity';
import { OrderService } from 'src/order/order.service';
import { Project } from 'src/project/project.entity';
import { ProjectService } from 'src/project/project.service';
import { Repository, DeleteResult, getRepository, getConnection, getMetadataArgsStorage } from 'typeorm';
import { User } from './user.entity';

export type UserLogin = any;
export type Orderlogin = any;
export type Projectlogin = any;

@Injectable()
export class UserService {

  public readonly userslog = [
    {
      id: 1,
      name: 'shubh',
      email: 'shubh@getMaxListeners.com',
      password: 'root',
      phone: 123654789,
      address: 'Mumbai'
    },
    {
      id: 2,
      name: 'shubham',
      email: 'shubham@getMaxListeners.com',
      password: 'root',
      phone: 123654789,
      address: 'Mumbai'
    },
    {
      id: 3,
      name: 'shubhangi',
      email: 'shubhangi@getMaxListeners.com',
      password: 'root',
      phone: 123654789,
      address: 'Mumbai'
    },
    {
      id: 4,
      name: 'Raj',
      email: 'raj@getMaxListeners.com',
      password: 'root',
      phone: 123654789,
      address: 'Mumbai'
    }
  ];


  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private projectservice: ProjectService,
    private orderservice: OrderService,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>
  ) { }

  public findAll() {
    return this.userRepository.find();
  }

  public async findByEmail(userEmail: string): Promise<UserLogin> {

    const data = await this.userslog.find(user => user.email === userEmail);
    return data;
  }

  public async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOneOrFail(id);
  }

  public async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async update(
    id: number,
    newValue: User,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneOrFail(id);
    if (!user) {
      throw new HttpException(
        'User does not exists',
        HttpStatus.NOT_FOUND
      );
    }
    await this.userRepository.update(id, newValue);
    return await this.userRepository.findOne(id);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  public async register(userDto: User): Promise<User> {
    const { email } = userDto;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = await this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async findUserslog(): Promise<any> {
    return this.userslog
  }


 async getData(id: number): Promise<any>{
    const projectResult = getConnection()
      .createQueryBuilder()
      .select('project.u_id')
      .from(Project, 'project')
      .where("project.u_id = :u_id ",{u_id: id})
      // .getManyAndCount()
      .getCount()

      projectResult.then(function (result) {
          console.log("Projects count ", result)
        })

      return projectResult;
 }


 async getOrder(id: number): Promise<any>{
  const orderResult = getConnection()
    .createQueryBuilder()
    .select('order.u_id')
    .from(Order, 'order')
    .where("order.u_id = :u_id ",{u_id: id})
    // .getManyAndCount()
    .getCount()

    orderResult.then(function (result) {
        console.log("Order count ", result)
      })

    return orderResult;
}


    

  findOneByOne() {

    const userResult = this.findAll()

    userResult.then(function (result) {
      console.log("All users are ", result);
    })

    userResult.then(res => {
      res.forEach(element => {

        console.log("each user", element)
        console.log("each id", element.id)
        let id = element.id;

       this.getData(id)

       this.getOrder(id)
      })
    })

    return userResult;
  }

}