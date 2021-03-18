import * as jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService,
  ) { }

  async register(user: User) {
    let status = {
      success: true,
      message: 'user register',
    };
    try {
      await this.usersService.register(user);
    } catch (err) {
      status = { success: false, message: err };
    }
    return status;
  }

  createToken(user: User) {

    const expiresIn = "3h";
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address
      },
      'shubh',
      { expiresIn },
    );

    return {
      expiresIn,
      accessToken,
    };
  }
}
