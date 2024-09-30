import { Injectable, Logger } from '@nestjs/common';
import { AppController } from './app.controller';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppController.name);

  getHello(): string {
    this.logger.log('Get hello world request.');
    return 'Hello World!';
  }
}
