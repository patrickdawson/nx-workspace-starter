import { Controller, Get, Post, Param, Query, Body, HttpCode, Delete, NotFoundException } from '@nestjs/common';
import { Flight } from '@flight-app/shared';

import flights from '../../../mock-data/flights.json';



@Controller('flight')
export class FlightController {
  private flights: Flight[] = flights;

  @Get()
  getFlights(@Query('from') from: string, @Query('to') to: string): Flight[] {
    return this.flights.filter(flight => flight.from === from && flight.to === to)
  }

  @Get(':id')
  getFlight(@Param('id') id): Flight {
    return this.flights.find(flight => flight.id === +id);
  }

  @Post()
  @HttpCode(201)
  createFlight(@Body() body: Flight): Flight {
    const newFlight = {
      ...body,
      id: this.flights.length + 1,
    };
    this.flights.push(newFlight);
    return newFlight;
  }

  @Delete(':id')
  @HttpCode(200)
  deleteFlight(@Param('id') id: string) {
    const length = this.flights.length;
    this.flights = this.flights.filter(flight => flight.id !== +id);
    if (length === this.flights.length) {
      throw new NotFoundException('Flight not found.');
    }
  }
}
