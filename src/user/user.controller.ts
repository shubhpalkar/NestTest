import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor (private userService: UserService){}

    @Get()
    showAll(){
        return this.userService.findOneByOne()
    }

    @Get(':id')
    showOne(@Param('id') id: number){
        return this.userService.findById(id)
    }

    @Put(':id')
    modifyUser(@Param('id') id: number, @Body() userdata: User){
        return this.userService.update(id, userdata)
    }

    @Delete(':id')
    removeUser(@Param('id') id: number){
        return this.userService.delete(id)
    }

    @Post()
    addUser( @Body() userdata: User){
        return this.userService.create(userdata)
    }

}
