import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [UserModule, PassportModule,
        JwtModule.register({
        secret: jwtConstants.secret,
    })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService, LocalStrategy]
})
export class AuthModule {
    
}
