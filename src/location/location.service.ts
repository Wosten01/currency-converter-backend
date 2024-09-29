import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
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
      return currency;
    }

    // Если точное соответствие не найдено, используем язык (например, 'en', 'ru')
    const baseLanguage = language.split('-')[0];
    if (baseLanguage === 'en') {
      return 'USD'; // По умолчанию для английского — доллар
    } else if (baseLanguage === 'ru') {
      return 'RUB'; // По умолчанию для русского — рубль
    }

    // Другие варианты валют
    return 'USD'; // По умолчанию USD, если не удалось определить
  }
}
