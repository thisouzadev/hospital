import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('password-recovery')
  async sendPasswordRecoveryEmail(@Body() body: { email: string }) {
    const { email } = body;
    await this.userService.sendPasswordRecoveryEmail(email);
    return { message: 'E-mail de recuperação de senha enviado com sucesso.' };
  }

  // @Patch('reset-password/:token')
  // async resetPassword(
  //   @Param('token') token: string,
  //   @Body() body: { password: string },
  // ) {
  //   const { password } = body;
  //   await this.userService.resetPassword(token, password);
  //   return { message: 'Senha redefinida com sucesso.' };
  // }
}
