import { Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportController } from './airport.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'AIRPORT_SERVICE', transport: Transport.TCP, options: {port: 4000} }
    ])
  ],
  controllers: [AirportController],
  providers: [AirportService],
  exports: [AirportService]
})
export class AirportModule {}
