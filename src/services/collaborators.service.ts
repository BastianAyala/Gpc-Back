import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCollaboratorsDto } from 'src/models/collaborators/createCollaboratorsDto';
import { UpdateCollaboratorsDto } from 'src/models/collaborators/updateCollaboratorsDto';
import { Collaborators } from 'src/schemas/collaborators.schema';

@Injectable()
export class CollaboratorsService {
    constructor(@InjectModel(Collaborators.name) private collaboratorsModel: Model<Collaborators>){}

    async findAll(){
        return await this.collaboratorsModel.find();
    }

    async create(createCollaborators: CreateCollaboratorsDto){
        if(createCollaborators.user.name == undefined || createCollaborators.user.surname == undefined){
            throw new NotFoundException('The Name and Surname fields are required');
        }

        const newCollaborators = new this.collaboratorsModel(createCollaborators);
        await newCollaborators.save();
        return newCollaborators;
    }

    async findOne(id: string){
        return this.collaboratorsModel.findById(id);
    }

    async delete(id: string){
        return this.collaboratorsModel.findByIdAndDelete(id);
    }

    async update(id: string, collaborator: UpdateCollaboratorsDto){

        // if(collaborator.skills != undefined){
        //     const currentCollaborators = this.collaboratorsModel.findById(id);
        //     const currentSkills = (await currentCollaborators).skills;

        //     collaborator.skills.forEach(skill => {
        //         let skillFindedIndex = currentSkills.findIndex( item => item.name == skill.name);
        //         if(skillFindedIndex == -1){
        //             currentSkills.push(skill);
        //         }else{
        //             currentSkills[skillFindedIndex].level = skill.level;
        //             currentSkills[skillFindedIndex].name = skill.name;
        //         }
        //     });
            
        //     collaborator.skills = currentSkills;
        // }
        // console.log(collaborator);
        return this.collaboratorsModel.findByIdAndUpdate(id, collaborator, { new: true});
    }
}