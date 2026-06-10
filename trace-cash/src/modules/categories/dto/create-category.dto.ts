import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsBoolean()
  @IsOptional()
  isEssential?: boolean;

  
  constructor(userId: string, name: string, domain: string, isEssential?: boolean) {
    this.userId = userId;
    this.name = name;
    this.domain = domain;
    this.isEssential = isEssential;
  }
}