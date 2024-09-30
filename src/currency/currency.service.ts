import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  // private currencyNames = {
  //   AUD: 'Австралийский доллар',
  //   CAD: 'Канадский доллар',
  //   CHF: 'Швейцарский франк',
  //   CNY: 'Китайский юань',
  //   EUR: 'Евро',
  //   GBP: 'Фунт стерлингов Великобритании',
  //   JPY: 'Японская иена',
  //   RUB: 'Российский рубль',
  //   USD: 'Доллар США',
  // };

  private exchangeRates = {
    USD: {
      USD: 1,
      EUR: 0.8957,
      JPY: 142.7096,
      GBP: 0.7469,
      CHF: 0.842,
      CAD: 1.3497,
      AUD: 1.4489,
      CNY: 6.9997,
      RUB: 93.0501,
      NZD: 1.5776,
    },
    EUR: {
      USD: 1.1164,
      EUR: 1,
      GBP: 0.8344,
      NZD: 1.7626,
      CHF: 0.9404,
      CAD: 1.5072,
      AUD: 1.6176,
      CNY: 7.8172,
      RUB: 103.9239,
      JPY: 159.1667,
    },
    GBP: {
      GBP: 1,
      USD: 1.3388,
      EUR: 1.1984,
      JPY: 190.961,
      CHF: 1.1274,
      CAD: 1.8067,
      CNY: 9.3554,
      RUB: 124.5711,
      NZD: 2.1137,
      AUD: 1.9396,
    },
    JPY: {
      JPY: 1,
      USD: 0.007007,
      EUR: 0.006283,
      GBP: 0.005237,
      CHF: 0.005903,
      CAD: 0.009471,
      AUD: 0.01015,
      CNY: 0.04906,
      RUB: 0.6522,
      NZD: 0.01107,
    },
    CHF: {
      CHF: 1,
      USD: 1.1877,
      EUR: 1.0634,
      JPY: 169.4205,
      GBP: 0.887,
      CAD: 1.6024,
      AUD: 1.7195,
      CNY: 8.3126,
      RUB: 110.4799,
      NZD: 1.8739,
    },
    CAD: {
      CAD: 1,
      USD: 0.7409,
      EUR: 0.6635,
      CHF: 0.6241,
      JPY: 105.5844,
      GBP: 0.5535,
      AUD: 1.0732,
      CNY: 5.1881,
      RUB: 68.9423,
      NZD: 1.1701,
    },
    AUD: {
      AUD: 1,
      USD: 0.6902,
      EUR: 0.6182,
      JPY: 98.4845,
      GBP: 0.5156,
      CHF: 0.5816,
      CAD: 0.9318,
      CNY: 4.8308,
      RUB: 64.2498,
      NZD: 1.0893,
    },
    CNY: {
      CNY: 1,
      USD: 0.1429,
      EUR: 0.1279,
      JPY: 20.3822,
      GBP: 0.1068,
      CHF: 0.1203,
      CAD: 0.1928,
      AUD: 0.207,
      RUB: 13.3013,
      NZD: 0.2256,
    },
    RUB: {
      RUB: 1,
      USD: 0.01075,
      EUR: 0.009623,
      JPY: 1.5335,
      GBP: 0.008028,
      CHF: 0.009052,
      CAD: 0.01451,
      AUD: 0.01557,
      CNY: 0.07518,
      NZD: 0.01695,
    },
    NZD: {
      NZD: 1,
      USD: 0.6337,
      EUR: 0.5675,
      JPY: 90.3657,
      GBP: 0.4731,
      CHF: 0.5336,
      CAD: 0.8546,
      AUD: 0.9181,
      CNY: 4.4334,
      RUB: 58.9958,
    },
  };

  findAll() {
    this.logger.log('Fetching all exchange rates');
    return this.exchangeRates;
  }

  findByCode(code: string) {
    this.logger.log(`Fetching exchange rates for currency: ${code}`);
    const rates = this.exchangeRates[code];
    if (!rates) {
      this.logger.warn(`Currency code ${code} not found`);
      return null;
    }

    this.logger.log(`Returning rates for currency: ${code}`);
    return rates;
  }

  getExchangeRate(from: string, to: string) {
    this.logger.log(`Getting exchange rate from ${from} to ${to}`);
    const fromRates = this.exchangeRates[from];
    this.logger.debug(fromRates);

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
    const client = new PrismaClient();
    const currencies = await client.currencyEntity.findMany({
      select: { code: true, name: true },
    });
    const currencyObject = currencies.reduce((acc, item) => {
      acc[item.code] = item.name;
      return acc;
    }, {});

    return currencyObject;
  }
}
