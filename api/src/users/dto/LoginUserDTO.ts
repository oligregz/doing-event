import { IsString, IsUUID } from "class-validator";

export class LoginUserDTO {

  @IsUUID()
  id: string;

  @IsString()
  login: string;

  @IsString()
  password: string;
}
