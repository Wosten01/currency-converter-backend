import { Injectable, Logger } from '@nestjs/common';
import { AppController } from '../app.controller';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(AppController.name);

  private async getCurrencyFromDB(language: string) {
    const client = new PrismaClient();
    const result = await client.languagesAndCurrencies.findFirst({
      where: {
        name: language,
      },
      include: {
        currency: true,
      },
    });

    return result ? result.currency.code : null;
  }

  async getCurrencyByLanguage(language: string): Promise<string> {
    const currency = await this.getCurrencyFromDB(language);

    console.log();

    if (currency) {
      this.logger.debug(`Requested currency for language: ${language}`);
      return currency;
    }

    const baseLanguage = language.split('-')[0];
    if (baseLanguage === 'en') {
      this.logger.log(`Base language is 'en', returning 'USD'`);
      return 'USD';
    } else if (baseLanguage === 'ru') {
      this.logger.log(`Base language is 'ru', returning 'RUB'`);
      return 'RUB';
    }

    this.logger.warn(
      `Currency not found for language: ${language}, returning default 'USD'`,
    );
    return 'USD';
  }
}
