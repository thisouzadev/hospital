import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from '../funcionario/entities/funcionario.entity';
import { FuncionarioRepository } from '../funcionario/repositories/funcionario.repository';

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXP_H'),
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    JwtModule.registerAsync(jwtFactory),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Funcionario, FuncionarioRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
