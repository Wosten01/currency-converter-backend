// import { Test, TestingModule } from '@nestjs/testing';
// import { CurrencyController } from './currency.controller';
// import { CurrencyService } from './currency.service';
// import { BadRequestException } from '@nestjs/common';

// describe('CurrencyController', () => {
//   let controller: CurrencyController;
//   let service: CurrencyService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [CurrencyController],
//       providers: [
//         {
//           provide: CurrencyService,
//           useValue: {
//             getAvailableCurrencies: jest.fn(),
//             findByCode: jest.fn(),
//             getExchangeRate: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<CurrencyController>(CurrencyController);
//     service = module.get<CurrencyService>(CurrencyService);
//   });

//   describe('findByCode', () => {
//     it('should throw BadRequestException if code length is not 3 characters', () => {
//       expect(() => controller.findByCode('US')).toThrow(BadRequestException);
//     });

//     it('should return currency data for valid code', async () => {
//       const mockCurrency = { USD: 1.0, EUR: 0.85 };

//       jest.spyOn(service, 'findByCode').mockResolvedValue(mockCurrency);

//       const result = await controller.findByCode('USD');

//       expect(result).toEqual({
//         base_currency: 'USD',
//         rates: mockCurrency,
//         date: expect.any(String),
//       });
//     });

//     it('should throw BadRequestException if currency is not found', () => {
//       jest.spyOn(service, 'findByCode').mockResolvedValue(null);

//       expect(() => controller.findByCode('abc')).toThrow(BadRequestException);
//     });
//   });

//   describe('getExchangeRate', () => {
//     it('should return the exchange rate between two currencies', async () => {
//       const mockRate = 1.2;
//       jest.spyOn(service, 'getExchangeRate').mockResolvedValue(mockRate);

//       const result = await controller.getExchangeRate('usd', 'eur');
//       expect(result).toEqual({
//         base_currency: 'USD',
//         target_currency: 'EUR',
//         amount: mockRate,
//         date: expect.any(String),
//       });
//     });

//     it('should throw BadRequestException if exchange rate is not found', () => {
//       jest.spyOn(service, 'getExchangeRate').mockReturnValue(null);

//       expect(() => controller.getExchangeRate('usd', 'abc')).toThrow(
//         BadRequestException,
//       );
//     });
//   });
// });
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
    it('should return currency rates for a valid code', async () => {
      const mockCurrency = { USD: 1.0, EUR: 0.85 };
      jest.spyOn(service, 'findByCode').mockResolvedValue(mockCurrency);

      const result = await controller.findByCode('usd');

      expect(result).toEqual({
        base_currency: 'USD',
        rates: mockCurrency,
        date: expect.any(String),
      });
      expect(service.findByCode).toHaveBeenCalledWith('USD');
    });

    it('should throw BadRequestException for invalid code length', async () => {
      await expect(controller.findByCode('us')).rejects.toThrow(
        BadRequestException,
      );

      await expect(controller.findByCode('us')).rejects.toThrowError(
        new BadRequestException({
          statusCode: 400,
          message: 'Unknown code format received',
          error: 'Bad Request',
        }),
      );
    });

    it('should throw BadRequestException if currency not found', async () => {
      jest.spyOn(service, 'findByCode').mockResolvedValue(null);

      await expect(controller.findByCode('usd')).rejects.toThrow(
        BadRequestException,
      );

      await expect(controller.findByCode('usd')).rejects.toThrowError(
        new BadRequestException({
          result: 'error',
          statusCode: 400,
          message: 'Currency with code USD not found',
          error: 'Bad Request',
        }),
      );
    });
  });

  describe('getExchangeRate', () => {
    it('should return exchange rate for valid from and to currencies', async () => {
      jest.spyOn(service, 'getExchangeRate').mockResolvedValue(1.12);

      const result = await controller.getExchangeRate('usd', 'eur');

      expect(result).toEqual({
        base_currency: 'USD',
        target_currency: 'EUR',
        amount: 1.12,
        date: expect.any(String),
      });
      expect(service.getExchangeRate).toHaveBeenCalledWith('USD', 'EUR');
    });

    it('should throw BadRequestException if exchange rate is not found', async () => {
      jest.spyOn(service, 'getExchangeRate').mockResolvedValue(null);

      await expect(controller.getExchangeRate('usd', 'eur')).rejects.toThrow(
        BadRequestException,
      );

      await expect(
        controller.getExchangeRate('usd', 'eur'),
      ).rejects.toThrowError(
        new BadRequestException({
          statusCode: 400,
          message: 'Exchange rate from USD to EUR not found',
          error: 'Bad Request',
        }),
      );
    });
  });
});
