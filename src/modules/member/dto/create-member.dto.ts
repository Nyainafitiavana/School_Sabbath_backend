import { IsBoolean, IsObject, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  public fullName: string;

  @IsString()
  public address: string;

  @IsString()
  public phoneNumber: string;

  @IsObject()
  public group: object;

  @IsString()
  public password?: string;

  @IsString()
  public email?: string;

  @IsBoolean()
  public isAdmin: boolean;

  @IsBoolean()
  public isManager: boolean;
}
