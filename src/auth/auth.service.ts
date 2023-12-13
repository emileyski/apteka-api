import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from 'src/core/interfaces/tokens.interface';
import { JwtPayload } from 'src/core/interfaces/jwt-payload.interface';
import { hash, verify } from 'argon2';
import { SignInDto } from './dto/sign-in.dto';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<Tokens> {
    const { EmployeeID, Position, Password } =
      await this.employeeService.findOneOrThrowByEmail(signInDto.email);

    const isPasswordValid = await verify(Password, signInDto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const { accessToken, refreshToken } = await this.generateTokens({
      id: EmployeeID,
      role: Position.PositionName,
    });

    return { accessToken, refreshToken };
  }

  logOut(userId: number): void {
    this.employeeService.updateRefreshToken(userId, null);
  }

  async refreshTokens(userId: number, token: string): Promise<Tokens> {
    console.log('refreshTokens', token, userId);

    const { Token: hashedRefreshToken, Position } =
      await this.employeeService.findOne(userId, false);

    if (!hashedRefreshToken) {
      throw new ForbiddenException('Invalid refresh token');
    }
    const isRefreshTokenValid = await verify(hashedRefreshToken, token);

    if (!isRefreshTokenValid) {
      throw new ForbiddenException('Invalid refresh token');
    }
    const { accessToken, refreshToken } = await this.generateTokens({
      id: userId,
      role: Position.PositionName,
    });

    return { accessToken, refreshToken };
  }

  //#region reusable methods
  private async generateTokens(payload: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(payload, '1d'), //TODO: refactor to ENV
      this.signToken(payload, '7d'),
    ]);
    const hashedRefreshToken = await hash(refreshToken);
    await this.employeeService.updateRefreshToken(
      payload.id,
      hashedRefreshToken,
    );

    return { accessToken, refreshToken };
  }

  private async signToken(payload: JwtPayload, expiresIn: string) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_KEY || 'some_jwt_secret',
      //   audience: 'audience',
      //   issuer: 'issuer',
      expiresIn,
    });
  }

  //#endregion
}
