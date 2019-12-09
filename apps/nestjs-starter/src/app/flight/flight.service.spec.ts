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
});
