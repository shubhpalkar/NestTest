import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService){}

    @Get()
    showAll(){
        return this.orderService.findAllOrders()
    }

    @Get(':id')
    showOne(@Param('id') id: number){
        return this.orderService.findById(id)
    }

    @Put(':id')
    modifyUser(@Param('id') id: number, @Body() order: Order){
        return this.orderService.update(id, order)
    }

    @Delete(':id')
    removeUser(@Param('id') id: number){
        return this.orderService.delete(id)
    }

    @Post()
    addOrder( @Body() orddata: Order){
        return this.orderService.create(orddata)
    }
}
