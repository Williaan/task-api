import { Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private dadosTasks: TaskDto[] = []

    create(task: TaskDto) {
        this.dadosTasks.push(task);
    }
}
