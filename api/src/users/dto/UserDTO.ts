import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class UserDTO {

  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  rg: string;

  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsString()
  dateOfBirth: Date;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
