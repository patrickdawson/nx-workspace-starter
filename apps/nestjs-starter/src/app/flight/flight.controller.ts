import { Controller, Get, Query, Post, Body, Param, Delete, HttpCode, HttpException } from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import flights from '../../../mock-data/flights.json';
import { FlightService } from './flight.service';

@Controller('flight')
export class FlightController {
    private flights: Flight[] = flights;

    constructor(private flightService: FlightService) {
    }

    @Get()
    getFlights(@Query('from') from: string, @Query('to') to: string): Flight[] {
      return this.flightService.getFlights(from, to);
    }

    @Get(':id')
    getFlightById(@Param('id') id: string): Flight {
      return this.flights.find(flight => flight.id === +id);
    }

    @Post()
    @HttpCode(201)
    createFlight(@Body() flight: Flight): Flight {
      const newFlight: Flight = {
        ...flight,
        id: this.flights.length + 1
      };
      this.flights = [
        ...this.flights,
        newFlight
      ];
      return newFlight;
    }

    @Delete(':id')
    deleteFlightById(@Param('id') id: string): void {
      const length = this.flights.length;
      this.flights = this.flights.filter(flight => flight.id !== +id);
      if (length === this.flights.length) {
        throw new HttpException('Flight not found.', 404);
      }
    }
}
