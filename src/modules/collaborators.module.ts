import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { CollaboratorsController } from 'src/controllers/collaborators.controller';
import { CollaboratorsService } from 'src/services/collaborators.service';
import { Collaborators, CollaboratorsSchema } from 'src/schemas/collaborators.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Collaborators.name,
        schema: CollaboratorsSchema,
      }
    ])
  ],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService]
})

export class CollaboratorsModule {}