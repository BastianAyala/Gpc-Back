import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SkillDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    level: number;
}