import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class CustomHttpFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
