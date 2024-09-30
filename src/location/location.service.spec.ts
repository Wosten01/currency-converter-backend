import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should return the correct currency for a known language', () => {
    const currency = service.getCurrencyByLanguage('en-US');
    expect(currency).toBe('USD');
  });

  it('should return USD for any English base language', () => {
    const currency = service.getCurrencyByLanguage('en-XX');
    expect(currency).toBe('USD');
  });

  it('should return RUB for any Russian base language', () => {
    const currency = service.getCurrencyByLanguage('ru-XX');
    expect(currency).toBe('RUB');
  });

  it('should return EUR for any French base language', () => {
    const currency = service.getCurrencyByLanguage('fr-FR');
    expect(currency).toBe('EUR');
  });

  it('should return USD for any French base language', () => {
    const currency = service.getCurrencyByLanguage('xx-XX');
    expect(currency).toBe('USD');
  });
});
