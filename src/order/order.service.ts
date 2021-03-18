import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private orderRepo: Repository<Order>){}

    public async findAllOrders(): Promise<Order[]> {
        return await this.orderRepo.find();
      }

      public async findById(id: number): Promise<Order | null> {
        return await this.orderRepo.findOneOrFail(id);
      }
    
      public async create(Order: Order): Promise<Order> {
        return this.orderRepo.save(Order);
      }
    
      public async update(
        id: number,
        newValue: Order,
      ): Promise<Order | null> {
        const Order = await this.orderRepo.findOneOrFail(id);
        if (!Order) {
          throw new HttpException(
            'User does not exists',
            HttpStatus.NOT_FOUND
          );
        }
        await this.orderRepo.update(id, newValue);
        return await this.orderRepo.findOne(id);
      }
    
      public async delete(id: number): Promise<any> {
        return await this.orderRepo.delete(id);
      }
    
}
