import { CacheModule, Global, HttpModule, Logger, Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import * as redisStore from 'cache-manager-redis-store';
import { GraphQLModule } from '@nestjs/graphql';
import { environment } from '../../environments/environment';

// TODO: DELETE ME BEFORE YOU PUSH TO GIT
const mongodbUri = 'mongodb://heroku_v9484k0p:km8b4k0f87l6n1990ipng6p865@ds233198.mlab.com:33198/heroku_v9484k0p';
const redisUri = 'redis://redistogo:63447feef378e87ed66e1d692aa9750c@porgy.redistogo.com:11709/';

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
    }),
    GraphQLModule.forRoot({
      debug: !environment.production,
      playground: !environment.production,
      autoSchemaFile: 'schema.gql'
    })
  ],
  providers: [loggerProvider],
  exports: [HttpModule, CacheModule, loggerProvider]
})
export class CoreModule {}
