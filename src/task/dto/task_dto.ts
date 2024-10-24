import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TaskDto {
    @ApiProperty({ description: "Le contenu de la tache", type: String })
    @IsNotEmpty()
    contenu: string;
  }