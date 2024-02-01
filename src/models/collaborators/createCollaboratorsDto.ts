import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { SkillDto } from "./skills/skillDto";
import { CreateUserDto } from "./users/createUserDto";

export class CreateCollaboratorsDto{
    @IsNotEmpty()
    user: CreateUserDto;

    @IsBoolean()
    active?: boolean = true;

    @IsOptional()
    skills?: SkillDto[];
}