import {
  Controller, UseGuards,
  HttpStatus, Response,
  Get, Post,
  Body, Put, Param, Delete, Req, Res,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLogin, UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) { }


  @Post('login')
  public async login(@Response() res, @Body() login: any) {

    const user = await this.usersService.findByEmail(login.email);

    if (!user) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'User Not Found',
      });
    } else {
      if (user && user.password === login.password) {
        const { password, ...result } = user;
        const token = this.authService.createToken(login);
        return res.status(HttpStatus.OK).json(token);
      }
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Password is not matching',
      })
    }
  }

  @Get()
  showLog() {
    return this.usersService.findUserslog()
  }
}



