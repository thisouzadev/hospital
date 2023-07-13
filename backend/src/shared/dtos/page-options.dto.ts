import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

const DEFAULT_TAKE = 10;

export class PageOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take: number = DEFAULT_TAKE;

  public getSkip?(): number {
    return (this.page - 1) * (this.take || DEFAULT_TAKE);
  }
}
