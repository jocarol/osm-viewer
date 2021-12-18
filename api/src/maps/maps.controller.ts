import { Controller, Get, Post, Body, Header } from '@nestjs/common';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) { }

  @Post()
  @Header('content-type', 'application/json')
  async generate(@Body() reauestBody) {
    return this.mapsService.generate(reauestBody);
  }

  @Get()
  @Header('content-type', 'text/xml')
  async getMap() {
    return this.mapsService.getMap();
  }

}
