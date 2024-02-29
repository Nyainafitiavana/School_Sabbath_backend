import { IsBoolean, IsNumber, IsObject } from 'class-validator';

export class CreatePresenceDto {
  @IsObject()
  public member: object;

  @IsObject()
  public registry: object;

  @IsBoolean()
  public isPonctual: boolean;

  @IsBoolean()
  public isPresent: boolean;

  @IsNumber()
  public participation: number;
}
