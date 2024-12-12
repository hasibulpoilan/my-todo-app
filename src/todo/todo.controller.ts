import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // Fetch all todos
  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  // Create a new todo
  @Post()
  async create(@Body('task') task: string): Promise<Todo> {
    return this.todoService.create(task);
  }

  // Update an existing todo
  @Put(':id')
  async update(@Param('id') id: number, @Body('task') task: string): Promise<Todo> {
    return this.todoService.update(id, task);
  }

  // Delete a todo
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.todoService.remove(id);
  }
}
