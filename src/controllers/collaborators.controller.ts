import { Controller, Get, Post, Delete, Put, Body, Param, ConflictException, Res } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateCollaboratorsDto } from 'src/models/collaborators/createCollaboratorsDto';
import { UpdateCollaboratorsDto } from 'src/models/collaborators/updateCollaboratorsDto';
import { CollaboratorsService } from 'src/services/collaborators.service';
import { Response } from 'express'; 
import * as fastCsv from 'fast-csv';
import { parse } from '@fast-csv/parse';

@Controller('collaborators')
export class CollaboratorsController {
    constructor(private collaboratorsService: CollaboratorsService){}

    @Get()
    async findAll(){
        const collaborators = await this.collaboratorsService.findAll();
        if(!collaborators) throw new NotFoundException('Collaborators not found');
        return collaborators;
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.collaboratorsService.findOne(id);
    }

    @Post()
    async create(@Body() body: CreateCollaboratorsDto ){
        try{
            return await this.collaboratorsService.create(body);
        }catch(error){
            if(error.code == 11000){
                throw new ConflictException('Collaborators already exists');
            }
        }
        
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        const collaborators = await this.collaboratorsService.delete(id);
        if(!collaborators) throw new NotFoundException('Collaborators not found');
        return collaborators;
    }

    @Put(':id')
    async update(@Param('id') id :string, @Body() body: UpdateCollaboratorsDto){
        const collaborators = await this.collaboratorsService.update(id, body);
        if(!collaborators) throw new NotFoundException('Collaborators not found');
        return collaborators;
    }

    @Get('export')
    async exportToCSV(@Res() res: Response) {
        console.log("llega");
        const data = await this.collaboratorsService.findAll();
        const fileName = 'collaborators.csv';
    
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        const stream = parse({ headers: true })
            .on('error', error => console.error(error))
            .on('data', row => console.log(row))
            .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

        data.forEach(item => {
            stream.write(item);
          });

        stream.end();
    }
}