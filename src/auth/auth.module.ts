import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { jwtSecret } from './constants';
import { AdminStrategy } from './strategies/admin.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({ secret: jwtSecret, signOptions: { expiresIn: '7d' } }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AdminStrategy],
  exports: [AuthService],
})
export class AuthModule {}
