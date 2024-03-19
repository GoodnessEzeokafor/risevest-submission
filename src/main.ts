import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './core';
import {
  BadRequestException,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          // Map over the errors and extract the messages
          const messages = errors.map((error) =>
            Object.values(error.constraints).join(', '),
          );
          // Join all messages into a single string
          const errorMessage = messages.join('. ');
          // Throw a BadRequestException with the combined error message
          throw new BadRequestException(`Validation failed: ${errorMessage}`);
        },
        stopAtFirstError: true,
        transform: true,
      }),
    );
    app.enableCors();
    app.enableShutdownHooks();

    await app
      .listen(PORT)
      .then(() => Logger.log(`server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
