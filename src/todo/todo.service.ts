import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>, // Injecting the Todo repository
  ) {}

  // Fetch all todos
  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  // Create a new todo
  async create(task: string): Promise<Todo> {
    const todo = this.todoRepository.create({ task });
    return this.todoRepository.save(todo);
  }

  // Update an existing todo
  async update(id: number, task: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({where:{id}});
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.task = task; // Update the task field
    return this.todoRepository.save(todo); // Save and return the updated todo
  }

  // Delete a todo
  async remove(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({where:{id}});
    if (!todo) {
      throw new Error('Todo not found');
    }
    await this.todoRepository.remove(todo); // Remove the todo from the database
  }
}
