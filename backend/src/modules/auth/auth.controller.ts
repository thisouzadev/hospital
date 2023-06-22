import { Body, Controller, Post } from '@nestjs/common';
import { instanceToInstance } from 'class-transformer';
import { AuthService } from './auth.service';
import { AuthReturnDto } from './dtos/auth-return.dto';
import { AuthCredentialsDto } from './dtos/user-auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<AuthReturnDto> {
    return this.authService.signin(instanceToInstance(authCredentialsDto));
  }
}
