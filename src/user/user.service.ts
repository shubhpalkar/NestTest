import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
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
    private orderservice: OrderService
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


  // findOneByOne() {

  //   const userResult = this.findAll()

  //   userResult.then( function(result) {
  //     console.log("All users are ", result);
  //   })

  //   userResult.then(res => {
  //     res.forEach(element => {

  //       console.log("each user", element)

  //       const projectResult = this.projectservice.findAllProjects()

  //       console.log("project result ", projectResult);
  //       projectResult.then(function (result)  {
  //           console.log("project s",result)
  //         })

  //       const orderResult = this.orderservice.findAllOrders();
  //       console.log("order result ", orderResult);
  //       orderResult.then(function(result) {
  //           console.log("order ",result)
  //         })

  //       })
  //     })


  //   return userResult
  // }

  async getData(id: number){
    let projectResult = getConnection()
      .createQueryBuilder()
      // .select('project')
      .select('COUNT(*)', 'count')
      .from(Project, 'project')
      .where('project.u_id = id')
      .execute()

      projectResult.then(function (result) {
        console.log("project s", result)
      })
      return projectResult;
    }

    async getOrder(id: number){

      console.log("this is order id", id)
      let orderResult = getConnection()
          .createQueryBuilder()
          // .select('order')
          .select('COUNT(*)', 'count')
          .from(Order, 'order')
          .where('order.u_id = id')
          .execute()

          orderResult.then(function (result) {
            console.log("orders ", result)
          })
          // console.log("orders ", orderResult)
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

        console.log("this is log", id)

       let projectResult = this.getData(id)

        console.log("project result ", projectResult);

        let result = this.getOrder(id)

        console.log("order result ", result);

        
      })
    })

    return userResult;
  }

}