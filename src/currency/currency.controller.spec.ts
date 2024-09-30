import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { BadRequestException } from '@nestjs/common';

describe('CurrencyController', () => {
  let controller: CurrencyController;
  let service: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        {
          provide: CurrencyService,
          useValue: {
            getAvailableCurrencies: jest.fn(),
            findByCode: jest.fn(),
            getExchangeRate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CurrencyController>(CurrencyController);
    service = module.get<CurrencyService>(CurrencyService);
  });

  describe('findByCode', () => {
    it('should throw BadRequestException if code length is not 3 characters', () => {
      expect(() => controller.findByCode('US')).toThrow(BadRequestException);
    });

    it('should return currency data for valid code', () => {
      const mockCurrency = { USD: 1.0, EUR: 0.85 };
      jest.spyOn(service, 'findByCode').mockReturnValue(mockCurrency);

      const result = controller.findByCode('usd');
      expect(result).toEqual({
        base_currency: 'USD',
        rates: mockCurrency,
        date: expect.any(String),
      });
    });

    it('should throw BadRequestException if currency is not found', () => {
      jest.spyOn(service, 'findByCode').mockReturnValue(null);

      expect(() => controller.findByCode('abc')).toThrow(BadRequestException);
    });
  });

  describe('getExchangeRate', () => {
    it('should return the exchange rate between two currencies', () => {
      const mockRate = 1.2;
      jest.spyOn(service, 'getExchangeRate').mockReturnValue(mockRate);

      const result = controller.getExchangeRate('usd', 'eur');
      expect(result).toEqual({
        base_currency: 'USD',
        target_currency: 'EUR',
        amount: mockRate,
        date: expect.any(String),
      });
    });

    it('should throw BadRequestException if exchange rate is not found', () => {
      jest.spyOn(service, 'getExchangeRate').mockReturnValue(null);

      expect(() => controller.getExchangeRate('usd', 'abc')).toThrow(
        BadRequestException,
      );
    });
  });
});
