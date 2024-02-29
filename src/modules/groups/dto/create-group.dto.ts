import { IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  public designation: string;

  @IsString()
  public year: string;
}
