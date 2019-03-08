import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from './flight.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { Flight } from '@flight-app/shared';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FlightEntity } from './flight.entity';

describe('FlightService', () => {
  let service: FlightService;
  let httpService: HttpService;
  let mockRepository: MockFlightRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        FlightService,
        {
          provide: getRepositoryToken(FlightEntity),
          useClass: MockFlightRepository
        }
      ]
    }).compile();
    service = module.get<FlightService>(FlightService);
    httpService = module.get<HttpService>(HttpService);
    mockRepository = module.get<MockFlightRepository>(getRepositoryToken(FlightEntity));
  });

  it('should return an empty array if nothing is passed in "searchFlights"', async () => {
    expect(await service.searchFlights('', '')).toEqual([]);
  });

  it('should return correct flights if "Stuttgart" and "Salzburg" is passed in "searchFlights"', async () => {
    const mockFlights: Flight[] = [
      {
        id: 171,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T09:07:54.1624336+00:00',
        delayed: false
      },
      {
        id: 172,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T10:07:54.1624336+00:00',
        delayed: false
      },
      {
        id: 173,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T11:07:54.1624336+00:00',
        delayed: false
      }
    ];
    mockRepository.mockFlights = mockFlights;
    const result = await service.searchFlights(
      'Stuttgart',
      'Salzburg'
    );
    expect(result.length).toEqual(3);
    expect(result).toEqual(mockFlights);
  });

  it('should return correct flight for "getFlightById"', () => {
    const mockData: Flight = {
      id: 4,
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false
    };

    spyOn(httpService, 'get').and.returnValue(of({ data: mockData }));

    service.getFlightById(4).subscribe(data => expect(data).toEqual(mockData));
    expect(httpService.get).toHaveBeenCalledWith('http://www.angular.at/api/flight/4');
  });

  it('should handle a HTTP-Error correctly for "getFlightById"', (done) => {
    spyOn(httpService, 'get').and.returnValue(throwError({ response: { status: 400 } }));

    service.getFlightById(4).subscribe(fail, error => {
      expect(error.status).toEqual(400);
      done();
    });
    expect(httpService.get).toHaveBeenCalledWith('http://www.angular.at/api/flight/4');
  });

  it('should return correct flight for "createFlight"', async () => {
    expect(await service.createFlight({
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false
    })).toEqual({
      id: 174,
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false
    });
  });

  it('should return true for "deleteFlight"', async () => {
    mockRepository.deletedFlights = 1;
    expect(await service.deleteFlight(4)).toEqual(true);
  });

  it('should return false for "deleteFlight"', async () => {
    mockRepository.deletedFlights = 0;
    expect(await service.deleteFlight(190)).toEqual(false);
  });
});

class MockFlightRepository {
  mockFlights = [];
  deletedFlights = 0;

  save() {
    return Promise.resolve({
      id: 174,
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false
    });
  }

  find() {
    return Promise.resolve(this.mockFlights);
  }

  delete() {
    return Promise.resolve({affected: this.deletedFlights});
  }
}
