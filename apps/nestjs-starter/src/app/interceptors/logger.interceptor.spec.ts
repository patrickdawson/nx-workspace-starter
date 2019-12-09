import { LoggerInterceptor } from './logger.interceptor';
import { Controller, Get, INestApplication, Logger, UseInterceptors } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

describe('LoggerInterceptor', () => {
  let app: INestApplication;
  let module: TestingModule;
  let loggerInterceptor: LoggerInterceptor;
  let logger: Logger;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TestingController],
      providers: [LoggerInterceptor, Logger]
    }).compile();
    app = module.createNestApplication();
    loggerInterceptor = app.get<LoggerInterceptor>(LoggerInterceptor);
    logger = app.get<Logger>(Logger);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Logs a request with logger", async () => {
    const logSpy = spyOn(logger, "log");
    await request(app.getHttpServer())
      .get('/test')
      .expect(200);

    expect(logSpy).toHaveBeenCalledWith('Request-Url: /test, Body: "success!"');
  });
});

@Controller('test')
@UseInterceptors(LoggerInterceptor)
class TestingController {

  @Get('')
  testFunction() {
    return 'success!';
  }
}
