import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCitiesQueryDTO {
  @IsOptional()
  stateId: number;

  @IsOptional()
  @IsString()
  partialName: string;
}
