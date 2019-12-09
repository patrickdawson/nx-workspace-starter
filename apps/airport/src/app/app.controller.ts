import { Controller, Logger, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AirportGuard } from './airport.guard';

@Controller()
export class AppController {

  constructor(private readonly logger: Logger) {
  }

  @UseGuards(AirportGuard)
  @MessagePattern({cmd: 'airports'})
  public getAirports(): string[] {
    return [
      'Flughafen Wien-Schwechat',
      'Flughafen Manfred Rommel Stuttgart',
      'Flughafen Helmut Schmidt Hamburg'
    ];
  }

  @EventPattern('LOG')
  log(@Payload() data: string) {
   this.logger.log('Logging data ' + data);
  }
}
