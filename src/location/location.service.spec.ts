import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should return the correct currency for a known language', async () => {
    const currency = await service.getCurrencyByLanguage('en-US');
    expect(currency).toBe('USD');
  });

  it('should return USD for any English base language', async () => {
    const currency = await service.getCurrencyByLanguage('en-XX');
    expect(currency).toBe('USD');
  });

  it('should return RUB for any Russian base language', async () => {
    const currency = await service.getCurrencyByLanguage('ru-XX');
    expect(currency).toBe('RUB');
  });

  it('should return EUR for any French base language', async () => {
    const currency = await service.getCurrencyByLanguage('fr-FR');
    expect(currency).toBe('EUR');
  });

  it('should return USD for any French base language', async () => {
    const currency = await service.getCurrencyByLanguage('xx-XX');
    expect(currency).toBe('USD');
  });
});
