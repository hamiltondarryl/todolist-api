import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
    @ApiProperty({ description: "L'Email de l'utilisateur", type: String })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Le mot de passe de l'utilisateur", type: String })
    @IsNotEmpty()
    password: string;
  }