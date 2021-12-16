import { Controller, Get, Post, Body, Patch, Param, Delete, Header } from '@nestjs/common';
import { MapsService } from './maps.service';
import { GenerateCanva } from './dto/generate-canva.dto';
import { UpdateMapDto } from './dto/update-canva.dto';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Post()
  @Header('content-type', 'application/json')
  async generate(@Body() generateCanva: GenerateCanva) {
    return this.mapsService.generate(generateCanva);
  }

  @Get()
  @Header('content-type', 'text/xml')
  async getMap() {
    return this.mapsService.getMap();
  }

}
