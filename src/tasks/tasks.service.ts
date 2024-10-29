import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-tsk.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return this.taskRepository.getTaskById(id, user);
  }

  async updateTaskStatus(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    return this.taskRepository.updateTaskStatus(id, updateTaskDto.status, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    return this.taskRepository.deleteTask(id, user);
  }

  //   private tasks: Task[] = [];

  //   getAllTasks(filterDto: GetTasksFilterDto): Task[] {
  //     const { status, search } = filterDto;
  //     let tasks = this.tasks;

  //     if (status) {
  //       tasks = tasks.filter((task) => task.status === status);
  //     }
  //     if (search) {
  //       tasks = tasks.filter(
  //         (task) =>
  //           task.title.includes(search) || task.description.includes(search),
  //       );
  //     }
  //     return tasks;
  //   }

  //   getTaskById(id: string): Task {
  //     const found = this.tasks.find((task) => task.id === id);
  //     if (!found) {
  //       throw new NotFoundException(`Task with ID "${id}" not found`);
  //     }
  //     return found;
  //   }

  //   createTask(createTaskDto: CreateTaskDto): Task {
  //     const { title, description } = createTaskDto;

  //     const task: Task = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status:
  //         Object.values(TaskStatus)[
  //           Math.floor(Math.random() * Object.values(TaskStatus).length)
  //         ],
  //     };

  //     this.tasks.push(task);

  //     return task;
  //   }

  //   updateTaskStatus(id: string, updateTaskDto: UpdateTaskDto): Task {
  //     const { status } = updateTaskDto;
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     return task;
  //   }

  //   deleteTask(id: string): void {
  //     const found = this.getTaskById(id);
  //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
  //   }
}
