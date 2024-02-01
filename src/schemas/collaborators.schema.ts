import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

class user {
    name: string;
    surname: string;
    email: string;
    userAd: string;
}

class skill{
    name: string;
    level: number;
}

@Schema({ timestamps: true })

export class Collaborators {
    @Prop({required: true})
    user: user;

    @Prop({default: true})
    active: boolean;

    @Prop()
    skills: skill[];
}

export const CollaboratorsSchema = SchemaFactory.createForClass(Collaborators);