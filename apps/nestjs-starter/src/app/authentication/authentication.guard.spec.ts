import request from 'supertest';
import { AuthenticationGuard } from './authentication.guard';
import { Controller, Get, INestApplication, UseGuards } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

@UseGuards(AuthenticationGuard)
@Controller('test')
class TestController {
  @Get()
  get() { return "success!" }
}


describe('AuthenticationGuard', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(new AuthenticationGuard()).toBeDefined();
  });

  it('should return HTTP-Status 200', () => {
    return request(app.getHttpServer())
      .get('/test')
      .set('authorization', 'Bearer jwt123456token')
      .expect(200)
      .expect('success!');
  });

  it('should return HTTP-Status 401 for incorrect token', () => {
    return request(app.getHttpServer())
      .get('/test')
      .set('authorization', 'Bearer test')
      .expect(401)
      .expect({
        statusCode: 401,
        error: 'Unauthorized'
      });
  });

  it('should return HTTP-Status 401 if no header is set', () => {
    return request(app.getHttpServer())
      .get('/test')
      .expect(401)
      .expect({
        statusCode: 401,
        error: 'Unauthorized'
      });
  });
});
