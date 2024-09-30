import { Controller, Get, Req } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('get-currency')
  async getCurrency(@Req() req: Request) {
    const language = req.headers['accept-language'];
    const preferredLanguage = language.split(',')[0];
    const currency =
      await this.locationService.getCurrencyByLanguage(preferredLanguage);

    return {
      language: preferredLanguage,
      currency: currency,
    };
  }
}
