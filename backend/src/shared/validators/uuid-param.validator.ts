import { IsUUID } from 'class-validator';

export class UuidParamValidator {
  @IsUUID()
  id: string;
}
