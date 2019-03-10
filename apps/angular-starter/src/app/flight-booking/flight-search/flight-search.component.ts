import { Component, OnInit } from '@angular/core';
import { Flight } from '@flight-app/shared';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html'
})
export class FlightSearchComponent implements OnInit {
  from: string;
  to: string;
  flights: Array<Flight> = [];
  selectedFlight: Flight;
  message: string;
  searchError = '';

  basket: object = {   // <-- Neue Eigenschaft
    '3': true,
    '5': true
  };

  constructor(private flightService: FlightService) {
  }

  ngOnInit(): void {
  }

  search(): void {
    if (!this.from || !this.to) {
      return;
    }

    this.flightService
      .find(this.from, this.to)
      .subscribe(
        (flights) => {
          this.flights = flights;
          this.searchError = '';
        },
        (errResp) => {
          console.error('Error loading flights', errResp);
          if (errResp.status === 401) {
            this.searchError = 'Sie müssen sich zuerst einloggen!';
          }
        }
      );
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  save(): void {

    this.flightService
      .save(this.selectedFlight)
      .subscribe(
        flight => {
          this.selectedFlight = flight;
          this.message = 'Erfolgreich gespeichert!';
        },
        errResponse => {
          console.error('Fehler beim Speichern', errResponse);
          this.message = 'Fehler beim Speichern: ';
        }
      );
  }
}