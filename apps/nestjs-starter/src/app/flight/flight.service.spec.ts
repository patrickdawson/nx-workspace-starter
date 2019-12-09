import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from './flight.service';

describe('FlightService', () => {
  let service: FlightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightService],
    }).compile();

    service = module.get<FlightService>(FlightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct flights from Hamburg to Graz', () => {
    expect(service.getFlights('Hamburg', 'Graz')).toEqual([
      {
        id: 3,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T07:07:54.1624336+00:00',
        delayed: false
      },
      {
        id: 4,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: false
      },
      {
        id: 5,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T12:07:54.1624336+00:00',
        delayed: false
      }
    ]);
  });

  it('should return correct flight for GET "/flight/3', () => {
    expect(service.getFlightById(3)).toEqual({
        id: 3,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T07:07:54.1624336+00:00',
        delayed: false
      });
  });

  it('should successfully create a new flight for POST "/flight"', () => {
    expect(service.createFlight({
      from: 'Stuttgart',
      to: 'Hamburg',
      date: '2019-02-23T07:07:54.1624336+00:00',
      delayed: false,
      id: 3,
    })).toEqual({
        from: 'Stuttgart',
        to: 'Hamburg',
        date: '2019-02-23T07:07:54.1624336+00:00',
        delayed: false,
        id: 174
      });
  });

  it('should successfully delete a flight for DELETE "/flight/174"', () => {
    expect(service.deleteFlight(3)).toBeTruthy();

  });

  it('should return HTTP-Status 404 for DELETE "/flight/175"', () => {
    expect(service.deleteFlight(175)).toBeFalsy();
  });
});
