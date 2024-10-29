import { TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { DataSource } from 'typeorm';
import { CreateTaskDto } from './dto/create-tsk.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

const mockDataSource = {
  createEntityManager: jest.fn(),
};

describe('TasksService', () => {
  let service: TasksService;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        TaskRepository,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get(TasksService);
    taskRepository = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      taskRepository.getTasks = jest.fn().mockResolvedValue('someValue');
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const mockUser: Partial<User> = {
        id: '1',
        username: 'Test user',
        password: 'Test password',
        tasks: [],
      };
      const result = await service.getTasks(null, mockUser as User);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });

    it('gets all tasks from the repository with filters', async () => {
      taskRepository.getTasks = jest.fn().mockResolvedValue('someValue');
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };
      const mockUser: Partial<User> = {
        id: '1',
        username: 'Test user',
        password: 'Test password',
        tasks: [],
      };
      const result = await service.getTasks(filters, mockUser as User);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and successfully retrieve and return the task', async () => {
      taskRepository.findOneBy = jest.fn().mockResolvedValue('someValue');
      const mockUser: Partial<User> = {
        id: '1',
        username: 'Test user',
        password: 'Test password',
        tasks: [],
      };
      const result = await service.getTaskById('someId', mockUser as User);
      expect(taskRepository.findOneBy).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });

    it('throws an error as task is not found', () => {
      taskRepository.findOneBy = jest.fn().mockResolvedValue(null);
      const mockUser: Partial<User> = {
        id: '1',
        username: 'Test user',
        password: 'Test password',
        tasks: [],
      };
      expect(service.getTaskById('someId', mockUser as User)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('calls taskRepository.createTask() and returns the result', async () => {
      taskRepository.createTask = jest.fn().mockResolvedValue('someValue');
      const mockUser: Partial<User> = {
        id: '1',
        username: 'Test user',
        password: 'Test password',
        tasks: [],
      };
      const createTaskDto: CreateTaskDto = {
        title: 'Test title',
        description: 'Test description',
      };
      const result = await service.createTask(createTaskDto, mockUser as User);
      expect(taskRepository.createTask).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });

    it('throws an error if the user does not exist', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test title',
        description: 'Test description',
      };

      taskRepository.createTask = jest
        .fn()
        .mockRejectedValue(new UnauthorizedException());

      await expect(service.createTask(createTaskDto, null)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('deleteTask', () => {
    it('calls taskRepository.deleteTask() to delete a task', async () => {
      taskRepository.delete = jest.fn().mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      const mockUser: Partial<User> = {
        id: '1',
        username: 'Test user',
        password: 'Test password',
        tasks: [],
      };
      await service.deleteTask('someId', mockUser as User);
      expect(taskRepository.delete).toHaveBeenCalled();
    });

    it('throws an error if the user does not exist', async () => {
      const mockUser = null;
      taskRepository.delete = jest
        .fn()
        .mockRejectedValue(new UnauthorizedException());

      await expect(service.deleteTask('someId', mockUser)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
