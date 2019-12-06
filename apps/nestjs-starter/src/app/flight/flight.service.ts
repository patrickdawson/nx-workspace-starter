import { HttpException, HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import flights from '../../../mock-data/flights.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { FlightEntity } from './flight.entity';
import { getConnection, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FlightService {
  private flights: Flight[] = flights;

  constructor(@InjectRepository(FlightEntity) private flightRepository: Repository<FlightEntity>,
              private httpService: HttpService) {
  }

  public searchFlights(from: string, to: string, fromDate?: Date, toDate?: Date): Promise<FlightEntity[]> {
    const query = getConnection().createQueryBuilder()
      .select('flight_entity')
      .from(FlightEntity, 'flight_entity')
      .where({ from, to });
    if (fromDate) {
      query.andWhere('date >= :fromDate', { fromDate });
    }
    if (toDate) {
      query.andWhere('date <= :toDate', { toDate });
    }
    return query.getMany();
  }

  public getFlightById(id: number): Observable<Flight> {
    return this.httpService.get<Flight>(`http://www.angular.at/api/flight/${id}`)
      .pipe(
        map(res => res.data),
        catchError((error: AxiosError) => throwError(new HttpException('', error.response.status)))
      );
  }

  public createFlight(flight: Flight): Promise<FlightEntity> {
    const newFlight = new FlightEntity();
    newFlight.from = flight.from;
    newFlight.to = flight.to;
    newFlight.date = flight.date;
    newFlight.delayed = flight.delayed;
    return this.flightRepository.save(newFlight);
  }

  public async updateFlight(flight: Flight): Promise<any> {
    const result: UpdateResult = await this.flightRepository.update({id: flight.id}, flight);
    if (result.raw && result.raw.affectedRows && result.raw.affectedRows === 1) {
      return flight;
    }
    throw new NotFoundException();
  }

  public async deleteFlight(id: number): Promise<boolean> {
    return !!(await this.flightRepository.delete({ id })).affected;
  }
}
