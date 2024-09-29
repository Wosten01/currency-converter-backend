import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './currency/currency.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CurrencyModule],
})
export class AppModule {}
