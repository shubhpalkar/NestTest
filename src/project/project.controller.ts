import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService){}

    @Get()
    showAll(){
        return this.projectService.findAllProjects()
    }

    @Get(':id')
    showOne(@Param('id') id: number){
        return this.projectService.findById(id)
    }

    @Put(':id')
    modifyUser(@Param('id') id: number, @Body() project: Project){
        return this.projectService.update(id, project)
    }

    @Delete(':id')
    removeUser(@Param('id') id: number){
        return this.projectService.delete(id)
    }

    @Post()
    addProject( @Body() prodata: Project){
        return this.projectService.create(prodata)
    }
}
