import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('all')
  getAvailableCurrencies() {
    return this.currencyService.getAvailableCurrencies();
  }

  @Get(':code')
  findByCode(@Param('code') code: string) {
    if (code.length != 3) {
      throw new BadRequestException({
        statusCode: 400,
        message: `Unknown code format received`,
        error: 'Bad Request',
      });
    }

    const currency = this.currencyService.findByCode(code.toUpperCase());

    const currentDate = new Date().toISOString();

    if (!currency) {
      throw new BadRequestException({
        result: 'error',
        statusCode: 400,
        message: `Currency with code ${code} not found`,
        error: 'Bad Request',
      });
    }

    return {
      base_currency: code,
      rates: currency,
      date: currentDate,
    };
  }

  @Get(':from/to/:to')
  getExchangeRate(@Param('from') from: string, @Param('to') to: string) {
    const fromUpper = from.toUpperCase();
    const toUpper = to.toUpperCase();

    const amount = this.currencyService.getExchangeRate(fromUpper, toUpper);
    const currentDate = new Date().toISOString();

    if (amount === null) {
      throw new BadRequestException({
        statusCode: 400,
        message: `Exchange rate from ${fromUpper} to ${toUpper} not found`,
        error: 'Bad Request',
      });
    }
    return {
      base_currency: fromUpper,
      target_currency: toUpper,
      amount: amount,
      date: currentDate,
    };
  }
}
