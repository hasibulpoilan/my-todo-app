import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3000,
      username: 'postgres', // replace with your PostgreSQL username
      password: '092003', // replace with your PostgreSQL password
      database: 'flags', // name of the database
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Use false for production
    }),
    TodoModule,
  ],
})
export class AppModule {}
