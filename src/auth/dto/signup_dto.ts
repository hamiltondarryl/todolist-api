import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDto {

    @ApiProperty({ description: "Le nom de l'utilisateur", type: String })
    @IsNotEmpty()
    nom: string;

    @ApiProperty({ description: "L'Email de l'utilisateur", type: String })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Le mot de passe de l'utilisateur", type: String })
    @IsNotEmpty()
    password: string;
  }