import { Logger, Module } from '@nestjs/common';

import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  providers: [Logger]
})
export class AppModule {}
