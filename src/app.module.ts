import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './currency/currency.module';
import { LocationModule } from './location/location.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CurrencyModule, LocationModule],
})
export class AppModule {}
