import { CacheModule, Global, HttpModule, Logger, Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import * as redisStore from 'cache-manager-redis-store';

const mongodbUri = 'mongodb://heroku_nhjc4749:3efp4l15pvjqmm4k0ud7klfb0i@ds263295.mlab.com:63295/heroku_nhjc4749';
const redisUri = 'redis://h:p79a19b949ec6f235f43ea0c34e498ab2a2624cddb66aa76b7c8ed48eb344dad2@ec2-34-253-152-126.eu-west-1.compute.amazonaws.com:11269';

const loggerProvider: Provider = {provide: Logger, useFactory: () => new Logger('FlightServer')};

@Global()
@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(
      mongodbUri,
      {useNewUrlParser: true}
    ),
    CacheModule.register({
      ttl: 5,
      max: 10,
      store: redisStore,
      url: redisUri
    })
  ],
  providers: [loggerProvider],
  exports: [HttpModule, CacheModule, loggerProvider]
})
export class CoreModule {}
