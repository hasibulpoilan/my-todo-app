import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3002', // Allow only the frontend URL
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    credentials: true,              // Allow cookies if needed
  });
  

  await app.listen(3001);
}
bootstrap();
