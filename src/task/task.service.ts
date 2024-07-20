import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private dadosTasks: TaskDto[] = []

    create(task: TaskDto) {
        this.dadosTasks.push(task);
    }


    findById(id: string): TaskDto {
        const foundTask = this.dadosTasks.filter(t => t.id === id);

        if (foundTask.length) {
            return foundTask[0];
        }

        throw new HttpException(`Task with id ${id} not found!`, HttpStatus.NOT_FOUND)
    }

    findAll(params: FindAllParameters): TaskDto[] {
        return this.dadosTasks.filter(t => {
            let match = true;

            if (params.title !== undefined && !t.title.includes(params.title)) {
                match = false;
            }

            if (params.status !== undefined && !t.status.includes(params.status)) {
                match = false;
            }


            return match;
        })


    }


    uptade(task: TaskDto) {
        let taskIndex = this.dadosTasks.findIndex(t => t.id === task.id);

        if (taskIndex >= 0) {
            return this.dadosTasks[taskIndex] = task;
        }

        throw new HttpException(`Task with id ${task.id} not found!`, HttpStatus.BAD_REQUEST)
    }


    remove(id: string): TaskDto {

        let taskIndex = this.dadosTasks.findIndex(t => t.id === id);

        if (taskIndex >= 0) {
            this.dadosTasks.splice(taskIndex, 1);
            return
        }

        throw new HttpException(`Task with id ${id} not found!`, HttpStatus.BAD_REQUEST)
    }
}
