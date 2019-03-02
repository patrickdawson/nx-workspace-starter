import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { UserMiddleware } from '../middleware/user.middleware';

@Module({
  controllers: [FlightController],
  providers: [FlightService, Logger]
})
export class FlightModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(UserMiddleware)
      .with({
        id: 42,
        username: 'testuser',
        firstname: 'test',
        lastname: 'user',
        role: 'admin'
      })
      .forRoutes(FlightController);
  }
}