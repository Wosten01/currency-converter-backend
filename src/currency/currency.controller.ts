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
  async findByCode(@Param('code') codeOriginal: string) {
    const code = codeOriginal.toUpperCase();

    if (code.length != 3) {
      throw new BadRequestException({
        statusCode: 400,
        message: `Unknown code format received`,
        error: 'Bad Request',
      });
    }

    const currency = await this.currencyService.findByCode(code);

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
  async getExchangeRate(@Param('from') from: string, @Param('to') to: string) {
    const fromUpper = from.toUpperCase();
    const toUpper = to.toUpperCase();

    const amount = await this.currencyService.getExchangeRate(
      fromUpper,
      toUpper,
    );
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
