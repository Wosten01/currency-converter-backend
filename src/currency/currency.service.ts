import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(CurrencyService.name);

  async findByCode(code: string) {
    this.logger.log(`Fetching exchange rates for currency: ${code}`);
    const currency = await this.prisma.currencyEntity.findFirst({
      where: { code },
      include: { exchangeRatesFrom: { include: { to: true } } },
    });

    if (!currency) {
      this.logger.warn(`Currency code ${code} not found`);
      return null;
    }

    const exchangeRates = await this.prisma.exchangeRate.findMany({
      where: { fromId: currency.id },
    });

    const exchangeRatesMap: Record<string, number> = {};

    await Promise.all(
      exchangeRates.map(async (exchangeRate) => {
        const currency = await this.prisma.currencyEntity.findFirst({
          where: { id: exchangeRate.toId },
          include: { exchangeRatesFrom: { include: { to: true } } },
        });

        if (currency) {
          exchangeRatesMap[currency.code] = exchangeRate.rate;
        } else {
          this.logger.warn(`Currency with ID ${exchangeRate.toId} not found`);
        }
      }),
    );

    this.logger.debug(
      `Exchange Rates Map: ${JSON.stringify(exchangeRatesMap)}`,
    );

    return exchangeRatesMap;
  }

  async getExchangeRate(from: string, to: string) {
    this.logger.log(`Getting exchange rate from ${from} to ${to}`);

    const fromRates = await this.findByCode(from);

    if (!fromRates || !fromRates[to]) {
      this.logger.error(`Exchange rate from ${from} to ${to} not found`);
      return null;
    }

    const rate = fromRates[to];
    this.logger.log(`Exchange rate from ${from} to ${to} is ${rate}`);
    return rate;
  }

  async getAvailableCurrencies() {
    this.logger.log('Fetching all available currencies');
    const currencies = await this.prisma.currencyEntity.findMany({
      select: { code: true, name: true },
    });
    const currencyObject = currencies.reduce((acc, item) => {
      acc[item.code] = item.name;
      return acc;
    }, {});

    return currencyObject;
  }
}
