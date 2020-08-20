import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'
import * as config from "config";

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('boottrap');

  const app = await NestFactory.create(AppModule);

  // if () {
  app.enableCors({ origin: 'http://localhost:3001' })
  // }

  const port = process.env.port || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
