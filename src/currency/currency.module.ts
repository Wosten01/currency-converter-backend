import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  imports: [PrismaModule],
})
export class CurrencyModule {}
