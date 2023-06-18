import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dtos/user-auth-credentials.dto';
import { UserJwtPayload } from './dtos/user-jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signin(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const email: string = authCredentialsDto.email;
    const password: string = authCredentialsDto.password;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      const senhaMatches = await bcrypt.compare(password, user.password);

      if (!senhaMatches) {
        throw new UnauthorizedException('email/senha inválidos!');
      }

      const { role, userId } = user;
      const payload: UserJwtPayload = { email, role, userId };
      const { password: _, ...userData } = user;
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken, user: userData };
    } else {
      throw new UnauthorizedException('email/senha inválidos!');
    }
  }
}
