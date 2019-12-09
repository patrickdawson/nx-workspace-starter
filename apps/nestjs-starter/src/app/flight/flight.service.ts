import { Injectable } from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import flights from '../../../mock-data/flights.json';

@Injectable()
export class FlightService {
  private flights: Flight[] = flights;

  constructor() {
  }

  getFlights(from: string, to: string): Flight[] {
    return this.flights.filter(flight => flight.from === from && flight.to === to)
  }
}

