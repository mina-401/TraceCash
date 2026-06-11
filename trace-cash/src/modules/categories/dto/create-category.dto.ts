import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsBoolean()
  @IsOptional()
  isEssential?: boolean;

  constructor(name: string, domain: string, isEssential?: boolean) {
    this.name = name;
    this.domain = domain;
    this.isEssential = isEssential;
  }
}