import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service';
import { AuthResponseDTO } from '../dto/AuthResponseDTO';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationtimeInSeconds: number | undefined;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationtimeInSeconds = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  signIn(username: string, password: string): AuthResponseDTO {
    const user = this.usersService.findByUsername(username);

    if (!user || !compareSync(password, user.password))
      throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      username: user.name,
    };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationtimeInSeconds };
  }
}
