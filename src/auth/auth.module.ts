import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [JwtModule, forwardRef(() => EmployeeModule)],
  controllers: [AuthController],
  providers: [AccessTokenStrategy, RefreshTokenStrategy, AuthService],
  exports: [AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
