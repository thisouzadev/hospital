import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { MailService } from './mail.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private readonly jwtSecret: string = 'seu_segredo_aqui';
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...userDto,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async update(userId: string, userDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    Object.assign(user, userDto);

    this.userRepository.save(user);

    return user;
  }

  async remove(userId: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.userRepository.remove(user);
  }

  async sendPasswordRecoveryEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Gere um token exclusivo para redefinição de senha
    const token = jwt.sign({ userId: user.userId }, this.jwtSecret, {
      expiresIn: '1h',
    });

    // Construa o corpo do e-mail
    const emailContent = `
      <h1>Redefinição de Senha</h1>
      <p>Olá ${user.email},</p>
      <p>Recebemos uma solicitação de redefinição de senha para sua conta.</p>
      <p>Para redefinir sua senha, clique no link abaixo:</p>
      <a href="http://localhost:5173/reset-password?token=${token}">Redefinir Senha</a>
      <p>Se você não solicitou uma redefinição de senha, ignore este e-mail.</p>
    `;

    // Envie o e-mail de recuperação de senha
    await this.mailService.sendEmail({
      to: email,
      subject: 'Redefinição de Senha',
      html: emailContent,
    });

    console.log(`E-mail de recuperação de senha enviado para: ${email}`);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      // Verifique se o token é válido
      const decodedToken = jwt.verify(token, this.jwtSecret) as {
        userId: string;
      };

      // Obtenha o usuário com base no ID do token
      const user = await this.userRepository.findOne({
        userId: decodedToken.userId,
      });
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      // Atualize a senha do usuário com a nova senha fornecida
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      // Salve as alterações no banco de dados
      await this.userRepository.save(user);

      console.log(
        `Senha redefinida com sucesso para o usuário com o token: ${token}`,
      );
    } catch (error) {
      // Se o token for inválido ou expirado, trate o erro apropriadamente
      console.error('Erro ao redefinir a senha:', error.message);
      throw new Error('Token inválido ou expirado');
    }
  }
}
