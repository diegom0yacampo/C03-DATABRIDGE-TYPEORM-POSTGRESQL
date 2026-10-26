import { Controller, Get, Query } from '@nestjs/common';
import { Evento } from './evento.entity';
import { EventosService } from './eventos.service';

@Controller('eventos')
export class EventosController {
  constructor(private readonly service: EventosService) {}

  @Get()
  findAll(@Query('ciudad') ciudad?: string): Promise<Evento[]> {
    return this.service.findAll(ciudad);
  }
}
