import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project) private ProjectRepo: Repository<Project>){}

    public async findAllProjects(): Promise<Project[]> {
        return await this.ProjectRepo.find();
      }
    
      public async findById(id: number): Promise<Project | null> {
        return await this.ProjectRepo.findOneOrFail(id);
      }

      // public async findByUId(u_id: number): Promise<Project | null> {
      //   return this.ProjectRepo.find(u_id)
        
        
      // }
    
      public async create(project: Project): Promise<Project> {
        return this.ProjectRepo.save(project);
      }
    
      public async update(
        id: number,
        newValue: Project,
      ): Promise<Project | null> {
        const Project = await this.ProjectRepo.findOneOrFail(id);
        if (!Project) {
          console.error("Project doesn't exist");
        }
        await this.ProjectRepo.update(id, newValue);
        return await this.ProjectRepo.findOne(id);
      }
    
      public async delete(id: number): Promise<any> {
        return await this.ProjectRepo.delete(id);
      }
}
