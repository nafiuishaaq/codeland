import { IsJSON, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMetaOptionsDto {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}