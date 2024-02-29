import { IsNumber, IsObject, IsString } from 'class-validator';

export class CreateRegistryDto {
  @IsNumber()
  public sabbathNumber: number;

  @IsNumber()
  public month: number;

  @IsNumber()
  public year: number;

  @IsNumber()
  public quarterly: number;

  @IsString()
  public offering: number;

  @IsObject()
  public group: object;

  @IsString()
  public membersPresent?: number;

  @IsString()
  public visitor?: number;

  @IsString()
  public total?: number;

  @IsString()
  public sevenParticipation?: number;

  @IsString()
  public missionaryWork?: number;

  @IsString()
  public volunteering?: number;

  @IsString()
  public bibleStudy?: number;

  @IsString()
  public booksDistributed?: number;

  @IsString()
  public conferencesOrganized?: number;

  @IsString()
  public teachingBiblePaper?: number;

  @IsString()
  public numberBatem?: number;
}
