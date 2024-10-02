import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configSevice = app.get(ConfigService);

  const port = configSevice.get<number>('port');
  app.listen(port || 3000)
}
bootstrap();
