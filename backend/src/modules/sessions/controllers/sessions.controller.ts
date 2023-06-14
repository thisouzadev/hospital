import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  CreateSessionResponse,
  SessionsService,
} from '../services/sessions.service';
import { CreateSessionDto } from '../dtos/createSession.dto';

@Controller('sessao')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<CreateSessionResponse> {
    return this.sessionsService.create(createSessionDto);
  }
}
