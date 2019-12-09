import { Injectable } from '@angular/core';
import { ClientProxy } from '@nestjs/microservices';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMapTo, tap } from 'rxjs/operators';
import { ForbiddenException, Inject, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AirportService {
  /*@Client({
    transport: Transport.TCP,
    options: {
      port: 4000
    }
  })
  private client: ClientProxy;*/

  constructor(@Inject('AIRPORT_SERVICE') private readonly client: ClientProxy) {
  }

  public getAirports(): Observable<string[]> {
    return from(this.client.connect()).pipe(
      switchMapTo(this.client.send<string[], string>({cmd: 'airports'}, 'TOKEN' )),
      catchError((error) => {
        if (error.message === 'FORBIDDEN') {
          return throwError(new ForbiddenException());
        }
        return throwError(new InternalServerErrorException());
      })
    )
  }

  public logAirports(data: string) {
    this.client.emit<string, string>('LOG', data).pipe(tap(console.log));
  }
}
