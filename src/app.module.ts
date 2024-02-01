import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { CollaboratorsModule } from './modules/collaborators.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://bastix:azsxdcfvgb@cluster0.clgsjp0.mongodb.net/'),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://cluster0.clgsjp0.mongodb.net/',
        dbName: 'GpcDb',
        user: 'bastix',
        pass: 'azsxdcfvgb',
      }),
      inject: [],
    }),

    CollaboratorsModule,
    ],
})

export class AppModule {}