import { IsBoolean, IsOptional } from "class-validator";
import { SkillDto } from "./skills/skillDto";
import { UpdateUserDto } from "./users/updateUserDto";

export class UpdateCollaboratorsDto{
    @IsOptional()
    user?: UpdateUserDto;

    @IsOptional()
    @IsBoolean()
    active?: boolean;

    @IsOptional()
    skills?: SkillDto[];
}