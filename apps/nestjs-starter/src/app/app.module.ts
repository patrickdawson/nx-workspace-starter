import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { PassengerModule } from './passenger/passenger.module';
import { CoreModule } from './core/core.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    FlightModule,
    PassengerModule,
    CoreModule,
    MongooseModule.forRoot('')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
