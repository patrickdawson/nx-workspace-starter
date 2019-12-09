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

  getFlightById(id: number): Flight {
    return this.flights.find(flight => flight.id === id);
  }

  createFlight(data: Flight): Flight {
    const newFlight: Flight = {
      ...data,
      id: this.flights.length + 1
    };
    this.flights = [
      ...this.flights,
      newFlight
    ];
    return newFlight;
  }

  deleteFlight(id: number): boolean {
    const length = this.flights.length;
    this.flights = this.flights.filter(flight => flight.id !== +id);
    return length !== this.flights.length;
  }
}

