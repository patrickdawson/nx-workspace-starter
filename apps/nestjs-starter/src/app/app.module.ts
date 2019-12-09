import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { PassengerModule } from './passenger/passenger.module';
import { AuthenticationGuard } from './authentication/authentication.guard';


@Module({
  imports: [FlightModule, PassengerModule],
  controllers: [AppController],
  providers: [AppService, AuthenticationGuard],
})
export class AppModule {}
