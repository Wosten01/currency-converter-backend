import { Injectable, Logger } from '@nestjs/common';
import { AppController } from 'src/app.controller';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(AppController.name);

  private currencyByLanguage = {
    'en-US': 'USD', // США
    'en-GB': 'GBP', // Великобритания
    'ru-RU': 'RUB', // Россия
    'fr-FR': 'EUR', // Франция
    'ja-JP': 'JPY', // Япония
    'de-DE': 'EUR', // Германия
    'zh-CN': 'CNY', // Китай
    'ko-KR': 'CNY', // Южная Корея
    'vi-VN': 'CNY', // Вьетнам
    'th-TH': 'CNY', // Таиланд
    'id-ID': 'CNY', // Индонезия
    'ms-MY': 'CNY', // Малайзия
    'fil-PH': 'CNY', // Филиппины
    'en-AU': 'AUD', // Австралия
    'fr-CA': 'CAD', // Канада
    'en-NZ': 'NZD', // Новая Зеландия
    'fr-CH': 'CHF', // Швейцария (французский)
    'de-CH': 'CHF', // Швейцария (немецкий)
    'it-CH': 'CHF', // Швейцария (итальянский)
    'it-IT': 'EUR', // Италия
    'es-ES': 'EUR', // Испания
    'pt-PT': 'EUR', // Португалия
    'tr-TR': 'EUR', // Турция
    'el-GR': 'EUR', // Греция
    'hu-HU': 'EUR', // Венгрия
    'no-NO': 'EUR', // Норвегия
    'da-DK': 'EUR', // Дания
    'sv-SE': 'EUR', // Швеция
    'kk-KZ': 'RUB', // Казахстан
    'tg-TJ': 'RUB', // Таджикистан
    'uz-UZ': 'RUB', // Узбекистан
    'ky-KG': 'RUB', // Кыргызстан
    'hy-AM': 'RUB', // Армения
    'be-BY': 'RUB', // Беларусь
  };

  getCurrencyByLanguage(language: string): string {
    const currency = this.currencyByLanguage[language];
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
